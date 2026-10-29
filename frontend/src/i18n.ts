export type Language = 'en' | 'mr' | 'hi';

export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  badgeGov: string;

  // Tabs
  tabText: string;
  tabImage: string;
  tabVoice: string;
  tabVideo: string;
  tabAbout: string;
  badgeSoon: string;

  // Text Check Screen
  textInputLabel: string;
  textPlaceholder: string;
  btnCheckText: string;
  btnChecking: string;
  btnClear: string;
  btnPaste: string;
  samplesHeading: string;
  samplesHelp: string;

  // Image Check Screen
  imageUploadTitle: string;
  imageUploadSubtitle: string;
  btnSelectImage: string;
  btnCheckingImage: string;
  imageDragDrop: string;
  imageLimitNote: string;
  selectedImage: string;
  changeImage: string;

  // Verdict Display
  verdictRedTitle: string;
  verdictAmberTitle: string;
  verdictGreenTitle: string;
  confidenceLabel: string;
  reasonsTitle: string;
  adviceTitle: string;
  detectedFlagsTitle: string;
  disclaimer: string;
  offlineModeNotice: string;

  // Emergency & Safety Report
  emergencyHeader: string;
  emergencyAlertPaid: string;
  btnCall1930: string;
  btnOpenCybercrime: string;
  btnCopySummary: string;
  summaryCopied: string;

  // Family Safe-Word
  safeWordTitle: string;
  safeWordDesc: string;
  safeWordHow: string;

  // Responsible AI Page
  raiTitle: string;
  raiIntro: string;
  raiPillar1Title: string;
  raiPillar1Desc: string;
  raiPillar2Title: string;
  raiPillar2Desc: string;
  raiPillar3Title: string;
  raiPillar3Desc: string;
  raiPillar4Title: string;
  raiPillar4Desc: string;
  raiFeedbackTitle: string;
  raiFeedbackDesc: string;

  // Coming Soon tabs
  comingSoonTitle: string;
  comingSoonVoiceDesc: string;
  comingSoonVideoDesc: string;
  comingSoonBadge: string;
  backToHome: string;

  // Errors & Alerts
  errorEmptyText: string;
  errorFileTooLarge: string;
  errorInvalidFile: string;
  errorNetwork: string;
  errorGeneric: string;
}

