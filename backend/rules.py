"""TrustLens Rule Engine (Pure Python, Unit-Testable).
Detects and weights scam indicators across English, Marathi, Hindi, and Hinglish.
"""
from __future__ import annotations
import re
from typing import List, Tuple
from urllib.parse import urlparse
from backend.models import RuleFlag, RuleResult, VerdictLevel

# High severity threshold
SCORE_RED_THRESHOLD = 50
SCORE_AMBER_THRESHOLD = 20

# Suspicious TLDs frequently abused in scam campaigns
SUSPICIOUS_TLDS = {
    ".xyz", ".top", ".work", ".club", ".buzz", ".info", ".click", ".cam",
    ".cc", ".vip", ".loan", ".link", ".live", ".fit", ".rest", ".tk", ".ml", ".ga", ".cf"
}

# Known URL shorteners
URL_SHORTENERS = {
    "bit.ly", "tinyurl.com", "t.co", "is.gd", "buff.ly", "ow.ly",
    "cutt.ly", "shorturl.at", "rb.gy", "rebrand.ly", "v.gd"
}

# Patterns indicating legitimate OTP warnings to avoid false positives
LEGIT_OTP_WARNING_PATTERNS = [
    r"never\s+share\s+otp",
    r"do\s+not\s+share\s+(?:this\s+)?otp",
    r"bank\s+never\s+(?:calls|asks)",
    r"ओटीपी\s+कुणालाही\s+सांगू\s+नका",
    r"ओटीपी\s+किसी\s+को\s+(?:भी\s+)?न\s+दें",
    r"kisi\s+ko\s+otp\s+na\s+de",
    r"share\s+karu\s+naka"
]


def _check_legit_otp_warning(text_lower: str) -> bool:
    for pat in LEGIT_OTP_WARNING_PATTERNS:
        if re.search(pat, text_lower):
            return True
    return False


def _extract_urls(text: str) -> List[str]:
    """Extract URLs or domain-like tokens from input text."""
    url_pattern = r"(https?://[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?)"
    matches = re.findall(url_pattern, text)
    cleaned = []
    for m in matches:
        m = m.rstrip(".,;!?:'\"()[]{}")
        # Ensure it looks like a URL or domain
        if "." in m and not m.endswith("."):
            cleaned.append(m)
    return cleaned


def analyze_urls(text: str) -> List[RuleFlag]:
    """Inspect URLs for shorteners, lookalike domains, suspicious TLDs, IP hosts, or plain HTTP."""
    flags: List[RuleFlag] = []
    urls = _extract_urls(text)
    if not urls:
        return flags

    for raw_url in urls:
        full_url = raw_url if raw_url.startswith(("http://", "https://")) else f"http://{raw_url}"
        try:
            parsed = urlparse(full_url)
            host = (parsed.hostname or "").lower()
            scheme = parsed.scheme.lower()

            # Plain HTTP warning
            if scheme == "http" and ("login" in full_url or "kyc" in full_url or "pay" in full_url or "bank" in full_url):
                flags.append(RuleFlag(
                    id="url_insecure_http",
                    category="url",
                    weight=20,
                    title="Insecure HTTP link for sensitive action",
                    description=f"Link '{raw_url}' uses unencrypted HTTP for banking or KYC action."
                ))

            # IP Address link
            if re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", host):
                flags.append(RuleFlag(
                    id="url_ip_address",
                    category="url",
                    weight=35,
                    title="Direct IP address link",
                    description=f"Link targets a direct raw IP ({host}) instead of a verified domain."
                ))

            # URL Shortener
            if any(host == s or host.endswith("." + s) for s in URL_SHORTENERS):
                flags.append(RuleFlag(
                    id="url_shortener",
                    category="url",
                    weight=20,
                    title="Masked / shortened link",
                    description=f"Uses shortener '{host}' which conceals the real final destination."
                ))

            # Suspicious TLD
            if any(host.endswith(tld) for tld in SUSPICIOUS_TLDS):
                flags.append(RuleFlag(
                    id="url_suspicious_tld",
                    category="url",
                    weight=25,
                    title="Suspicious or cheap domain extension",
                    description=f"Domain '{host}' uses a low-trust extension often used in mass phishing."
                ))

            # Lookalike banking/government domain keywords
            lookalike_keywords = [
                "sbi", "hdfc", "icici", "pnb", "bob", "rbi", "yono", "msedcl",
                "mahadiscom", "gov", "police", "cyber", "aadhaar", "pan", "epfo"
            ]
            phishing_words = ["login", "update", "kyc", "verify", "bill", "pay", "claim"]

            has_trusted_name = any(kw in host for kw in lookalike_keywords)
            has_phishing_context = any(pw in full_url.lower() for pw in phishing_words)

            legit_gov_or_bank = host.endswith((".gov.in", ".nic.in", ".onlinesbi.sbi", ".sbi", ".hdfcbank.com", ".icicibank.com", ".mahadiscom.in"))

            if has_trusted_name and has_phishing_context and not legit_gov_or_bank:
                flags.append(RuleFlag(
                    id="url_lookalike_phishing",
                    category="url",
                    weight=35,
                    title="Look-alike bank/government phishing URL",
                    description=f"Domain '{host}' impersonates trusted public services or banks."
                ))

            # Punycode check (xn--)
            if "xn--" in host:
                flags.append(RuleFlag(
                    id="url_punycode",
                    category="url",
                    weight=30,
                    title="Internationalized (punycode) lookalike URL",
                    description=f"Domain '{host}' uses character substitutions to deceive users."
                ))
        except Exception:
            continue

    return flags


