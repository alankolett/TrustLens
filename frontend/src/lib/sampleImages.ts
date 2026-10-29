/**
 * Pre-loaded realistic forensic sample images for 1-click live jury demo.
 * Encoded as optimized SVG Data URIs with embedded graphic artifacts.
 */

export interface SampleImageCard {
  id: string;
  title: string;
  titleMr: string;
  titleHi: string;
  category: 'scam' | 'safe';
  expectedVerdict: 'red' | 'amber' | 'green';
  description: string;
  descriptionMr: string;
  descriptionHi: string;
  dataUrl: string;
  fileName: string;
  fileSizeKb: number;
}

export const SAMPLE_IMAGES: SampleImageCard[] = [
  {
    id: 'fake_cbi_warrant',
    title: 'Forged CBI / Police Digital Arrest Warrant',
    titleMr: 'बनावट सीबीआय / पोलीस डिजिटल अरेस्ट वॉरंट',
    titleHi: 'फर्जी सीबीआई / पुलिस डिजिटल अरेस्ट वारंट',
    category: 'scam',
    expectedVerdict: 'red',
    description: 'Counterfeit government emblem, mismatched legal fonts, and fabricated non-bailable arrest threat.',
    descriptionMr: 'बनावट शासकीय मुद्रा, चुकीचे फॉन्ट आणि खोटे अटक वॉरंट दाखवणारे फसवणूक पत्र.',
    descriptionHi: 'फर्जी सरकारी मुहर, बेमेल फॉन्ट और अवैध गिरफ्तारी वारंट का फर्जी नोटिस।',
    fileName: 'cbi_digital_arrest_notice_urgent.jpg',
    fileSizeKb: 142,
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="%23f8fafc">
      <rect width="600" height="800" fill="%23fdfbf7" stroke="%2394a3b8" stroke-width="4"/>
      <rect x="20" y="20" width="560" height="760" fill="none" stroke="%23dc2626" stroke-width="3" stroke-dasharray="8,4"/>
      <circle cx="300" cy="90" r="45" fill="%231e293b"/>
      <text x="300" y="98" fill="%23f8fafc" font-size="24" font-weight="900" text-anchor="middle" font-family="sans-serif">CBI</text>
      <text x="300" y="160" fill="%230f172a" font-size="20" font-weight="900" text-anchor="middle" font-family="sans-serif">CENTRAL BUREAU OF INVESTIGATION</text>
      <text x="300" y="185" fill="%23dc2626" font-size="14" font-weight="800" text-anchor="middle" font-family="sans-serif">CYBER CRIME ENFORCEMENT DIRECTORATE — MUMBAI</text>
      <line x1="50" y1="200" x2="550" y2="200" stroke="%23dc2626" stroke-width="2"/>
      <rect x="60" y="220" width="480" height="60" fill="%23fee2e2" rx="8"/>
      <text x="300" y="255" fill="%23991b1b" font-size="16" font-weight="900" text-anchor="middle" font-family="sans-serif">ORDER FOR IMMEDIATE 24-HOUR DIGITAL ARREST</text>
      <text x="60" y="320" fill="%23334155" font-size="13" font-family="monospace">CASE FILE: MH/CYBER/2026/8941-NCB</text>
      <text x="60" y="345" fill="%23334155" font-size="13" font-family="monospace">SUBJECT: Interception of Narcotics Consignment #DHL-4091</text>
      <text x="60" y="380" fill="%231e293b" font-size="14" font-family="sans-serif" font-weight="600">You are ordered not to leave premise. Connect to Skype video cell</text>
      <text x="60" y="405" fill="%231e293b" font-size="14" font-family="sans-serif" font-weight="600">within 60 minutes for judicial verification or face FIR seizure.</text>
      <rect x="360" y="580" width="180" height="120" fill="none" stroke="%23dc2626" stroke-width="3" rx="10" transform="rotate(-8 450 640)"/>
      <text x="450" y="635" fill="%23dc2626" font-size="18" font-weight="900" text-anchor="middle" font-family="sans-serif" transform="rotate(-8 450 640)">STRICTLY SECRET</text>
      <text x="450" y="660" fill="%23b91c1c" font-size="11" font-weight="800" text-anchor="middle" font-family="sans-serif" transform="rotate(-8 450 640)">NON-BAILABLE WARRANT</text>
    </svg>`
  },
  {
    id: 'ai_deepfake_celebrity',
    title: 'Synthetic Deepfake Celebrity Investment Ad',
    titleMr: 'AI द्वारे तयार केलेली बनावट सेलिब्रिटी गुंतवणूक जाहिरात',
    titleHi: 'AI द्वारा निर्मित फर्जी सेलिब्रिटी निवेश विज्ञापन',
    category: 'scam',
    expectedVerdict: 'red',
    description: 'Unnatural facial skin smoothness, synthetic lighting artifacts, and 300% guaranteed crypto claims.',
    descriptionMr: 'अनैसर्गिक प्लास्टिक त्वचा, विचित्र प्रकाश आणि १००% नफ्याचे खोटे आमिष दाखवणारा AI फोटो.',
    descriptionHi: 'चेहरे की अस्वाभाविक चिकनाहट और 100% मुनाफे का दावा करने वाली AI-जनित फर्जी तस्वीर।',
    fileName: 'ai_generated_vip_investment_ad_1024x1024.png',
    fileSizeKb: 380,
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="%230b0f19">
      <defs>
        <radialGradient id="aiGlow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="%23f97316" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="%230f172a" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="url(%23aiGlow)"/>
      <circle cx="300" cy="240" r="110" fill="%23fed7aa" stroke="%23f97316" stroke-width="4"/>
      <circle cx="260" cy="220" r="12" fill="%231e293b"/>
      <circle cx="340" cy="220" r="12" fill="%231e293b"/>
      <path d="M 260 280 Q 300 320 340 280" stroke="%23ea580c" stroke-width="6" fill="none"/>
      <rect x="40" y="400" width="520" height="160" fill="%230f172a" rx="16" stroke="%23f97316" stroke-width="2"/>
      <text x="300" y="440" fill="%23ffffff" font-size="20" font-weight="900" text-anchor="middle" font-family="sans-serif">"MY SECRET RS 10,000 WEALTH SYSTEM"</text>
      <text x="300" y="475" fill="%23f97316" font-size="16" font-weight="800" text-anchor="middle" font-family="sans-serif">GUARANTEED 300% WEEKLY PROFIT VIA CRYPTO</text>
      <rect x="180" y="500" width="240" height="40" fill="%2322c55e" rx="8"/>
      <text x="300" y="526" fill="%23ffffff" font-size="14" font-weight="900" text-anchor="middle" font-family="sans-serif">JOIN SECRET TELEGRAM</text>
      <rect x="450" y="20" width="130" height="30" fill="%23dc2626" rx="6"/>
      <text x="515" y="40" fill="%23ffffff" font-size="11" font-weight="900" text-anchor="middle" font-family="sans-serif">AI GENERATED GRID</text>
    </svg>`
  },
  {
    id: 'fake_upi_screenshot',
    title: 'Manipulated UPI / PhonePe Payment Slip',
    titleMr: 'बनावट PhonePe / UPI पेमेंट स्क्रीनशॉट',
    titleHi: 'फर्जी PhonePe / UPI भुगतान स्क्रीनशॉट',
    category: 'scam',
    expectedVerdict: 'amber',
    description: 'Altered transaction ID, mismatched rupee font weighting, and missing bank reference numbers.',
    descriptionMr: 'दुकानदारांची फसवणूक करण्यासाठी एडिट केलेला पैशांचा बनावट स्क्रीनशॉट.',
    descriptionHi: 'दुकानदारों को ठगने के लिए एडिट किया गया फर्जी भुगतान रसीद स्क्रीनशॉट।',
    fileName: 'upi_payment_successful_fake_edit.jpg',
    fileSizeKb: 95,
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600" fill="%23ffffff">
      <rect width="400" height="600" fill="%23f8fafc"/>
      <rect x="0" y="0" width="400" height="140" fill="%235f259f"/>
      <circle cx="200" cy="70" r="35" fill="%2322c55e"/>
      <path d="M 185 70 L 195 80 L 215 60" stroke="%23ffffff" stroke-width="5" fill="none" stroke-linecap="round"/>
      <text x="200" y="180" fill="%230f172a" font-size="18" font-weight="800" text-anchor="middle" font-family="sans-serif">Payment to Sharma General Store</text>
      <text x="200" y="235" fill="%230f172a" font-size="36" font-weight="900" text-anchor="middle" font-family="sans-serif">₹ 4,850.00</text>
      <text x="200" y="270" fill="%2316a34a" font-size="14" font-weight="800" text-anchor="middle" font-family="sans-serif">Paid Successfully</text>
      <rect x="30" y="310" width="340" height="160" fill="%23f1f5f9" rx="12" stroke="%23e2e8f0"/>
      <text x="50" y="345" fill="%2364748b" font-size="12" font-family="sans-serif">Transaction ID (Edited):</text>
      <text x="50" y="368" fill="%230f172a" font-size="13" font-family="monospace" font-weight="700">T26102819234810294</text>
      <text x="50" y="405" fill="%2364748b" font-size="12" font-family="sans-serif">UTR / Bank Ref No:</text>
      <text x="50" y="428" fill="%23ef4444" font-size="13" font-family="monospace" font-weight="700">INVALID_CHECKSUM_HASH</text>
    </svg>`
  },
  {
    id: 'fake_electricity_bill_qr',
    title: 'MSEDCL Power Disconnect Notice with Fraudulent QR',
    titleMr: 'महावितरण वीज बिल तोडण्याची नोटीस + वैयक्तिक QR कोड',
    titleHi: 'बिजली बिल काटने का नोटिस + फर्जी QR कोड',
    category: 'scam',
    expectedVerdict: 'red',
    description: 'Urgent power cut warning with personal phone number and unauthorized personal QR code.',
    descriptionMr: 'आज रात्री वीज कापण्याची भीती दाखवून वैयक्तिक खात्यावर पैसे मागण्याचा प्रकार.',
    descriptionHi: 'आज रात बिजली काटने की धमकी देकर निजी QR कोड पर पैसे मांगने की धोखाधड़ी।',
    fileName: 'msedcl_urgent_disconnection_qr.png',
    fileSizeKb: 165,
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="650" viewBox="0 0 500 650" fill="%23ffffff">
      <rect width="500" height="650" fill="%23fefefe" stroke="%23cbd5e1" stroke-width="2"/>
      <rect x="0" y="0" width="500" height="80" fill="%230284c7"/>
      <text x="250" y="48" fill="%23ffffff" font-size="20" font-weight="900" text-anchor="middle" font-family="sans-serif">MAHAVITARAN (MSEDCL)</text>
      <rect x="30" y="100" width="440" height="70" fill="%23fee2e2" rx="8" stroke="%23ef4444"/>
      <text x="250" y="130" fill="%23b91c1c" font-size="15" font-weight="900" text-anchor="middle" font-family="sans-serif">URGENT: POWER DISCONNECTION NOTICE TONIGHT</text>
      <text x="250" y="152" fill="%23991b1b" font-size="12" font-weight="700" text-anchor="middle" font-family="sans-serif">Unpaid Bill Amount: ₹ 2,340.00 — Disconnect at 09:30 PM</text>
      <text x="40" y="210" fill="%231e293b" font-size="13" font-family="sans-serif">Dear Consumer, scan the official payment code below immediately</text>
      <text x="40" y="232" fill="%231e293b" font-size="13" font-family="sans-serif">to prevent field lineman disconnection.</text>
      <rect x="150" y="270" width="200" height="200" fill="%230f172a" rx="12"/>
      <rect x="170" y="290" width="160" height="160" fill="%23ffffff" rx="6"/>
      <rect x="190" y="310" width="40" height="40" fill="%230f172a"/>
      <rect x="270" y="310" width="40" height="40" fill="%230f172a"/>
      <rect x="190" y="390" width="40" height="40" fill="%230f172a"/>
      <rect x="250" y="370" width="30" height="30" fill="%23ef4444"/>
      <text x="250" y="520" fill="%23ef4444" font-size="14" font-weight="800" text-anchor="middle" font-family="sans-serif">⚠️ Target: Personal UPI VPA (Not MSEDCL)</text>
    </svg>`
  },
  {
    id: 'authentic_camera_photo',
    title: 'Authentic Smartphone Camera Photograph (Safe)',
    titleMr: 'खऱ्याखुऱ्या कॅमेऱ्याने काढलेला मूळ फोटो (सुरक्षित)',
    titleHi: 'असली कैमरे से ली गई प्रामाणिक तस्वीर (सुरक्षित)',
    category: 'safe',
    expectedVerdict: 'green',
    description: 'Natural optical grain, true depth of field, authentic daylight shadows, and zero synthetic grid patterns.',
    descriptionMr: 'नैसर्गिक प्रकाश, खरा कॅमेरा सेन्सर ग्रेन आणि कोणत्याही फेरफार नसलेला अस्सल फोटो.',
    descriptionHi: 'प्राकृतिक प्रकाश और बिना किसी हेरफेर वाली कैमरे की असली प्रामाणिक तस्वीर।',
    fileName: 'camera_family_photo_verified.jpg',
    fileSizeKb: 220,
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450" fill="%23047857">
      <defs>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="%2338bdf8"/>
          <stop offset="60%" stop-color="%23bae6fd"/>
          <stop offset="100%" stop-color="%2386efac"/>
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="url(%23skyGrad)"/>
      <circle cx="120" cy="90" r="40" fill="%23fef08a" opacity="0.9"/>
      <path d="M 0 320 Q 150 260 300 310 T 600 290 L 600 450 L 0 450 Z" fill="%2315803d"/>
      <path d="M 50 350 Q 250 310 450 360 T 600 340 L 600 450 L 0 450 Z" fill="%23166534"/>
      <rect x="30" y="30" width="220" height="60" fill="%230f172a" opacity="0.8" rx="8"/>
      <text x="45" y="55" fill="%234ade80" font-size="12" font-family="monospace">EXIF: Sony IMX766 50MP</text>
      <text x="45" y="75" fill="%23cbd5e1" font-size="11" font-family="monospace">ISO 100 • 1/500s • f/1.88</text>
    </svg>`
  }
];
