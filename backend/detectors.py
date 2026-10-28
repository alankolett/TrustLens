"""Image analysis detectors and metadata inspection.
Includes pluggable detect_ai_image() ready for future Hugging Face models.
"""
from __future__ import annotations
import io
import base64
import json
import logging
from typing import Tuple, List, Optional
from PIL import Image, ExifTags
from backend.models import MetadataAnalysis, ImageCheckResponse, VerdictLevel
from backend.grok_client import get_openai_client, XAI_VISION_MODEL, LANGUAGE_NAMES
from backend.combiner import DISCLAIMERS

logger = logging.getLogger("trustlens.detectors")

# Allowed magic bytes signatures
# JPEG: FF D8 FF
# PNG: 89 50 4E 47 0D 0A 1A 0A
# WEBP: RIFF....WEBP (52 49 46 46 .... 57 45 42 50)
def validate_magic_bytes(data: bytes) -> Tuple[bool, str]:
    """Validate file content against magic bytes. Returns (is_valid, detected_format)."""
    if len(data) < 12:
        return False, "unknown"

    if data.startswith(b"\xff\xd8\xff"):
        return True, "JPEG"

    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return True, "PNG"

    if data.startswith(b"RIFF") and data[8:12] == b"WEBP":
        return True, "WEBP"

    return False, "unsupported"


# Common AI generation dimension multiples (Midjourney, DALL-E, SD, Flux)
KNOWN_AI_DIMENSIONS = {
    (512, 512), (768, 768), (1024, 1024), (1024, 1792), (1792, 1024),
    (1152, 896), (896, 1152), (1216, 832), (832, 1216), (1344, 768), (768, 1344)
}

AI_TOOL_KEYWORDS = [
    "midjourney", "stable diffusion", "stablediffusion", "dall-e", "dalle",
    "comfyui", "novelai", "invokeai", "automatic1111", "photoshop", "gimp", "canva"
]


def analyze_image_metadata(image_bytes: bytes) -> MetadataAnalysis:
    """Analyze EXIF tags, dimensions, and software markers using Pillow."""
    flags: List[str] = []
    suspicious_tags: List[str] = []
    has_exif = False
    ai_dim_match = False

    try:
        with Image.open(io.BytesIO(image_bytes)) as img:
            format_name = img.format or "UNKNOWN"
            mime_type = Image.MIME.get(format_name, "application/octet-stream")
            width, height = img.size
            dims = [width, height]

            # 1. AI Dimension Check
            if (width, height) in KNOWN_AI_DIMENSIONS:
                ai_dim_match = True
                flags.append(f"Image dimensions ({width}x{height}) match exact common AI generation grid (e.g., SD/Midjourney).")

            # 2. EXIF Analysis
            exif_data = img.getexif()
            if exif_data and len(exif_data) > 0:
                has_exif = True
                for tag_id, value in exif_data.items():
                    tag_name = ExifTags.TAGS.get(tag_id, str(tag_id)).lower()
                    str_val = str(value).lower()

                    for kw in AI_TOOL_KEYWORDS:
                        if kw in tag_name or kw in str_val:
                            suspicious_tags.append(f"{tag_name}: {value}")
                            flags.append(f"Metadata tag indicates editing/generation software: '{kw}'.")
            else:
                # If image claims to be a photo but lacks camera EXIF
                flags.append("No camera EXIF metadata detected (common in AI generations or web-scraped images).")

            return MetadataAnalysis(
                has_exif=has_exif,
                suspicious_tags=suspicious_tags,
                ai_dimension_match=ai_dim_match,
                dimensions=dims,
                format=format_name,
                mime_type=mime_type,
                flags=flags
            )
    except Exception as e:
        logger.warning(f"Error parsing image metadata: {e}")
        return MetadataAnalysis(
            has_exif=False,
            suspicious_tags=[],
            ai_dimension_match=False,
            dimensions=[0, 0],
            format="UNKNOWN",
            mime_type="application/octet-stream",
            flags=[f"Metadata unreadable: {str(e)}"]
        )