export const I18N: Record<Language, TranslationStrings> = {
  en: {
    appTitle: "TrustLens",
    appSubtitle: "Citizen Cyber Defense & Verification",
    badgeGov: "Seva First 2026",

    tabText: "Message Check",
    tabImage: "Image Check",
    tabVoice: "Voice Check",
    tabVideo: "Video Check",
    tabAbout: "Responsible AI",
    badgeSoon: "Offline",

    textInputLabel: "Paste a suspicious message, SMS, or link",
    textPlaceholder: "Paste message here (e.g. CBI notice, electricity cut threat, bank KYC link, fake job offer)...",
    btnCheckText: "Check Message",
    btnChecking: "Checking message...",
    btnClear: "Clear",
    btnPaste: "Paste",
    samplesHeading: "Sample Scenarios",
    samplesHelp: "Select an example to see how TrustLens identifies threats and authentic communication:",

    imageUploadTitle: "Image & Document Inspection",
    imageUploadSubtitle: "Upload a payment slip, notice, or screenshot to check for tampering or forgery",
    btnSelectImage: "Select Image",
    btnCheckingImage: "Analyzing image...",
    imageDragDrop: "Click or drag an image here to inspect",
    imageLimitNote: "Supports JPG, PNG, WEBP (Max 5 MB). Processed locally in memory.",
    selectedImage: "Selected file",
    changeImage: "Change Image",

    verdictRedTitle: "High Risk Detected",
    verdictAmberTitle: "Suspicious Signals Found",
    verdictGreenTitle: "No Threat Detected",
    confidenceLabel: "Confidence",
    reasonsTitle: "Key Findings",
    adviceTitle: "Recommended Action",
    detectedFlagsTitle: "Matched Indicators",
    disclaimer: "TrustLens provides guidance, not formal legal proof.",
    offlineModeNotice: "Checked locally on device (offline)",

    emergencyHeader: "Immediate Assistance",
    emergencyAlertPaid: "If money was transferred or banking credentials entered, act immediately to freeze transfers:",
    btnCall1930: "Call Helpline 1930",
    btnOpenCybercrime: "cybercrime.gov.in",
    btnCopySummary: "Copy Incident Summary",
    summaryCopied: "Incident summary copied to clipboard",

    safeWordTitle: "Family Safe-Word Protection",
    safeWordDesc: "Scammers use AI voice clones to claim urgent family emergencies and ask for money.",
    safeWordHow: "Agree on a secret passphrase with your family (e.g., 'Gulabjamun'). If someone calls in distress demanding urgent funds, ask for the safe-word first.",

    raiTitle: "Responsible AI & Public Transparency",
    raiIntro: "TrustLens is designed for citizens, seniors, and small businesses in Maharashtra. Here is how it operates safely and transparently.",
    raiPillar1Title: "Dual-Layer Verification",
    raiPillar1Desc: "TrustLens combines a deterministic rule engine covering known Indian scam patterns (Digital Arrest, MSEDCL cutoff, fake KYC) with AI reasoning.",
    raiPillar2Title: "Zero Data Persistence",
    raiPillar2Desc: "We never store your messages, phone numbers, or uploaded images. Content is analyzed in memory and discarded immediately.",
    raiPillar3Title: "Transparent Limitations",
    raiPillar3Desc: "Scam detection is probabilistic. Novel social engineering tactics may evolve. TrustLens assists vigilance; it does not replace official police verification.",
    raiPillar4Title: "Accessible Across Communities",
    raiPillar4Desc: "Available in everyday Marathi, Hindi, and English with clean typography and zero confusing jargon.",
    raiFeedbackTitle: "Official Help & Incident Reporting",
    raiFeedbackDesc: "In any case of financial cyber fraud, immediately dial 1930 or lodge a report at cybercrime.gov.in.",

    comingSoonTitle: "Under Active Development",
    comingSoonVoiceDesc: "Detect AI voice cloning, deepfake audio calls, and fake emotional distress calls.",
    comingSoonVideoDesc: "Analyze video frames for synthetic lip-sync, edge blurring, and fake uniform backgrounds.",
    comingSoonBadge: "Phase 2",
    backToHome: "Back to Message Check",

    errorEmptyText: "Please paste or type a message to check.",
    errorFileTooLarge: "The file is larger than 5 MB. Please choose a smaller image.",
    errorInvalidFile: "Invalid file format. Please upload a valid JPG, PNG, or WEBP image.",
    errorNetwork: "Network error. Please check your internet connection.",
    errorGeneric: "An unexpected error occurred. Please try again."
  },

  mr: {
    appTitle: "ट्रस्टलेन्स (TrustLens)",
    appSubtitle: "नागरिक सायबर सुरक्षा व मेसेज तपासणी",
    badgeGov: "सेवा फर्स्ट २०२६",

    tabText: "मेसेज तपासा",
    tabImage: "फोटो तपासा",
    tabVoice: "व्हॉइस लॅब",
    tabVideo: "व्हिडिओ लॅब",
    tabAbout: "पारदर्शक AI",
    badgeSoon: "ऑफलाइन",

    textInputLabel: "संशयास्पद व्हॉट्सॲप मेसेज, एसएमएस किंवा लिंक टाका",
    textPlaceholder: "येथे मेसेज पेस्ट करा (उदा. वीज बिल कापण्याची धमकी, बँक खाते ब्लॉक, डिजिटल अरेस्ट, घरबसल्या नोकरीचे आमिष)...",
    btnCheckText: "मेसेज तपासा",
    btnChecking: "तपासणी सुरू आहे...",
    btnClear: "साफ करा",
    btnPaste: "पेस्ट करा",
    samplesHeading: "नमुना मेसेज",
    samplesHelp: "संशयास्पद व सुरक्षित मेसेजची तपासणी पाहण्यासाठी खालील पर्यायांवर क्लिक करा:",

    imageUploadTitle: "फोटो व कागदपत्र तपासणी",
    imageUploadSubtitle: "बनावट नोटीस, वीज बिल किंवा पैशांचे संशयास्पद स्क्रीनशॉट तपासा",
    btnSelectImage: "फोटो निवडा",
    btnCheckingImage: "तपासणी सुरू आहे...",
    imageDragDrop: "फोटो निवडण्यासाठी येथे क्लिक करा",
    imageLimitNote: "JPG, PNG, WEBP (जास्तीत जास्त ५ MB). फोटो सेव्ह केला जात नाही.",
    selectedImage: "निवडलेली फाईल",
    changeImage: "दुसरा फोटो निवडा",

    verdictRedTitle: "धोका आढळला",
    verdictAmberTitle: "संशयास्पद संकेत",
    verdictGreenTitle: "कोणताही धोका नाही",
    confidenceLabel: "विश्वास पातळी",
    reasonsTitle: "तपासणीत काय आढळले?",
    adviceTitle: "काय करावे?",
    detectedFlagsTitle: "शोधलेले संकेत",
    disclaimer: "ट्रस्टलेन्स हे मार्गदर्शनासाठी आहे, कायदेशीर पुरावा नाही.",
    offlineModeNotice: "डिव्हाइसवर स्थानिक पातळीवर तपासले (ऑफलाइन)",

    emergencyHeader: "तातडीची मदत",
    emergencyAlertPaid: "तुम्ही पैसे पाठवले असल्यास किंवा बँक माहिती दिली असल्यास त्वरित कारवाई करा:",
    btnCall1930: "हेल्पलाईन १९३० ला कॉल करा",
    btnOpenCybercrime: "cybercrime.gov.in",
    btnCopySummary: "तक्रार सारांश कॉपी करा",
    summaryCopied: "तक्रार सारांश कॉपी झाला",

    safeWordTitle: "कुटुंबाचा 'गुप्त शब्द' (Safe-Word) उपाय",
    safeWordDesc: "गुन्हेगार AI द्वारे कुटुंबीयांचा हुबेहूब आवाज काढून पैशांची मागणी करू शकतात.",
    safeWordHow: "कुटुंबात एक गुप्त शब्द ठरवा (उदा. 'लाडू'). संकटाचा फोन आल्यास पैसे पाठवण्याआधी हा गुप्त शब्द नक्की विचारा.",

    raiTitle: "पारदर्शक व जबाबदार AI",
    raiIntro: "ट्रस्टलेन्स महाराष्ट्रातील सर्वसामान्य नागरिक, ज्येष्ठ नागरिक आणि छोट्या व्यावसायिकांच्या सुरक्षेसाठी तयार केले आहे.",
    raiPillar1Title: "दोन पदरी सुरक्षा",
    raiPillar1Desc: "स्थानिक गुन्हेगारी पद्धती (उदा. महावितरण बिल, डिजिटल अरेस्ट, केवायसी) आणि AI तंत्रज्ञान दोन्हीद्वारे पडताळणी केली जाते.",
    raiPillar2Title: "शून्य डेटा साठवणूक",
    raiPillar2Desc: "आम्ही तुमचे मेसेज, फोन नंबर किंवा फोटो साठवत नाही. तपासणी संपताच माहिती नष्ट होते.",
    raiPillar3Title: "पारदर्शक मर्यादा",
    raiPillar3Desc: "हे नागरिकांच्या सतर्कतेसाठी सहाय्यक साधन आहे; अधिकृत पोलीस तपासाचा पर्याय नाही.",
    raiPillar4Title: "सुलभ भाषा",
    raiPillar4Desc: "क्लिष्ट शब्द न वापरता सहज मराठी, हिंदी आणि इंग्रजीत स्पष्ट माहिती दिली जाते.",
    raiFeedbackTitle: "मदत आणि तक्रार निवारण",
    raiFeedbackDesc: "कोणत्याही सायबर फसवणुकीच्या बाबतीत तात्काळ १९३० हेल्पलाईनवर किंवा cybercrime.gov.in वर तक्रार नोंदवा.",

    comingSoonTitle: "लवकरच उपलब्ध होत आहे",
    comingSoonVoiceDesc: "फोनवरील बनावट AI आवाज ओळखण्याची सुविधा.",
    comingSoonVideoDesc: "व्हिडिओ कॉलवरील खोटे पोलीस गणवेश किंवा चेहरे ओळखण्याची सुविधा.",
    comingSoonBadge: "टप्पा २",
    backToHome: "मेसेज तपासणीकडे परत जा",

    errorEmptyText: "कृपया तपासण्यासाठी मेसेज टाका.",
    errorFileTooLarge: "फोटो ५ MB पेक्षा मोठा आहे. लहान आकाराचा फोटो निवडा.",
    errorInvalidFile: "योग्य JPG, PNG किंवा WEBP फोटो निवडा.",
    errorNetwork: "इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.",
    errorGeneric: "तपासणी करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा."
  },

  hi: {
    appTitle: "ट्रस्टलेंस (TrustLens)",
    appSubtitle: "नागरिक साइबर सुरक्षा व संदेश जांच",
    badgeGov: "सेवा फर्स्ट 2026",

    tabText: "संदेश जांचें",
    tabImage: "फोटो जांचें",
    tabVoice: "वॉयस लैब",
    tabVideo: "वीडियो लैब",
    tabAbout: "पारदर्शी AI",
    badgeSoon: "ऑफलाइन",

    textInputLabel: "संदिग्ध मैसेज, एसएमएस या लिंक दर्ज करें",
    textPlaceholder: "यहां संदेश पेस्ट करें (जैसे बिजली काटने की धमकी, बैंक खाता ब्लॉक, डिजिटल अरेस्ट, पार्ट-टाइम नौकरी का झांसा)...",
    btnCheckText: "संदेश जांचें",
    btnChecking: "जांच जारी है...",
    btnClear: "साफ करें",
    btnPaste: "पेस्ट करें",
    samplesHeading: "नमूना संदेश",
    samplesHelp: "स्कैम और सुरक्षित संदेशों की जांच देखने के लिए नीचे दिए गए किसी भी विकल्प पर क्लिक करें:",

    imageUploadTitle: "फोटो व दस्तावेज जांच",
    imageUploadSubtitle: "संदिग्ध पुलिस नोटिस, बिजली बिल या भुगतान स्क्रीनशॉट की जांच करें",
    btnSelectImage: "फोटो चुनें",
    btnCheckingImage: "जांच हो रही है...",
    imageDragDrop: "फोटो चुनने के लिए यहां क्लिक करें",
    imageLimitNote: "JPG, PNG, WEBP (अधिकतम 5 MB)। कोई डेटा सेव नहीं होता।",
    selectedImage: "चुनी गई फाइल",
    changeImage: "दूसरी फोटो चुनें",

    verdictRedTitle: "उच्च जोखिम मिला",
    verdictAmberTitle: "संदिग्ध संकेत",
    verdictGreenTitle: "कोई खतरा नहीं मिला",
    confidenceLabel: "विश्वास स्तर",
    reasonsTitle: "जांच में क्या मिला?",
    adviceTitle: "आपको क्या करना चाहिए?",
    detectedFlagsTitle: "पाए गए संकेत",
    disclaimer: "ट्रस्टलेंस मार्गदर्शन के लिए है, कानूनी प्रमाण नहीं।",
    offlineModeNotice: "डिवाइस पर स्थानीय रूप से जाँचा गया (ऑफलाइन)",

    emergencyHeader: "त्वरित सहायता",
    emergencyAlertPaid: "यदि आपने पैसे भेज दिए हैं या बैंक विवरण दिया है, तो तुरंत कार्रवाई करें:",
    btnCall1930: "हेल्पलाइन 1930 पर कॉल करें",
    btnOpenCybercrime: "cybercrime.gov.in",
    btnCopySummary: "तक्रार सारांश कॉपी करें",
    summaryCopied: "शिकायत सारांश कॉपी हो गया",

    safeWordTitle: "परिवार का 'गुप्त कोड' (Safe-Word) उपाय",
    safeWordDesc: "धोखेबाज AI से परिजनों की आवाज नकल करके इमरजेंसी के नाम पर पैसे मांग सकते हैं।",
    safeWordHow: "परिवार में एक गुप्त शब्द तय करें (जैसे 'गुलाबजामुन')। किसी का संकट भरा फोन आने पर पैसे भेजने से पहले वह गुप्त शब्द जरूर पूछें।",

    raiTitle: "जिम्मेदार और पारदर्शी AI",
    raiIntro: "ट्रस्टलेंस को आम नागरिकों, वरिष्ठ नागरिकों और छोटे व्यापारियों की सुरक्षा के लिए बनाया गया है।",
    raiPillar1Title: "दोहरी सुरक्षा प्रणाली",
    raiPillar1Desc: "भारत में प्रचलित फ्रॉड पैटर्न (डिजिटल अरेस्ट, बिजली बिल, फर्जी केवाईसी) के नियमों और AI दोनों का उपयोग किया जाता है।",
    raiPillar2Title: "शून्य डेटा संग्रह",
    raiPillar2Desc: "हम आपके संदेश, फोन नंबर या फोटो स्टोर नहीं करते। जांच के तुरंत बाद डेटा मिटा दिया जाता है।",
    raiPillar3Title: "पारदर्शी सीमाएं",
    raiPillar3Desc: "यह जनता की सतर्कता के लिए साधन है, पुलिस जांच का विकल्प नहीं।",
    raiPillar4Title: "सरल भाषा",
    raiPillar4Desc: "बिना किसी तकनीकी उलझन के सहज हिंदी, मराठी और अंग्रेजी में साफ संदेश।",
    raiFeedbackTitle: "सहायता व शिकायत",
    raiFeedbackDesc: "किसी भी साइबर अपराध की स्थिति में सीधे 1930 पर कॉल करें या cybercrime.gov.in पर रिपोर्ट दर्ज करें।",

    comingSoonTitle: "जल्द उपलब्ध",
    comingSoonVoiceDesc: "फोन कॉल पर फर्जी AI आवाज को तुरंत पहचानने की सुविधा।",
    comingSoonVideoDesc: "वीडियो कॉल पर नकली पुलिस वर्दी या AI चेहरे के हेरफेर को पकड़ने की सुविधा।",
    comingSoonBadge: "चरण 2",
    backToHome: "संदेश जांच पर वापस जाएं",

    errorEmptyText: "कृपया जांच के लिए कोई संदेश दर्ज करें।",
    errorFileTooLarge: "फाइल 5 MB से बड़ी है। छोटी फाइल चुनें।",
    errorInvalidFile: "कृपया वैध JPG, PNG या WEBP फोटो चुनें।",
    errorNetwork: "इंटरनेट कनेक्शन की जांच करें और पुनः प्रयास करें।",
    errorGeneric: "जांच के दौरान त्रुटि हुई। कृपया पुनः प्रयास करें।"
  }
};
