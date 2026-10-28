# TrustLens Demonstration Samples

This folder contains realistic benchmark samples designed for the **Seva First Innovation Challenge 2026** live demo.

## Text Samples (`samples.json`)
The application includes 10 pre-loaded realistic scenarios covering Maharashtra-specific threat landscapes and common cyber attacks:
1. **Digital Arrest Notice (English)** — Fake CBI / Mumbai Police cyber cell threats, Skype interrogation, non-bailable arrest pressure.
2. **MSEDCL Electricity Power Cut (Marathi)** — Classic Mahavitaran unpaid bill disconnect warning targeting households.
3. **SBI Yono Account KYC Block (Hindi)** — PAN/Aadhaar expiry phishing with suspicious lookalike link.
4. **Guaranteed Stock Returns (English)** — VIP WhatsApp/Telegram trading scam promising 300% weekly returns.
5. **PM Kisan Subsidy AnyDesk (Marathi)** — Social engineering coercing rural farmers to install remote access tools.
6. **Work-from-Home YouTube Like Scam (Hindi)** — Part-time task fraud demanding advance "refundable" fees.
7. **Customs Clearance Lottery (English)** — Advance fee fraud with fake consignment parcels at airport.
8. **Legitimate Bank OTP Notice (English - Safe)** — Standard transactional security message with anti-scam warnings.
9. **Family Grocery Message (Marathi - Safe)** — Everyday safe communication without false alarms.
10. **Family Festival Greeting (Hindi - Safe)** — Cultural festival wish with zero threat indicators.

---

## 5 Recommended Test Images for Visual & Deepfake Verification
For the jury demo, prepare these 5 image files (place them in `samples/images/` or select them from your device during the live presentation):

1. **`01_fake_police_cbi_id.jpg`**
   - *Description:* A counterfeit Mumbai Police / CBI warrant or officer ID card with mismatched fonts, distorted government seals, or AI-generated portraits with unnatural ear/eye symmetry.
   - *Expected Verdict:* **RED (High Scam/AI Risk)**

2. **`02_ai_celebrity_crypto_endorsement.png`**
   - *Description:* Midjourney/Flux generated image showing an Indian celebrity, politician, or industrialist allegedly promoting a get-rich-quick crypto trading scheme. Common artifacts: 6 fingers, glossy plastic skin texture, warped background text.
   - *Expected Verdict:* **RED (AI Deepfake + Financial Scam)**

3. **`03_fake_upi_payment_screenshot.jpg`**
   - *Description:* A fabricated Google Pay / PhonePe "Payment Successful" screenshot with misaligned rupee symbols, wrong fonts, or edited transaction IDs commonly used to cheat small shopkeepers.
   - *Expected Verdict:* **RED / AMBER (Manipulated Receipt)**

4. **`04_suspicious_bill_qr_notice.png`**
   - *Description:* A printed notice alleging an urgent electricity or bank KYC update with an unauthorized personal UPI QR code pasted over official letterhead.
   - *Expected Verdict:* **AMBER / RED (Phishing Document)**

5. **`05_real_camera_family_photo.jpg`**
   - *Description:* An authentic JPEG photograph taken directly with a smartphone camera containing real EXIF camera metadata (lens info, focal length, ISO) and natural environmental lighting.
   - *Expected Verdict:* **GREEN (Safe / Authentic Photo)**