# Pattern Rule Definitions
# Each pattern list contains regexes matching English, Marathi, Hindi and Hinglish
PATTERN_RULES: List[Tuple[str, str, int, str, str, List[str]]] = [
    # 1. Digital Arrest / Fake Police / CBI / Customs / Parcel
    (
        "digital_arrest_law_enforcement",
        "authority_threat",
        45,
        "Law enforcement / Digital Arrest threat",
        "Threatens police action, CBI, customs arrest, Skype interrogation, or intercepted contraband parcel.",
        [
            r"digital\s+arrest",
            r"डिजिटल\s+अरेस्ट",
            r"cbi\s+(?:notice|officer|cell|interrogation)",
            r"mumbai\s+police",
            r"cyber\s+(?:cell|crime\s+branch|police)",
            r"narcotics\s+control\s+bureau|ncb",
            r"non[- ]bailable\s+warrant",
            r"arrest\s+warrant",
            r"contraband|drugs|fake\s+passport|narcotics",
            r"skype\s+(?:call|interrogation|statement)",
            r"video\s+call\s+(?:pe\s+aao|karave\s+lagel|par\s+rahein)",
            r"पोलिस\s+कारवाई|गुन्हा\s+दाखल|वारंट",
            r"सीबीआई|कस्टम्स|अटक\s+केली\s+जाईल",
            r"गिरफ्तारी|वारंट\s+जारी|थाने\s+में\s+हाजिर",
            r"trai\s+(?:block|sim\s+disconnect)"
        ]
    ),

    # 2. Fake KYC / Account Block / SIM Block / Electricity Disconnection
    (
        "fake_kyc_account_electricity_block",
        "account_threat",
        35,
        "KYC / Account block / Electricity cut notice",
        "Warns that your bank account, SIM card, or electricity will be suspended or disconnected.",
        [
            r"(?:account|khata|yono).{0,25}?(?:block|freeze|suspend|deactivat)",
            r"खाता.{0,25}?(?:ब्लॉक|बंद|सस्पेंड)",
            r"खाते.{0,25}?(?:ब्लॉक|बंद|गोठवले)",
            r"kyc.{0,20}?(?:pending|update|expire|expired|suspended|lapsed)",
            r"केवा[य़]?[ईीसी].{0,20}?(?:अपडेट|पेंडिंग|नूतनीकरण|अपूर्ण|करा)",
            r"(?:electricity|power|bill|msedcl|mahadiscom|bijli).{0,25}?(?:disconnected|disconnect|cut|bandh)",
            r"वीज\s+(?:पुरवठा|कनेक्शन)\s+(?:खंडित|तोडले\s+जाईल|बंद)",
            r"बिजली\s+(?:काट\s+दी\s+जाएगी|कनेक्शन\s+काट)",
            r"sim\s+(?:block|deactivation|disconnect)",
            r"सिम\s+(?:ब्लॉक|बंद)",
            r"pan\s+(?:card\s+)?(?:not\s+linked|link\s+karo|update)"
        ]
    ),

    # 3. Guaranteed High Returns / Crypto / Stock Tips / Insider Trading
    (
        "investment_crypto_stock_scam",
        "financial_greed",
        40,
        "Unrealistic investment returns or stock-tip scheme",
        "Promises guaranteed, high percentage profits, secret stock tips, or doubling money quickly.",
        [
            r"guaranteed\s+(?:\d+%\s+)?(?:return|profit|income)",
            r"(?:100%|300%|500%)\s+(?:profit|return|guaranteed)",
            r"risk[- ]free\s+(?:investment|trading|profit)",
            r"vip\s+(?:stock|trading|crypto|wealth)\s+(?:group|tips)",
            r"double\s+your\s+money|पैसा\s+डबल",
            r"घर\s+बसल्या\s+(?:दररोज|महिना)\s+कमवा",
            r"घर\s+बैठे\s+(?:रोजाना|कमाएं|कमाने)",
            r"(?:deposit|गुंतवा)\s+₹?\d+\s+(?:get|मिळवा|पाएं)\s+₹?\d+",
            r"crypto\s+(?:arbitrage|mining|pump|signals)",
            r"sebi\s+approved\s+insider\s+tips",
            r"नक्की\s+परतावा|हमखास\s+फायदा"
        ]
    ),

    # 4. Urgency and Secrecy Pressure
    (
        "urgency_secrecy_pressure",
        "pressure_tactic",
        25,
        "High urgency or forced secrecy pressure",
        "Forces hasty action with tight deadlines (1 hour, tonight) or forbids telling family/police.",
        [
            r"within\s+(?:1|2|3|24)\s+hours?",
            r"immediately|urgent|urgently",
            r"तात्काळ|त्वरित|ताबडतोब|लगेच",
            r"तुरंत|तत्काल|जल्द\s+से\s+जल्द",
            r"today\s+night|tonight\s+at\s+\d+|आज\s+रात्री|आज\s+रात",
            r"do\s+not\s+tell\s+(?:anyone|family|police)",
            r"keep\s+(?:this\s+)?secret|strictly\s+confidential",
            r"कुणालाही\s+सांगू\s+नका|गुपित\s+ठेवा",
            r"किसी\s+को\s+मत\s+बताना|गुप्त\s+रखें",
            r"last\s+warning|final\s+notice|अंतिम\s+सूचना"
        ]
    ),

    # 5. Remote Access / Malicious Apps / Direct Credentials Steal
    (
        "remote_access_credentials_request",
        "credential_theft",
        45,
        "Remote-access app installation or sensitive credential request",
        "Instructs downloading screen-sharing tools (AnyDesk, TeamViewer) or entering OTP/PIN.",
        [
            r"anydesk|any\s+desk",
            r"teamviewer|team\s+viewer",
            r"quicksupport|quick\s+support",
            r"rustdesk|airmirror",
            r"install\s+apk|download\s+apk|\.apk\b",
            r"(?:enter|share|send|provide|bhejo)\s+(?:your\s+)?(?:otp|pin|cvv|mpin|password)",
            r"ओटीपी\s+(?:सांगा|पाठवा|द्या|टाका)",
            r"ओटीपी\s+(?:शेयर\s+करें|भेजें|बताएं|दर्ज\s+करें)",
            r"upi\s+collect\s+request",
            r"approve\s+collect\s+request"
        ]
    ),

    # 6. Lottery / Prize / Job Offer Advance Fee
    (
        "lottery_job_advance_fee",
        "advance_fee",
        35,
        "Lottery prize or work-from-home advance fee scam",
        "Claims user won a lottery, gift card, or job but must pay registration/stamp/customs fee first.",
        [
            r"won\s+(?:lottery|award|prize|contest|iphone|car)",
            r"लॉटरी\s+(?:लागली|जिंकली|जीती)",
            r"इनाम\s+(?:मिळाले|जीता)",
            r"part[- ]time\s+job|work\s+from\s+home",
            r"like\s+youtube\s+videos?|like\s+and\s+subscribe",
            r"registration\s+fee|processing\s+fee|stamp\s+duty|customs\s+duty",
            r"रजिस्ट्रेशन\s+शुल्क|प्रोसेसिंग\s+फी|कस्टम्स\s+ड्युटी",
            r"refundable\s+deposit|refundable\s+fee"
        ]
    ),

    # 7. Unsolicited APK / Delivery Parcel Phishing
    (
        "delivery_parcel_impersonation",
        "delivery_phishing",
        25,
        "Courier / parcel customs held warning",
        "Claims an unexpected postal, FedEx, DHL, or India Post package is stuck pending payment.",
        [
            r"(?:fedex|dhl|india\s+post|bluedart)\s+(?:parcel|package|consignment)",
            r"parcel\s+(?:is\s+)?(?:held|detained|stuck|pending)",
            r"पार्सल\s+(?:अडकले|जप्त)",
            r"पार्सल\s+(?:अटका\s+हुआ|कस्टम\s+में)",
            r"pay\s+clearance\s+fee|address\s+confirmation"
        ]
    )
]


