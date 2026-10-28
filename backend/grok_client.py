"""xAI Grok Client with OpenAI SDK Compatibility.
Handles structured JSON inference for text and vision, retries, and fallback to rules.
"""
from __future__ import annotations
import os
import json
import logging
from typing import Optional, List, Dict, Any
from dotenv import load_dotenv
from openai import OpenAI
from backend.models import GrokVerdict, RuleFlag, VerdictLevel

load_dotenv()
logger = logging.getLogger("trustlens.grok")

# Environment configurations
XAI_API_KEY = os.getenv("XAI_API_KEY", "").strip()
XAI_MODEL = os.getenv("XAI_MODEL", "grok-2-1212").strip()
XAI_VISION_MODEL = os.getenv("XAI_VISION_MODEL", "grok-2-vision-1212").strip()
XAI_BASE_URL = os.getenv("XAI_BASE_URL", "https://api.x.ai/v1").strip()

_client: Optional[OpenAI] = None

def get_openai_client() -> Optional[OpenAI]:
    """Initialize or return the xAI OpenAI client singleton."""
    global _client
    if not XAI_API_KEY:
        logger.warning("XAI_API_KEY is not set. TrustLens will operate in Rule-Engine fallback mode.")
        return None
    if _client is None:
        _client = OpenAI(
            api_key=XAI_API_KEY,
            base_url=XAI_BASE_URL,
            timeout=12.0  # Safe timeout to prevent slow responses
        )
    return _client


def check_model_availability() -> bool:
    """Startup check: calls GET /v1/models and warns if XAI_MODEL is not present."""
    client = get_openai_client()
    if not client:
        return False
    try:
        models_response = client.models.list()
        model_ids = [m.id for m in models_response.data]
        logger.info(f"Connected to xAI. Available models count: {len(model_ids)}")
        if XAI_MODEL not in model_ids:
            logger.warning(
                f"Configured XAI_MODEL '{XAI_MODEL}' not found in active model list. "
                f"Available samples: {model_ids[:5]}."
            )
            return False
        return True
    except Exception as exc:
        logger.warning(f"Could not verify xAI model list at startup: {exc}")
        return False


LANGUAGE_NAMES = {
    "en": "English",
    "mr": "Marathi (मराठी) - everyday colloquial language used in Maharashtra",
    "hi": "Hindi (हिंदी) - simple everyday conversational Hindi"
}


def build_text_prompt(text: str, flags: List[RuleFlag], language: str) -> str:
    lang_desc = LANGUAGE_NAMES.get(language, "English")
    flags_summary = "\n".join([f"- [{f.category}] {f.title}: {f.description}" for f in flags]) if flags else "No obvious rule triggers found."

    return f"""You are TrustLens, an expert Responsible AI cyber-safety advisor helping ordinary citizens, seniors, and rural families in Maharashtra, India.
Analyze the following user-submitted message or link to determine if it is a scam, cyber fraud, phishing, or benign communication.

USER MESSAGE:
\"\"\"{text}\"\"\"

PRE-COMPUTED RULE ENGINE SIGNALS:
{flags_summary}

TARGET OUTPUT LANGUAGE:
{lang_desc}

OUTPUT REQUIREMENTS:
Output a single, strictly valid JSON object matching this schema:
{{
  "verdict": "red" | "amber" | "green",
  "confidence": <integer between 0 and 100>,
  "reasons": [
    "<max 3 concise bullet points in {lang_desc}>"
  ],
  "advice": "<single short, direct sentence in {lang_desc} telling the user exactly what to do or avoid>",
  "scam_type": "<e.g. 'Digital Arrest Scam', 'Fake Electricity Disconnection', 'Phishing Link', or null if safe>"
}}

CRITICAL GUIDELINES:
1. Explain in VERY SIMPLE, everyday words suitable for elders and villagers. Avoid technical jargon like 'heuristics' or 'asymmetric encryption'.
2. NEVER claim 100% certainty or legal authority. If evidence is ambiguous or weak, state 'not sure' and classify as amber or green with honest confidence.
3. NEVER invent facts or hallucinate sender details.
4. If it mentions digital arrest, fake police/CBI, installing AnyDesk/TeamViewer, or urgent account block, it is high risk (red).
5. If it is a normal family chat or a standard bank OTP receipt that clearly reminds the user never to share their OTP, classify as safe (green).
"""


def analyze_text_with_grok(text: str, flags: List[RuleFlag], language: str = "en") -> Optional[GrokVerdict]:
    """Call xAI Grok to analyze scam text. Returns validated GrokVerdict or None on failure."""
    client = get_openai_client()
    if not client:
        return None

    prompt = build_text_prompt(text, flags, language)

    # Allow 1 retry on invalid JSON or transient failure
    for attempt in range(2):
        try:
            response = client.chat.completions.create(
                model=XAI_MODEL,
                messages=[
                    {"role": "system", "content": "You are a cyber safety analysis system that outputs ONLY raw JSON."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},
                temperature=0.1,
                max_tokens=600
            )

            raw_content = response.choices[0].message.content or ""
            data = json.loads(raw_content)

            # Ensure reasons is a list of at most 3 items
            reasons = data.get("reasons", [])
            if isinstance(reasons, str):
                reasons = [reasons]
            reasons = [str(r) for r in reasons][:3]

            verdict_str = str(data.get("verdict", "amber")).lower()
            if verdict_str not in ("red", "amber", "green"):
                verdict_str = "amber"

            confidence = int(data.get("confidence", 50))
            confidence = max(0, min(100, confidence))

            advice = str(data.get("advice", "")).strip()
            scam_type = data.get("scam_type")

            return GrokVerdict(
                verdict=verdict_str,  # type: ignore
                confidence=confidence,
                reasons=reasons,
                advice=advice,
                scam_type=scam_type
            )
        except Exception as exc:
            logger.warning(f"Grok analysis attempt {attempt + 1} failed: {exc}")
            if attempt == 1:
                return None

    return None
