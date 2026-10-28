"""Conservative verdict combiner merging Rule Engine signals with Grok AI outputs.
Adheres to: If either says red, result is at least amber; both red means red.
Provides full localization fallback if Grok API is unavailable.
"""
from typing import Optional, List
from backend.models import RuleResult, GrokVerdict, FinalVerdictResponse, VerdictLevel

DISCLAIMERS = {
    "en": "TrustLens is an aid, not legal proof.",
    "mr": "ट्रस्टलेन्स हे सहाय्यक साधन आहे, कायदेशीर पुरावा नाही.",
    "hi": "ट्रस्टलेंस एक सहायक साधन है, कानूनी प्रमाण नहीं।"
}

FALLBACK_ADVICE = {
    "red": {
        "en": "Do not click links, do not share OTP, and do not send money. Call 1930 immediately if you paid.",
        "mr": "कोणत्याही लिंकवर क्लिक करू नका, ओटीपी शेअर करू नका आणि पैसे पाठवू नका. पैसे दिले असल्यास त्वरित १९३० वर कॉल करा.",
        "hi": "किसी भी लिंक पर क्लिक न करें, ओटीपी साझा न करें और पैसे न भेजें। अगर पैसे भेजे हैं तो तुरंत 1930 पर कॉल करें।"
    },
    "amber": {
        "en": "Exercise caution. Verify directly with official authorities or your bank before taking action.",
        "mr": "सावधगिरी बाळगा. कोणतीही कृती करण्यापूर्वी संबंधित बँक किंवा अधिकृत कार्यालयाशी संपर्क साधून खात्री करा.",
        "hi": "सावधानी बरतें। कोई भी कदम उठाने से पहले सीधे अपने बैंक या संबंधित आधिकारिक विभाग से पुष्टि करें।"
    },
    "green": {
        "en": "No common scam indicators detected. Always remain vigilant with personal data.",
        "mr": "कोणतेही फसवणुकीचे संकेत आढळले नाहीत. तरीही आपली वैयक्तिक माहिती सुरक्षित ठेवा.",
        "hi": "धोखाधड़ी का कोई सामान्य संकेत नहीं मिला। फिर भी अपनी व्यक्तिगत जानकारी को लेकर सतर्क रहें।"
    }
}


def combine_verdicts(
    rule_res: RuleResult,
    grok_res: Optional[GrokVerdict],
    language: str = "en"
) -> FinalVerdictResponse:
    """Merges Rule Engine scores with Grok LLM outputs conservatively."""
    lang = language if language in ("en", "mr", "hi") else "en"
    disclaimer = DISCLAIMERS[lang]

    # CASE A: Grok is unavailable -> Rules-only mode
    if grok_res is None:
        rule_verdict = rule_res.suggested_verdict
        # Translate rule flags into simple reasons
        reasons: List[str] = []
        for f in rule_res.flags[:3]:
            reasons.append(f"{f.title}: {f.description}")

        if not reasons:
            if rule_verdict == "green":
                reasons = [
                    "No recognized phishing keywords, urgency threats, or malicious link formats found." if lang == "en" else
                    ("कोणतेही संशयास्पद शब्द किंवा बनावट लिंक्स आढळल्या नाहीत." if lang == "mr" else
                     "कोई संदिग्ध शब्द या फर्जी लिंक प्रारूप नहीं मिले।")
                ]

        advice = FALLBACK_ADVICE[rule_verdict][lang]
        primary_scam = rule_res.flags[0].category.replace("_", " ").title() if rule_res.flags else None

        return FinalVerdictResponse(
            verdict=rule_verdict,
            confidence=max(40, min(95, rule_res.score)) if rule_verdict != "green" else 85,
            reasons=reasons[:3],
            advice=advice,
            scam_type=primary_scam,
            rule_score=rule_res.score,
            flags=rule_res.flags,
            analysis_mode="rules_only",
            disclaimer=disclaimer
        )

    # CASE B: Hybrid mode (both Rules and Grok available)
    rule_v = rule_res.suggested_verdict
    grok_v = grok_res.verdict

    # Rule: If either says red, the result is at least amber; both red means red.
    if rule_v == "red" and grok_v == "red":
        final_v: VerdictLevel = "red"
        confidence = max(grok_res.confidence, min(95, rule_res.score + 10))
    elif rule_v == "red" or grok_v == "red":
        # Either says red: at least amber, or red if rule score is overwhelmingly high (>= 60)
        final_v = "red" if (rule_res.score >= 60 or grok_res.confidence >= 80) else "amber"
        confidence = int((rule_res.score + grok_res.confidence) / 2)
    elif rule_v == "amber" or grok_v == "amber":
        final_v = "amber"
        confidence = max(grok_res.confidence, 60)
    else:
        # Both green
        final_v = "green"
        confidence = min(grok_res.confidence, 90)

    # Use Grok's contextual explanations if valid, else augment with flags
    reasons = grok_res.reasons if grok_res.reasons else [f.title for f in rule_res.flags[:3]]
    if not reasons:
        reasons = [FALLBACK_ADVICE[final_v][lang]]

    advice = grok_res.advice.strip() if grok_res.advice else FALLBACK_ADVICE[final_v][lang]
    scam_type = grok_res.scam_type or (rule_res.flags[0].category.replace("_", " ").title() if rule_res.flags else None)

    return FinalVerdictResponse(
        verdict=final_v,
        confidence=confidence,
        reasons=reasons[:3],
        advice=advice,
        scam_type=scam_type,
        rule_score=rule_res.score,
        flags=rule_res.flags,
        analysis_mode="hybrid",
        disclaimer=disclaimer
    )
