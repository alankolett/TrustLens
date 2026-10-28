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

  // Verdict Card
  verdictRedTitle: string;
  verdictAmberTitle: string;
  verdictGreenTitle: string;
  confidenceLabel: string;
  reasonsTitle: string;
  adviceTitle: string;
  detectedFlagsTitle: string;
  disclaimer: string;
  offlineModeNotice: string;

  // Safety & Emergency
  emergencyHeader: string;
  emergencyAlertPaid: string;
  btnCall1930: string;
  btnOpenCybercrime: string;
  btnCopySummary: string;
  summaryCopied: string;

  // Family Safe-Word Tip
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

  // Coming Soon
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
    appSubtitle: "Citizen Scam Shield & Deepfake Detector",
    badgeGov: "Seva First Innovation 2026",

    tabText: "Message Check",
    tabImage: "Image Check",
    tabVoice: "Voice Check",
    tabVideo: "Video Check",
    tabAbout: "Responsible AI",
    badgeSoon: "Coming Soon",

    textInputLabel: "Paste suspicious WhatsApp message, SMS or link",
    textPlaceholder: "Paste message here (e.g. CBI notice, electricity cut threat, bank KYC link, part-time job offer)...",
    btnCheckText: "Check Message Now",
    btnChecking: "Scanning for scams...",
    btnClear: "Clear",
    btnPaste: "Paste from Clipboard",
    samplesHeading: "Live Demo: Try a real-world sample",
    samplesHelp: "Click any scenario below to test TrustLens with common scams and safe messages:",

    imageUploadTitle: "Check Suspicious Image or Document",
    imageUploadSubtitle: "Upload suspicious screenshots, forged government notices, or potential AI deepfake photos",
    btnSelectImage: "Choose Image",
    btnCheckingImage: "Analyzing Image & Forensics...",
    imageDragDrop: "Tap to upload or drag image here",
    imageLimitNote: "Supports JPG, PNG, WEBP (Max 5 MB). Processed in memory; never saved.",
    selectedImage: "Selected file",
    changeImage: "Change Image",

    verdictRedTitle: "DANGER: HIGH SCAM RISK",
    verdictAmberTitle: "CAUTION: SUSPICIOUS SIGNALS",
    verdictGreenTitle: "SAFE: NO OBVIOUS RISK",
    confidenceLabel: "Confidence Level",
    reasonsTitle: "Key Findings",
    adviceTitle: "What you must do right now",
    detectedFlagsTitle: "Signals detected by rule engine",
    disclaimer: "TrustLens is an aid, not legal proof.",
    offlineModeNotice: "Evaluated using Rule Engine (Fast Offline Mode)",

    emergencyHeader: "Emergency Cyber Actions",
    emergencyAlertPaid: "If you already transferred money or entered bank details, act within the golden hour:",
    btnCall1930: "Call Cyber Helpline 1930",
    btnOpenCybercrime: "Open cybercrime.gov.in",
    btnCopySummary: "Copy Complaint Summary",
    summaryCopied: "Complaint Summary Copied!",

    safeWordTitle: "Family Safe-Word Defense",
    safeWordDesc: "Scammers now use AI to clone family voices and plead for urgent money over the phone.",
    safeWordHow: "Agree on a secret word with your family today (e.g., 'Gulabjamun' or a village pet name). If someone calls claiming an emergency, ask for the secret word before sending any money.",

    raiTitle: "Responsible AI & Public Transparency",
    raiIntro: "TrustLens is built specifically for everyday citizens, seniors, and small businesses in Maharashtra. Here is how it protects you ethically and transparently.",
    raiPillar1Title: "Dual-Layer Hybrid Intelligence",
    raiPillar1Desc: "TrustLens combines a deterministic rule engine (covering Indian scam patterns like Digital Arrest, MSEDCL cut, KYC blocks) with modern AI models (xAI Grok). Conservative logic ensures that if either system detects red risk, the citizen is warned.",
    raiPillar2Title: "Zero Data Storage & Stateless Privacy",
    raiPillar2Desc: "We never store your messages, phone numbers, or uploaded images in any database. Images and text are evaluated strictly in transient memory and wiped immediately upon generating your report.",
    raiPillar3Title: "Known Limitations & Honest AI",
    raiPillar3Desc: "AI is probabilistic, not infallible. Novel social engineering tactics or highly sophisticated forged documents may occasionally evade detection. TrustLens assists judgment; it does not replace official police verification.",
    raiPillar4Title: "Accessible to All Communities",
    raiPillar4Desc: "Available in everyday Marathi, Hindi, and English with high contrast, large typography, and zero confusing technical jargon.",
    raiFeedbackTitle: "Report False Findings & Help Others",
    raiFeedbackDesc: "If a harmless message was marked as scam or a scam was missed, contact the Maharashtra Cyber Police helpline or report directly at cybercrime.gov.in.",

    comingSoonTitle: "Under Active Development",
    comingSoonVoiceDesc: "Detect AI voice cloning, deepfake audio calls, and fake emotional kidnap distress calls in real time.",
    comingSoonVideoDesc: "Analyze video call frames for facial warping, synthetic lip-sync mismatch, and fake police uniform backgrounds.",
    comingSoonBadge: "Phase 2 Pipeline",
    backToHome: "Back to Message Check",

    errorEmptyText: "Please paste or type a message to check.",
    errorFileTooLarge: "The file is larger than 5 MB. Please choose a smaller image.",
    errorInvalidFile: "Invalid file format. Please upload a valid JPG, PNG, or WEBP image.",
    errorNetwork: "Network error. Please check your internet connection and try again.",
    errorGeneric: "An unexpected error occurred during verification. Please try again."
  },

  mr: {
    appTitle: "ट्रस्टलेन्स (TrustLens)",
    appSubtitle: "नागरिक सायबर सुरक्षा व बनावट मेसेज तपासणी",
    badgeGov: "सेवा फर्स्ट इनोव्हेशन २०२६",

    tabText: "मेसेज तपासा",
    tabImage: "फोटो तपासा",
    tabVoice: "आवाज तपासा",
    tabVideo: "व्हिडिओ तपासा",
    tabAbout: "पारदर्शक AI",
    badgeSoon: "लवकरच येत आहे",

    textInputLabel: "संशयास्पद व्हॉट्सॲप मेसेज, एसएमएस किंवा लिंक येथे टाका",
    textPlaceholder: "येथे मेसेज पेस्ट करा (उदा. वीज बिल कापण्याची धमकी, बँक खाते ब्लॉक, डिजिटल अरेस्ट, घरबसल्या नोकरीचे आमिष)...",
    btnCheckText: "मेसेज आत्ताच तपासा",
    btnChecking: "तपासणी सुरू आहे...",
    btnClear: "साफ करा",
    btnPaste: "पेस्ट करा",
    samplesHeading: "लाईव्ह डेमो: प्रत्यक्ष नमुने वापरून पहा",
    samplesHelp: "खऱ्याखुऱ्या फसव्या आणि सुरक्षित मेसेजची चाचणी घेण्यासाठी खालील पर्यायांवर क्लिक करा:",

    imageUploadTitle: "संशयास्पद फोटो किंवा कागदपत्र तपासा",
    imageUploadSubtitle: "बनावट पोलीस वॉरंट, वीज बिल नोटीस किंवा संशयास्पद पैशांचे स्क्रीनशॉट तपासा",
    btnSelectImage: "फोटो निवडा",
    btnCheckingImage: "फोटोची तपासणी सुरू आहे...",
    imageDragDrop: "फोटो निवडण्यासाठी येथे स्पर्श करा",
    imageLimitNote: "JPG, PNG, WEBP (जास्तीत जास्त ५ MB). फोटो सेव्ह केला जात नाही.",
    selectedImage: "निवडलेली फाईल",
    changeImage: "दुसरा फोटो निवडा",

    verdictRedTitle: "धोका: फसवणुकीची मोठी शक्यता!",
    verdictAmberTitle: "सावधान: संशयास्पद संकेत",
    verdictGreenTitle: "सुरक्षित: कोणताही उघड धोका नाही",
    confidenceLabel: "खात्री पातळी",
    reasonsTitle: "तपासणीत काय आढळले?",
    adviceTitle: "तुम्ही आत्ता काय करावे?",
    detectedFlagsTitle: "नियम इंजिनने शोधलेले धोके",
    disclaimer: "ट्रस्टलेन्स हे सहाय्यक साधन आहे, कायदेशीर पुरावा नाही.",
    offlineModeNotice: "नियम इंजिनद्वारे तपासणी (जलद ऑफलाइन मोड)",

    emergencyHeader: "तातडीची सायबर मदत",
    emergencyAlertPaid: "तुम्ही आधीच पैसे पाठवले असल्यास किंवा बँक माहिती दिली असल्यास त्वरित कारवाई करा:",
    btnCall1930: "सायबर हेल्पलाईन १९३० ला कॉल करा",
    btnOpenCybercrime: "cybercrime.gov.in उघडा",
    btnCopySummary: "तक्रार सारांश कॉपी करा",
    summaryCopied: "तक्रार सारांश कॉपी झाला!",

    safeWordTitle: "कुटुंबाचा 'गुप्त शब्द' (Safe-Word) उपाय",
    safeWordDesc: "सायबर गुन्हेगार आता AI च्या मदतीने घरातील माणसांचा हुबेहूब आवाज काढून पैशांची मागणी करतात.",
    safeWordHow: "आजच आपल्या कुटुंबात एक गुप्त शब्द ठरवा (उदा. 'लाडू' किंवा आवडत्या गावाची आठवण). संकटाचा फोन आल्यास घाईघाईने पैसे पाठवण्याआधी तो गुप्त शब्द विचारा.",

    raiTitle: "पारदर्शक व जबाबदार AI (Responsible AI)",
    raiIntro: "ट्रस्टलेन्स हे महाराष्ट्रातील सर्वसामान्य नागरिक, ज्येष्ठ नागरिक आणि छोट्या व्यावसायिकांसाठी बनवले आहे. हे पारदर्शकपणे कसे कार्य करते ते पहा:",
    raiPillar1Title: "दोन पदरी सुरक्षा प्रणाली",
    raiPillar1Desc: "महाराष्ट्रातील गुन्हेगारी पद्धती (उदा. महावितरण वीज तोडणे, डिजिटल अरेस्ट, केवायसी फसवणूक) आणि आधुनिक AI मॉडेल दोन्ही मिळून तपासणी करतात. एकानेही धोका दाखवला तर लगेच नागरिकाला सावध केले जाते.",
    raiPillar2Title: "माहिती गोपनीय राहते - काहीही साठवले जात नाही",
    raiPillar2Desc: "आम्ही तुमचे मेसेज, फोन नंबर किंवा फोटो डेटाबेसमध्ये कधीही सेव्ह करत नाही. तपासणी झाल्यावर सर्व डेटा त्वरित नष्ट केला जातो.",
    raiPillar3Title: "मर्यादा आणि खरी माहिती",
    raiPillar3Desc: "AI कधीही १००% अचूक असल्याचा दावा करत नाही. हे केवळ नागरिकांच्या मदतीसाठी बनवलेले साधन आहे; अधिकृत पोलीस तपासाची ही जागा घेऊ शकत नाही.",
    raiPillar4Title: "सुलभ आणि साध्या मराठीत",
    raiPillar4Desc: "मोठ्या अक्षरांमध्ये, क्लिष्ट तांत्रिक शब्द न वापरता घरच्या भाषेत माहिती दिली जाते.",
    raiFeedbackTitle: "मदत आणि तक्रार निवारण",
    raiFeedbackDesc: "कोणत्याही सायबर फसवणुकीच्या बाबतीत तात्काळ १९३० हेल्पलाईनवर किंवा cybercrime.gov.in वर तक्रार नोंदवा.",

    comingSoonTitle: "लवकरच उपलब्ध होत आहे",
    comingSoonVoiceDesc: "फोनवरील खोटा आवाज किंवा AI द्वारे तयार केलेले कॉल ओळखण्याची सुविधा.",
    comingSoonVideoDesc: "व्हिडिओ कॉलवरील खोटे पोलीस गणवेश किंवा बनावट चेहरे ओळखण्याची सुविधा.",
    comingSoonBadge: "पुढील टप्पा",
    backToHome: "मेसेज तपासणीकडे परत जा",

    errorEmptyText: "कृपया तपासण्यासाठी मेसेज टाका.",
    errorFileTooLarge: "फोटो ५ MB पेक्षा मोठा आहे. कृपया लहान आकाराचा फोटो निवडा.",
    errorInvalidFile: "कृपया योग्य JPG, PNG किंवा WEBP फोटो निवडा.",
    errorNetwork: "इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.",
    errorGeneric: "तपासणी करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा."
  },

  hi: {
    appTitle: "ट्रस्टलेंस (TrustLens)",
    appSubtitle: "नागरिक साइबर सुरक्षा व फ्रॉड जांच",
    badgeGov: "सेवा फर्स्ट इनोवेशन 2026",

    tabText: "संदेश जांचें",
    tabImage: "फोटो जांचें",
    tabVoice: "आवाज जांचें",
    tabVideo: "वीडियो जांचें",
    tabAbout: "पारदर्शी AI",
    badgeSoon: "जल्द आ रहा है",

    textInputLabel: "संदिग्ध व्हाट्सएप मैसेज, एसएमएस या लिंक यहां पेस्ट करें",
    textPlaceholder: "यहां संदेश पेस्ट करें (जैसे बिजली काटने की धमकी, बैंक खाता ब्लॉक, डिजिटल अरेस्ट, पार्ट-टाइम नौकरी का झांसा)...",
    btnCheckText: "अभी संदेश जांचें",
    btnChecking: "जांच जारी है...",
    btnClear: "साफ करें",
    btnPaste: "पेस्ट करें",
    samplesHeading: "लाइव डेमो: असली उदाहरण आजमाएं",
    samplesHelp: "स्कैम और सुरक्षित संदेशों की जांच देखने के लिए नीचे दिए गए किसी भी उदाहरण पर क्लिक करें:",

    imageUploadTitle: "संदिग्ध फोटो या दस्तावेज जांचें",
    imageUploadSubtitle: "फर्जी पुलिस नोटिस, बिजली बिल या संदिग्ध भुगतान स्क्रीनशॉट की जांच करें",
    btnSelectImage: "फोटो चुनें",
    btnCheckingImage: "फोटो की जांच हो रही है...",
    imageDragDrop: "फोटो चुनने के लिए यहां टैप करें",
    imageLimitNote: "JPG, PNG, WEBP (अधिकतम 5 MB)। कोई फोटो सेव नहीं किया जाता।",
    selectedImage: "चुनी गई फाइल",
    changeImage: "दूसरी फोटो चुनें",

    verdictRedTitle: "खतरा: धोखाधड़ी की भारी संभावना!",
    verdictAmberTitle: "सावधान: संदिग्ध संकेत",
    verdictGreenTitle: "सुरक्षित: कोई प्रत्यक्ष खतरा नहीं",
    confidenceLabel: "विश्वास स्तर",
    reasonsTitle: "जांच में क्या मिला?",
    adviceTitle: "आपको तुरंत क्या करना चाहिए?",
    detectedFlagsTitle: "नियम इंजन द्वारा पाए गए संकेत",
    disclaimer: "ट्रस्टलेंस एक सहायक साधन है, कानूनी प्रमाण नहीं।",
    offlineModeNotice: "नियम इंजन द्वारा जांच (त्वरित ऑफलाइन मोड)",

    emergencyHeader: "आपातकालीन साइबर सहायता",
    emergencyAlertPaid: "यदि आपने पहले ही पैसे भेज दिए हैं या बैंक विवरण दे दिया है, तो तुरंत कदम उठाएं:",
    btnCall1930: "साइबर हेल्पलाइन 1930 पर कॉल करें",
    btnOpenCybercrime: "cybercrime.gov.in खोलें",
    btnCopySummary: "शिकायत सारांश कॉपी करें",
    summaryCopied: "शिकायत सारांश कॉपी हो गया!",

    safeWordTitle: "परिवार का 'गुप्त कोड' (Safe-Word) उपाय",
    safeWordDesc: "धोखेबाज अब AI की मदद से रिश्तेदारों की आवाज नकल करके इमरजेंसी के नाम पर पैसे मांगते हैं।",
    safeWordHow: "आज ही अपने परिवार में एक गुप्त शब्द तय करें (जैसे 'गुलाबजामुन' या पसंदीदा जगह)। किसी का संकट भरा फोन आने पर पैसे भेजने से पहले वह गुप्त शब्द जरूर पूछें।",

    raiTitle: "जिम्मेदार और पारदर्शी AI (Responsible AI)",
    raiIntro: "ट्रस्टलेंस को विशेष रूप से आम नागरिकों, वरिष्ठ नागरिकों और छोटे व्यापारियों की सुरक्षा के लिए बनाया गया है।",
    raiPillar1Title: "दोहरी सुरक्षा प्रणाली",
    raiPillar1Desc: "भारत में प्रचलित फ्रॉड पैटर्न (डिजिटल अरेस्ट, बिजली बिल, फर्जी केवाईसी) के नियमों और आधुनिक AI दोनों का उपयोग किया जाता है। किसी एक में भी खतरा दिखने पर नागरिक को सावधान किया जाता है।",
    raiPillar2Title: "शून्य डेटा संग्रह - पूरी गोपनीयता",
    raiPillar2Desc: "हम आपके मैसेज, फोन नंबर या फोटो कभी किसी डेटाबेस में स्टोर नहीं करते। जांच के तुरंत बाद डेटा मिटा दिया जाता है।",
    raiPillar3Title: "सीमाएं और निष्पक्षता",
    raiPillar3Desc: "AI 100% अचूक होने का दावा नहीं करता। यह आम जनता की मदद के लिए एक सतर्कता साधन है, पुलिस जांच का विकल्प नहीं।",
    raiPillar4Title: "सरल भाषा और बड़े अक्षर",
    raiPillar4Desc: "बिना किसी तकनीकी उलझन के सहज हिंदी, मराठी और अंग्रेजी में साफ संदेश।",
    raiFeedbackTitle: "सहायता व शिकायत",
    raiFeedbackDesc: "किसी भी साइबर अपराध की स्थिति में सीधे 1930 पर कॉल करें या cybercrime.gov.in पर रिपोर्ट दर्ज करें।",

    comingSoonTitle: "जल्द आ रहा है",
    comingSoonVoiceDesc: "फोन कॉल पर फर्जी AI आवाज या क्लोन की गई आवाज को तुरंत पहचानने की सुविधा।",
    comingSoonVideoDesc: "वीडियो कॉल पर नकली पुलिस वर्दी या AI चेहरे के हेरफेर को पकड़ने की सुविधा।",
    comingSoonBadge: "चरण 2",
    backToHome: "संदेश जांच पर वापस जाएं",

    errorEmptyText: "कृपया जांच के लिए कोई संदेश दर्ज करें।",
    errorFileTooLarge: "फाइल 5 MB से बड़ी है। कृपया छोटी फाइल चुनें।",
    errorInvalidFile: "कृपया वैध JPG, PNG या WEBP फोटो चुनें।",
    errorNetwork: "इंटरनेट कनेक्शन की जांच करें और पुनः प्रयास करें।",
    errorGeneric: "जांच के दौरान त्रुटि हुई। कृपया पुनः प्रयास करें।"
  }
};
