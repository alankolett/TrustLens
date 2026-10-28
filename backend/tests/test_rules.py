"""Unit tests for TrustLens Scam Rule Engine."""
import pytest
from backend.rules import evaluate_rules, analyze_urls

def test_digital_arrest_english():
    text = "CBI Notice: Mumbai Police intercepted narcotics under your Aadhaar. You are placed under 24-hour DIGITAL ARREST. Join Skype immediately."
    result = evaluate_rules(text)
    assert result.suggested_verdict == "red"
    assert result.score >= 50
    flag_ids = [f.id for f in result.flags]
    assert "digital_arrest_law_enforcement" in flag_ids

def test_digital_arrest_marathi():
    text = "सायबर सेल मुंबई: तुमच्या नावावर अटक वॉरंट जारी झाले आहे. डिजिटल अरेस्ट टाळण्यासाठी तात्काळ संपर्क करा."
    result = evaluate_rules(text)
    assert result.suggested_verdict in ("red", "amber")
    assert any("digital_arrest" in f.id or "authority" in f.category for f in result.flags)

def test_fake_msedcl_marathi():
    text = "प्रिय ग्राहक, महावितरण वीज बिल थकबाकीमुळे आज रात्री वीज पुरवठा खंडित केला जाईल. तात्काळ 9822000000 वर कॉल करा."
    result = evaluate_rules(text)
    assert result.suggested_verdict in ("red", "amber")
    flag_ids = [f.id for f in result.flags]
    assert "fake_kyc_account_electricity_block" in flag_ids

def test_fake_kyc_hindi():
    text = "प्रिय ग्राहक, आपका एसबीआई बैंक खाता आज रात ब्लॉक कर दिया जाएगा। तुरंत केवाईसी अपडेट करने के लिए संपर्क करें।"
    result = evaluate_rules(text)
    assert result.suggested_verdict in ("red", "amber")
    flag_ids = [f.id for f in result.flags]
    assert "fake_kyc_account_electricity_block" in flag_ids

def test_stock_crypto_guaranteed():
    text = "VIP stock group: Guaranteed 300% returns in 7 days. Risk-free profit sharing. Deposit Rs 10000 get Rs 40000."
    result = evaluate_rules(text)
    assert result.score >= 40
    flag_ids = [f.id for f in result.flags]
    assert "investment_crypto_stock_scam" in flag_ids

def test_remote_access_anydesk():
    text = "Please download AnyDesk app and share the 9 digit code to verify your PM Kisan subsidy payment."
    result = evaluate_rules(text)
    assert result.suggested_verdict == "red"
    flag_ids = [f.id for f in result.flags]
    assert "remote_access_credentials_request" in flag_ids

def test_suspicious_urls():
    text = "Update KYC here: http://sbi-kyc-verify.xyz/login or http://192.168.1.1/pay and bit.ly/claim-bonus"
    flags = analyze_urls(text)
    flag_ids = [f.id for f in flags]
    assert "url_suspicious_tld" in flag_ids or "url_lookalike_phishing" in flag_ids
    assert "url_ip_address" in flag_ids
    assert "url_shortener" in flag_ids

def test_legit_bank_otp_no_false_positive():
    text = "749201 is your OTP for purchase of Rs. 1,450.00 at DMART on HDFC Bank Card. NEVER share OTP with anyone, including bank staff."
    result = evaluate_rules(text)
    # Legit warning should NOT flag credential theft
    flag_ids = [f.id for f in result.flags]
    assert "remote_access_credentials_request" not in flag_ids
    assert result.suggested_verdict == "green"
    assert result.score < 20

def test_harmless_family_message_marathi():
    text = "आई, मी संध्याकाळी ७ वाजता घरी येईन. येताना भाजी आणि दूध घेऊन येतो."
    result = evaluate_rules(text)
    assert result.suggested_verdict == "green"
    assert result.score == 0
    assert len(result.flags) == 0

def test_harmless_family_message_hindi():
    text = "नमस्ते चाचीजी, आप सभी को नववर्ष की हार्दिक शुभकामनाएं! आशा है आप सभी सकुशल हैं।"
    result = evaluate_rules(text)
    assert result.suggested_verdict == "green"
    assert result.score == 0