# ============================================================================
# PLUGGABLE AI DETECTOR HOOK (For Hugging Face / local ONNX models)
# ============================================================================
def detect_ai_image(image_bytes: bytes) -> Optional[dict]:
    """
    PLUGGABLE FUNCTION: detect_ai_image
    -------------------------------------------------------------------------
    Future extension point for a dedicated Hugging Face or PyTorch vision
    detector (e.g. 'umm-maybe/AI-image-detector' or ViT-based artifact classifier).
    
    Returns a dict with:
        {"is_ai": bool, "confidence": float, "detector": "name"}
    or None if no local/Hugging Face model is currently loaded.
    """
    # Currently pluggable stub: ready for pipeline injection
    # In future:
    #   from transformers import pipeline
    #   pipe = pipeline("image-classification", model="...")
    return None


def analyze_image_with_grok_vision(
    image_bytes: bytes,
    mime_type: str,
    meta: MetadataAnalysis,
    language: str = "en"
) -> Optional[dict]:
    """Inspect image with Grok Vision model for deepfake artifacts or scam notices."""
    client = get_openai_client()
    if not client:
        return None

    lang_desc = LANGUAGE_NAMES.get(language, "English")
    base64_data = base64.b64encode(image_bytes).decode("utf-8")
    data_url = f"data:{mime_type};base64,{base64_data}"

    meta_summary = "; ".join(meta.flags) if meta.flags else "Clean metadata."

    prompt = f"""You are TrustLens, an expert Responsible AI forensic advisor helping ordinary citizens in Maharashtra, India.
Analyze this submitted image for:
1. Signs of AI generation, synthetic manipulation, or deepfakes (e.g., warped text, unnatural hands/fingers, asymmetrical eyes/ears, synthetic lighting, plastic skin, distorted backgrounds).
2. Phishing/Scam context (e.g., fake Mumbai Police / CBI warrants, forged government circulars, fake celebrity crypto ads, altered UPI / Google Pay payment receipts).

IMAGE METADATA FINDINGS:
{meta_summary}

TARGET OUTPUT LANGUAGE:
{lang_desc}

OUTPUT REQUIREMENTS:
Output ONLY a strictly valid JSON object matching this schema:
{{
  "verdict": "red" | "amber" | "green",
  "confidence": <integer between 0 and 100>,
  "reasons": [
    "<max 3 concise forensic observations in {lang_desc}>"
  ],
  "advice": "<single short, direct safety advice sentence in {lang_desc}>",
  "scam_type": "<e.g. 'AI Generated Deepfake', 'Fake Payment Screenshot', 'Counterfeit Police Warrant', or null if safe/authentic>"
}}

CRITICAL RULES:
- Visual analysis is probabilistic. NEVER claim 100% certainty. State clearly that visual analysis is probabilistic.
- Use simple, everyday words. Avoid complex academic jargon.
- If it looks like a real camera photo with normal anatomy and lighting, classify as green.
- If it contains a fake government notice, fake UPI screenshot, or clear AI artifacts, classify as red or amber.
"""

    for attempt in range(2):
        try:
            response = client.chat.completions.create(
                model=XAI_VISION_MODEL,
                messages=[
                    {"role": "system", "content": "You are a visual forensic analysis system that outputs strictly valid JSON only."},
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {"type": "image_url", "image_url": {"url": data_url}}
                        ]
                    }
                ],
                response_format={"type": "json_object"},
                temperature=0.1,
                max_tokens=600
            )

            raw = response.choices[0].message.content or ""
            parsed = json.loads(raw)
            return parsed
        except Exception as exc:
            logger.warning(f"Grok Vision attempt {attempt + 1} failed: {exc}")
            if attempt == 1:
                return None

    return None


