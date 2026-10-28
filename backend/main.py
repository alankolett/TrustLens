"""TrustLens FastAPI Application.
Stateless, privacy-preserving scam and deepfake verification backend.
"""
from __future__ import annotations
import os
import time
import json
from pathlib import Path
from typing import Dict, Tuple
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request, Response, UploadFile, File, Form, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

from backend.models import TextCheckRequest, FinalVerdictResponse, ImageCheckResponse
from backend.rules import evaluate_rules
from backend.grok_client import analyze_text_with_grok, check_model_availability
from backend.combiner import combine_verdicts
from backend.detectors import validate_magic_bytes, evaluate_image

load_dotenv()

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB maximum

# IP-based sliding window rate limiter (simple, in-memory, stateless friendly)
RATE_LIMIT_REQUESTS = 60  # max requests
RATE_LIMIT_WINDOW_SECS = 60  # per 60 seconds
_ip_rate_tracker: Dict[str, list[float]] = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup validation
    print("[TrustLens Backend] Initializing...")
    model_ok = check_model_availability()
    if not model_ok:
        print("[TrustLens Backend] NOTE: Operating with pure Python Rule Engine fallback.")
    else:
        print("[TrustLens Backend] xAI Grok model connection verified.")
    yield
    print("[TrustLens Backend] Shutting down.")


app = FastAPI(
    title="TrustLens Cyber Resilience API",
    description="Privacy-preserving scam detection and Responsible AI verification for Maharashtra citizens.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration supporting local dev, custom domain, and Vercel preview/production URLs
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_ORIGIN,
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_origin_regex=r"^https?:\/\/.*(\.vercel\.app|\.onrender\.com)$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    """Enforce basic IP rate limiting to protect API from denial-of-service."""
    # Allow health check without rate limiting
    if request.url.path in ("/health", "/docs", "/openapi.json"):
        return await call_next(request)

    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW_SECS

    # Clean old entries
    timestamps = [t for t in _ip_rate_tracker.get(client_ip, []) if t > window_start]

    if len(timestamps) >= RATE_LIMIT_REQUESTS:
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={"detail": "Too many verification requests. Please wait a minute before trying again."}
        )

    timestamps.append(now)
    _ip_rate_tracker[client_ip] = timestamps

    response = await call_next(request)
    return response


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "TrustLens API", "version": "1.0.0"}


@app.get("/samples")
def get_demo_samples():
    """Retrieve pre-configured benchmark scam/benign samples for the live demo."""
    samples_path = Path(__file__).resolve().parent.parent / "samples" / "samples.json"
    if not samples_path.exists():
        # Fallback if running in Vercel lambda container relative path
        alt_path = Path(__file__).resolve().parent / "samples" / "samples.json"
        if alt_path.exists():
            samples_path = alt_path
        else:
            raise HTTPException(status_code=404, detail="Demo samples file not found")
    with open(samples_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


@app.post("/api/check-text", response_model=FinalVerdictResponse)
async def check_text(payload: TextCheckRequest):
    """
    Stateless text and link analysis:
    1. Evaluates multi-lingual rule engine.
    2. Calls Grok with strict JSON output (if API key present).
    3. Merges results conservatively.
    Never logs the text content to preserve user confidentiality.
    """
    text = payload.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    # 1. Evaluate Rule Engine
    rule_result = evaluate_rules(text)

    # 2. Call Grok LLM (with timeout, retries, and fallback)
    grok_result = analyze_text_with_grok(text, rule_result.flags, language=payload.language)

    # 3. Combine verdicts conservatively
    final_response = combine_verdicts(rule_result, grok_result, language=payload.language)
    return final_response


@app.post("/api/check-image", response_model=ImageCheckResponse)
async def check_image(
    file: UploadFile = File(...),
    language: str = Form("en")
):
    """
    Stateless image analysis:
    - Enforces max 5 MB size limit.
    - Validates magic bytes (JPEG/PNG/WEBP).
    - Analyzes metadata (Pillow) & Grok Vision.
    - In-memory processing; data is discarded immediately after analysis.
    """
    # 1. Read file bytes and validate size limit
    content = await file.read(MAX_IMAGE_SIZE_BYTES + 1)
    if len(content) > MAX_IMAGE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File size exceeds maximum allowed 5 MB."
        )

    # 2. Validate magic bytes
    is_valid, detected_type = validate_magic_bytes(content)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported or malformed file type. Allowed formats: JPG, PNG, WEBP."
        )

    # 3. Evaluate image metadata & Grok Vision forensic analysis
    try:
        verdict = evaluate_image(content, language=language)
        return verdict
    finally:
        # Guarantee memory release
        del content