def evaluate_rules(text: str) -> RuleResult:
    """Execute rule analysis on text input. Returns score (0-100), flags, and suggested verdict."""
    if not text or not text.strip():
        return RuleResult(score=0, flags=[], suggested_verdict="green")

    text_lower = text.lower()
    matched_flags: List[RuleFlag] = []
    seen_flag_ids = set()

    # 1. URL Analysis
    url_flags = analyze_urls(text)
    for uf in url_flags:
        if uf.id not in seen_flag_ids:
            seen_flag_ids.add(uf.id)
            matched_flags.append(uf)

    # 2. Check for legitimate OTP warnings to avoid false flags
    has_legit_otp_warning = _check_legit_otp_warning(text_lower)

    # 3. Pattern Matching
    for rule_id, cat, weight, title, desc, patterns in PATTERN_RULES:
        # If text is a genuine bank message reminding the user NOT to share OTP, skip credentials flag
        if rule_id == "remote_access_credentials_request" and has_legit_otp_warning:
            # Check if text actually commands the user to install anydesk or send OTP
            if not any(tool in text_lower for tool in ["anydesk", "teamviewer", "quicksupport", ".apk"]):
                continue

        for pat in patterns:
            if re.search(pat, text_lower):
                if rule_id not in seen_flag_ids:
                    seen_flag_ids.add(rule_id)
                    matched_flags.append(RuleFlag(
                        id=rule_id,
                        category=cat,
                        weight=weight,
                        title=title,
                        description=desc
                    ))
                break

    # Calculate aggregate score with diminishing returns above 100
    raw_score = sum(f.weight for f in matched_flags)

    # Multi-flag compounding: if 2+ high-risk categories match, increase certainty
    if len(matched_flags) >= 3:
        raw_score = int(raw_score * 1.15)

    final_score = min(100, raw_score)

    # Determine suggested verdict based on score & flag categories
    if final_score >= SCORE_RED_THRESHOLD or any(f.id in ["digital_arrest_law_enforcement", "remote_access_credentials_request", "url_lookalike_phishing"] for f in matched_flags):
        suggested: VerdictLevel = "red"
    elif final_score >= SCORE_AMBER_THRESHOLD or len(matched_flags) >= 1:
        suggested: VerdictLevel = "amber"
    else:
        suggested: VerdictLevel = "green"

    return RuleResult(
        score=final_score,
        flags=matched_flags,
        suggested_verdict=suggested
    )