def evaluate_image(image_bytes: bytes, language: str = "en") -> ImageCheckResponse:
    """End-to-end evaluation: metadata + pluggable detector + Grok Vision."""
    lang = language if language in ("en", "mr", "hi") else "en"
    disclaimer = DISCLAIMERS[lang]

    # 1. Metadata check
    meta = analyze_image_metadata(image_bytes)

    # 2. Check pluggable detector hook (for Hugging Face)
    custom_detector = detect_ai_image(image_bytes)
    if custom_detector:
        logger.info(f"Custom pluggable detector output: {custom_detector}")

    # 3. Grok Vision analysis
    grok_result = analyze_image_with_grok_vision(image_bytes, meta.mime_type, meta, language=lang)

    if grok_result:
        verdict_str = str(grok_result.get("verdict", "amber")).lower()
        if verdict_str not in ("red", "amber", "green"):
            verdict_str = "amber"
        confidence = int(grok_result.get("confidence", 60))
        confidence = max(0, min(100, confidence))
        reasons = grok_result.get("reasons", [])
        if isinstance(reasons, str):
            reasons = [reasons]
        reasons = [str(r) for r in reasons][:3]
        advice = str(grok_result.get("advice", "")).strip()
        scam_type = grok_result.get("scam_type")

        # Explicitly ensure probabilistic nature is stated if not already present
        prob_note = "Visual analysis is probabilistic and an aid." if lang == "en" else (
            "दृष्य विश्लेषण संभाव्यतेवर आधारित आहे." if lang == "mr" else "दृश्य विश्लेषण संभाव्यता आधारित है।"
        )
        if not any("probabilistic" in r.lower() or "संभाव्य" in r for r in reasons):
            if len(reasons) < 3:
                reasons.append(prob_note)

        return ImageCheckResponse(
            verdict=verdict_str,  # type: ignore
            confidence=confidence,
            reasons=reasons,
            advice=advice or "Always verify image origins through independent channels.",
            scam_type=scam_type,
            metadata=meta,
            disclaimer=disclaimer
        )

    # Fallback if Grok Vision unavailable
    # Metadata-based rule verdict
    reasons = []
    if meta.ai_dimension_match:
        reasons.append(
            f"Image has exact AI dimensions ({meta.dimensions[0]}x{meta.dimensions[1]})." if lang == "en" else
            "प्रतिमेचा आकार सामान्य AI मॉडेल्सच्या आकाराशी तंतोतंत जुळतो."
        )
    if meta.suspicious_tags:
        reasons.append(
            f"Found metadata tags: {', '.join(meta.suspicious_tags[:2])}" if lang == "en" else
            "प्रतिमेच्या माहितीत संपादन सॉफ्टवेअरचे संकेत आढळले."
        )
    if not meta.has_exif:
        reasons.append(
            "Missing original camera EXIF data." if lang == "en" else
            "कॅमेऱ्याची मूळ माहिती (EXIF) उपलब्ध नाही."
        )

    if meta.ai_dimension_match or meta.suspicious_tags:
        v: VerdictLevel = "amber"
        conf = 65
        advice = "Image shows synthetic metadata markers. Exercise caution." if lang == "en" else (
            "प्रतिमेत कृत्रिम संपादन घटक आढळले आहेत. सावधगिरी बाळगा." if lang == "mr" else
            "छवि में संपादन या कृत्रिम संकेत हैं। सावधानी बरतें।"
        )
    else:
        v = "green"
        conf = 60
        advice = "No overt AI metadata tags found. Visual checks are still recommended." if lang == "en" else (
            "कोणतेही संशयास्पद मेटाडेटा टॅग्ज आढळले नाहीत." if lang == "mr" else
            "कोई संदिग्ध मेटाडेटा नहीं मिला।"
        )

    return ImageCheckResponse(
        verdict=v,
        confidence=conf,
        reasons=reasons[:3],
        advice=advice,
        scam_type="Metadata Inspection (Offline)",
        metadata=meta,
        disclaimer=disclaimer
    )
