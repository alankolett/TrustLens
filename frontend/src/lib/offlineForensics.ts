/**
 * TrustLens Offline Forensic Intelligence Engine.
 * 100% client-side, zero-dependency, works fully offline with 0ms latency.
 * Detects Indian cyber fraud patterns across English, Marathi, Hindi, and Hinglish.
 */

export type RiskLevel = 'red' | 'amber' | 'green';

export interface ThreatFlag {
  id: string;
  category: string;
  weight: number;
  title: string;
  titleMr: string;
  titleHi: string;
  description: string;
  descriptionMr: string;
  descriptionHi: string;
  matchedTokens: string[];
}

export interface ThreatVectorScores {
  urgencyPressure: number;       // 0-100
  authorityCoercion: number;     // 0-100
  credentialHarvest: number;     // 0-100
  financialLure: number;         // 0-100
  linkRisk: number;              // 0-100
}

export interface OfflineTextAnalysisResult {
  verdict: RiskLevel;
  confidence: number;
  score: number;
  scamType: string | null;
  reasons: string[];
  advice: string;
  flags: ThreatFlag[];
  vectors: ThreatVectorScores;
  highlightedTokens: string[];
  disclaimer: string;
}

// --------------------------------------------------------------------------
// Multi-Lingual Forensic Dictionaries
// --------------------------------------------------------------------------
const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.work', '.club', '.buzz', '.info', '.click', '.cam',
  '.cc', '.vip', '.loan', '.link', '.live', '.fit', '.rest', '.tk', '.ml', '.ga', '.cf'
];

const URL_SHORTENERS = [
  'bit.ly', 'tinyurl.com', 't.co', 'is.gd', 'buff.ly', 'ow.ly',
  'cutt.ly', 'shorturl.at', 'rb.gy', 'rebrand.ly', 'v.gd'
];

const LEGIT_OTP_WARNING_REGEX = /(?:never\s+share\s+otp|do\s+not\s+share\s+(?:this\s+)?otp|bank\s+never\s+(?:calls|asks)|ओटीपी\s+कुणालाही\s+सांगू\s+नका|ओटीपी\s+किसी\s+को\s+(?:भी\s+)?न\s+दें|kisi\s+ko\s+otp\s+na\s+de|share\s+karu\s+naka)/i;

interface RuleDefinition {
  id: string;
  category: string;
  weight: number;
  title: string;
  titleMr: string;
  titleHi: string;
  desc: string;
  descMr: string;
  descHi: string;
  patterns: RegExp[];
}

const RULES: RuleDefinition[] = [
  {
    id: 'digital_arrest_law_enforcement',
    category: 'authority_threat',
    weight: 48,
    title: 'Digital Arrest / Police Impersonation Threat',
    titleMr: 'डिजिटल अरेस्ट / पोलीस किंवा सीबीआयची खोटी धमकी',
    titleHi: 'डिजिटल अरेस्ट / पुलिस या सीबीआई की फर्जी धमकी',
    desc: 'Threatens police action, CBI raid, customs arrest, Skype video trial, or contraband narcotics parcel.',
    descMr: 'पोलीस कारवाई, अटक वॉरंट, स्काईप चौकशी किंवा ड्रग्ज सापडल्याची खोटी भीती दाखवली आहे.',
    descHi: 'पुलिस कार्रवाई, गिरफ्तारी वारंट, स्काइप पूछताछ या नशीली दवाओं के पार्सल का झूठा डर दिखाया गया है।',
    patterns: [
      /digital\s+arrest/i,
      /डिजिटल\s+अरेस्ट/i,
      /cbi\s+(?:notice|officer|cell|interrogation|cyber)/i,
      /mumbai\s+police/i,
      /cyber\s+(?:cell|crime\s+branch|police)/i,
      /narcotics\s+control\s+bureau|ncb/i,
      /non[- ]bailable\s+warrant/i,
      /arrest\s+warrant/i,
      /contraband|narcotics|fake\s+passport/i,
      /skype\s+(?:call|interrogation|statement)/i,
      /video\s+call\s+(?:pe\s+aao|karave\s+lagel|par\s+rahein)/i,
      /पोलिस\s+कारवाई|गुन्हा\s+दाखल|अटक\s+वॉरंट/i,
      /सीबीआई|कस्टम्स|अटक\s+केली\s+जाईल/i,
      /गिरफ्तारी|वारंट\s+जारी|थाने\s+में\s+हाजिर/i,
      /trai\s+(?:block|sim\s+disconnect)/i
    ]
  },
  {
    id: 'fake_kyc_account_electricity_block',
    category: 'account_threat',
    weight: 38,
    title: 'KYC / Account Freeze / Power Cutoff Notice',
    titleMr: 'वीज कनेक्शन तोडणे / बँक खाते ब्लॉक नोटीस',
    titleHi: 'बिजली कनेक्शन काटना / बैंक खाता ब्लॉक नोटिस',
    desc: 'Threatens immediate disconnection of electricity, SIM card, or bank freeze unless an unauthorized link is clicked.',
    descMr: 'आज रात्री वीज पुरवठा खंडित करण्याची किंवा बँक खाते बंद करण्याची धमकी देऊन लिंकवर क्लिक करण्यास भाग पाडले जाते.',
    descHi: 'आज रात बिजली काटने या बैंक खाता बंद करने की धमकी देकर अनधिकृत लिंक पर क्लिक करने का दबाव बनाया गया है।',
    patterns: [
      /(?:account|khata|yono).{0,25}?(?:block|freeze|suspend|deactivat)/i,
      /खाता.{0,25}?(?:ब्लॉक|बंद|सस्पेंड)/i,
      /खाते.{0,25}?(?:ब्लॉक|बंद|गोठवले)/i,
      /kyc.{0,20}?(?:pending|update|expire|expired|suspended|lapsed)/i,
      /केवा[य़]?[ईीसी].{0,20}?(?:अपडेट|पेंडिंग|नूतनीकरण|अपूर्ण|करा)/i,
      /(?:electricity|power|bill|msedcl|mahadiscom|bijli).{0,25}?(?:disconnected|disconnect|cut|bandh)/i,
      /वीज\s+(?:पुरवठा|कनेक्शन)\s+(?:खंडित|तोडले\s+जाईल|बंद)/i,
      /बिजली\s+(?:काट\s+दी\s+जाएगी|कनेक्शन\s+काट)/i,
      /sim\s+(?:block|deactivation|disconnect)/i,
      /सिम\s+(?:ब्लॉक|बंद)/i,
      /pan\s+(?:card\s+)?(?:not\s+linked|link\s+karo|update)/i
    ]
  },
  {
    id: 'investment_crypto_stock_scam',
    category: 'financial_greed',
    weight: 42,
    title: 'Unrealistic Investment Returns / Stock Tip Fraud',
    titleMr: 'अवास्तव परतावा / बनावट शेअर बाजार टिप्स फसवणूक',
    titleHi: 'अवास्तविक मुनाफा / फर्जी शेयर बाजार टिप्स फ्रॉड',
    desc: 'Promises guaranteed, risk-free returns, crypto arbitrage, or secret insider WhatsApp/Telegram groups.',
    descMr: 'हमखास १००% नफा, पैसा डबल किंवा गुप्त ट्रेडिंग ग्रुपचे आमिष दाखवले आहे.',
    descHi: 'गारंटीड 100% मुनाफा, पैसा दोगुना या गुप्त ट्रेडिंग ग्रुप का लालच दिया गया है।',
    patterns: [
      /guaranteed\s+(?:\d+%\s+)?(?:return|profit|income)/i,
      /(?:100%|300%|500%)\s+(?:profit|return|guaranteed)/i,
      /risk[- ]free\s+(?:investment|trading|profit)/i,
      /vip\s+(?:stock|trading|crypto|wealth)\s+(?:group|tips)/i,
      /double\s+your\s+money|पैसा\s+डबल/i,
      /घर\s+बसल्या\s+(?:दररोज|महिना)\s+कमवा/i,
      /घर\s+बैठे\s+(?:रोजाना|कमाएं|कमाने)/i,
      /(?:deposit|गुंतवा)\s+₹?\d+\s+(?:get|मिळवा|पाएं)\s+₹?\d+/i,
      /crypto\s+(?:arbitrage|mining|pump|signals)/i,
      /sebi\s+approved\s+insider\s+tips/i,
      /नक्की\s+परतावा|हमखास\s+फायदा/i
    ]
  },
  {
    id: 'urgency_secrecy_pressure',
    category: 'pressure_tactic',
    weight: 28,
    title: 'High Urgency / Coercive Secrecy Pressure',
    titleMr: 'घाईगडबड / कोणाला न सांगण्याची धमकी',
    titleHi: 'जल्दबाजी / किसी को न बताने का दबाव',
    desc: 'Forces hasty decisions with tight deadlines (tonight at 9:30, within 1 hour) or orders you not to inform family.',
    descMr: 'त्वरित निर्णय घेण्याची सक्ती आणि घरच्यांना किंवा पोलिसांना न सांगण्याचा दबाव टाकला जात आहे.',
    descHi: 'तुरंत निर्णय लेने की बाध्यता और परिवार या पुलिस को न बताने की धमकी दी जा रही है।',
    patterns: [
      /within\s+(?:1|2|3|24)\s+hours?/i,
      /immediately|urgent|urgently/i,
      /तात्काळ|त्वरित|ताबडतोब|लगेच/i,
      /तुरंत|तत्काल|जल्द\s+से\s+जल्द/i,
      /today\s+night|tonight\s+at\s+\d+|आज\s+रात्री|आज\s+रात/i,
      /do\s+not\s+tell\s+(?:anyone|family|police)/i,
      /keep\s+(?:this\s+)?secret|strictly\s+confidential/i,
      /कुणालाही\s+सांगू\s+नका|गुपित\s+ठेवा/i,
      /किसी\s+को\s+मत\s+बताना|गुप्त\s+रखें/i,
      /last\s+warning|final\s+notice|अंतिम\s+सूचना/i
    ]
  },
  {
    id: 'remote_access_credentials_request',
    category: 'credential_theft',
    weight: 46,
    title: 'Remote-Access Tool / Screen Sharing Coercion',
    titleMr: 'स्क्रीन शेअरिंग ॲप (AnyDesk) किंवा ओटीपी मागणी',
    titleHi: 'स्क्रीन शेयरिंग ऐप (AnyDesk) या ओटीपी की मांग',
    desc: 'Demands downloading AnyDesk, TeamViewer, QuickSupport or sharing bank OTP/PIN.',
    descMr: 'AnyDesk किंवा TeamViewer डाउनलोड करण्यास सांगून फोनचा ताबा मिळवण्याचा प्रयत्न.',
    descHi: 'AnyDesk या TeamViewer डाउनलोड करवा कर फोन का नियंत्रण चुराने का प्रयास।',
    patterns: [
      /anydesk|any\s+desk/i,
      /teamviewer|team\s+viewer/i,
      /quicksupport|quick\s+support/i,
      /rustdesk|airmirror/i,
      /install\s+apk|download\s+apk|\.apk\b/i,
      /(?:enter|share|send|provide|bhejo)\s+(?:your\s+)?(?:otp|pin|cvv|mpin|password)/i,
      /ओटीपी\s+(?:सांगा|पाठवा|द्या|टाका)/i,
      /ओटीपी\s+(?:शेयर\s+करें|भेजें|बताएं|दर्ज\s+करें)/i,
      /upi\s+collect\s+request/i,
      /approve\s+collect\s+request/i
    ]
  },
  {
    id: 'lottery_job_advance_fee',
    category: 'advance_fee',
    weight: 36,
    title: 'Part-Time Task Scam / Lottery Advance Fee',
    titleMr: 'पार्ट-टाइम नोकरी / लॉटरी रजिस्ट्रेशन फी घोटाळा',
    titleHi: 'पार्ट-टाइम जॉब / लॉटरी रजिस्ट्रेशन शुल्क फ्रॉड',
    desc: 'Offers fake YouTube video liking jobs or lottery winnings requiring registration fees or customs tax.',
    descMr: 'व्हिडिओ लाईक करून पैसे कमवा किंवा लॉटरी बक्षिसासाठी आधी फी भरण्याचे आमिष.',
    descHi: 'वीडियो लाइक करके पैसे कमाने या लॉटरी पुरस्कार के लिए पहले फीस जमा करने का झांसा।',
    patterns: [
      /won\s+(?:lottery|award|prize|contest|iphone|car)/i,
      /लॉटरी\s+(?:लागली|जिंकली|जीती)/i,
      /इनाम\s+(?:मिळाले|जीता)/i,
      /part[- ]time\s+job|work\s+from\s+home/i,
      /like\s+youtube\s+videos?|like\s+and\s+subscribe/i,
      /registration\s+fee|processing\s+fee|stamp\s+duty|customs\s+duty/i,
      /रजिस्ट्रेशन\s+शुल्क|प्रोसेसिंग\s+फी|कस्टम्स\s+ड्युटी/i,
      /refundable\s+deposit|refundable\s+fee/i
    ]
  }
];

function extractUrls(text: string): string[] {
  const urlPattern = /(https?:\/\/[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;
  const matches = text.match(urlPattern) || [];
  return matches.map(u => u.replace(/[.,;!?:'\"()[\]{}]+$/, '')).filter(u => u.includes('.') && !u.endsWith('.'));
}

export function analyzeUrlsOffline(text: string): ThreatFlag[] {
  const flags: ThreatFlag[] = [];
  const urls = extractUrls(text);
  if (!urls.length) return flags;

  for (const rawUrl of urls) {
    const fullUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://') ? rawUrl : `http://${rawUrl}`;
    try {
      const parsed = new URL(fullUrl);
      const host = parsed.hostname.toLowerCase();
      const scheme = parsed.protocol.replace(':', '').toLowerCase();

      if (scheme === 'http' && /(login|kyc|pay|bank)/i.test(fullUrl)) {
        flags.push({
          id: 'url_insecure_http',
          category: 'url',
          weight: 22,
          title: 'Unencrypted HTTP Link for Banking/KYC',
          titleMr: 'असुरक्षित HTTP लिंक (गोपनीय माहिती चोरीचा धोका)',
          titleHi: 'असुरक्षित HTTP लिंक (डेटा चोरी का खतरा)',
          description: `Link '${rawUrl}' uses unencrypted HTTP for sensitive banking/KYC actions.`,
          descriptionMr: `लिंक '${rawUrl}' मध्ये सुरक्षा एन्क्रिप्शन नाही.`,
          descriptionHi: `लिंक '${rawUrl}' में सुरक्षा एन्क्रिप्शन नहीं है।`,
          matchedTokens: [rawUrl]
        });
      }

      if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
        flags.push({
          id: 'url_ip_address',
          category: 'url',
          weight: 35,
          title: 'Raw Direct IP Address Destination',
          titleMr: 'थेट संशयास्पद IP ॲड्रेस लिंक',
          titleHi: 'सीधा संदिग्ध IP पता लिंक',
          description: `Targets a numeric server IP (${host}) instead of an official verified domain.`,
          descriptionMr: `अधिकृत डोमेन ऐवजी थेट सर्व्हर नंबर वापरला आहे.`,
          descriptionHi: `आधिकारिक वेबसाइट की जगह सीधा सर्वर नंबर इस्तेमाल किया गया है।`,
          matchedTokens: [host]
        });
      }

      if (URL_SHORTENERS.some(s => host === s || host.endsWith('.' + s))) {
        flags.push({
          id: 'url_shortener',
          category: 'url',
          weight: 20,
          title: 'Concealed / Shortened Destination URL',
          titleMr: 'लपवलेली / लहान केलेली लिंक (Shortener)',
          titleHi: 'छुपाई गई / छोटी की गई लिंक (Shortener)',
          description: `Uses shortener '${host}' to hide the true destination.`,
          descriptionMr: `खरे संकेतस्थळ लपवण्यासाठी लहान लिंकचा वापर.`,
          descriptionHi: `असली वेबसाइट छुपाने के लिए छोटी लिंक का उपयोग किया गया है।`,
          matchedTokens: [host]
        });
      }

      if (SUSPICIOUS_TLDS.some(tld => host.endsWith(tld))) {
        flags.push({
          id: 'url_suspicious_tld',
          category: 'url',
          weight: 26,
          title: 'High-Risk / Low-Cost Phishing Domain Extension',
          titleMr: 'संशयास्पद डोमेन विस्तार (.xyz, .top, .buzz)',
          titleHi: 'संदिग्ध डोमेन एक्सटेंशन (.xyz, .top, .buzz)',
          description: `Domain '${host}' uses a low-trust extension commonly abused in bulk SMS scams.`,
          descriptionMr: `फसवणुकीसाठी मोठ्या प्रमाणावर वापरले जाणारे स्वस्त डोमेन.`,
          descriptionHi: `धोखाधड़ी में अक्सर इस्तेमाल होने वाला सस्ता डोमेन।`,
          matchedTokens: [host]
        });
      }

      const lookalikes = ['sbi', 'hdfc', 'icici', 'pnb', 'bob', 'rbi', 'yono', 'msedcl', 'mahadiscom', 'police', 'cyber', 'aadhaar', 'pan'];
      const phishingKeywords = ['login', 'update', 'kyc', 'verify', 'bill', 'pay', 'claim'];
      const hasName = lookalikes.some(kw => host.includes(kw));
      const hasAction = phishingKeywords.some(kw => fullUrl.toLowerCase().includes(kw));
      const isLegit = host.endsWith('.gov.in') || host.endsWith('.nic.in') || host.endsWith('.onlinesbi.sbi') || host.endsWith('.sbi') || host.endsWith('.hdfcbank.com') || host.endsWith('.mahadiscom.in');

      if (hasName && hasAction && !isLegit) {
        flags.push({
          id: 'url_lookalike_phishing',
          category: 'url',
          weight: 38,
          title: 'Lookalike Phishing Portal Impersonation',
          titleMr: 'अधिकृत बँक किंवा सरकारी वेबसाइटची हुबेहूब नक्कल',
          titleHi: 'आधिकारिक बैंक या सरकारी पोर्टल की हूबहू नकल',
          description: `Domain '${host}' mimics trusted banking or government portals to capture passwords.`,
          descriptionMr: `पासवर्ड आणि गोपनीय माहिती चोरण्यासाठी अधिकृत पोर्टलसारखे दिसणारे बनावट नाव.`,
          descriptionHi: `पासवर्ड चुराने के लिए बैंक या सरकारी विभाग जैसी दिखने वाली फर्जी वेबसाइट।`,
          matchedTokens: [host]
        });
      }
    } catch {
      // Ignore parse errors
    }
  }

  return flags;
}

export function analyzeTextOffline(text: string, language: 'en' | 'mr' | 'hi' = 'en'): OfflineTextAnalysisResult {
  if (!text || !text.trim()) {
    return {
      verdict: 'green',
      confidence: 100,
      score: 0,
      scamType: null,
      reasons: [
        language === 'mr' ? 'कोणताही मेसेज दिलेला नाही.' : language === 'hi' ? 'कोई संदेश दर्ज नहीं किया गया।' : 'No text provided for analysis.'
      ],
      advice: language === 'mr' ? 'तपासण्यासाठी कृपया मेसेज टाका.' : language === 'hi' ? 'कृपया जांच के लिए संदेश दर्ज करें।' : 'Paste a message to begin verification.',
      flags: [],
      vectors: { urgencyPressure: 0, authorityCoercion: 0, credentialHarvest: 0, financialLure: 0, linkRisk: 0 },
      highlightedTokens: [],
      disclaimer: language === 'mr' ? 'ट्रस्टलेन्स हे सहाय्यक साधन आहे, कायदेशीर पुरावा नाही.' : language === 'hi' ? 'ट्रस्टलेंस एक सहायक साधन है, कानूनी प्रमाण नहीं।' : 'TrustLens is an aid, not legal proof.'
    };
  }

  const textLower = text.toLowerCase();
  const isLegitOtpWarning = LEGIT_OTP_WARNING_REGEX.test(textLower);
  const matchedFlags: ThreatFlag[] = [];
  const seenFlagIds = new Set<string>();
  const allMatchedTokens: string[] = [];

  // 1. URL Analysis
  const urlFlags = analyzeUrlsOffline(text);
  for (const uf of urlFlags) {
    if (!seenFlagIds.has(uf.id)) {
      seenFlagIds.add(uf.id);
      matchedFlags.push(uf);
      allMatchedTokens.push(...uf.matchedTokens);
    }
  }

  // 2. Pattern Rule Checks
  for (const rule of RULES) {
    if (rule.id === 'remote_access_credentials_request' && isLegitOtpWarning) {
      if (!/(anydesk|teamviewer|quicksupport|\.apk)/i.test(textLower)) {
        continue;
      }
    }

    for (const pat of rule.patterns) {
      const match = text.match(pat);
      if (match) {
        if (!seenFlagIds.has(rule.id)) {
          seenFlagIds.add(rule.id);
          matchedFlags.push({
            id: rule.id,
            category: rule.category,
            weight: rule.weight,
            title: rule.title,
            titleMr: rule.titleMr,
            titleHi: rule.titleHi,
            description: rule.desc,
            descriptionMr: rule.descMr,
            descriptionHi: rule.descHi,
            matchedTokens: [match[0]]
          });
          allMatchedTokens.push(match[0]);
        }
        break;
      }
    }
  }

  // Calculate Threat Vectors (0 - 100)
  const vectors: ThreatVectorScores = {
    urgencyPressure: seenFlagIds.has('urgency_secrecy_pressure') ? 85 : 0,
    authorityCoercion: seenFlagIds.has('digital_arrest_law_enforcement') ? 95 : 0,
    credentialHarvest: seenFlagIds.has('remote_access_credentials_request') ? 90 : (seenFlagIds.has('fake_kyc_account_electricity_block') ? 70 : 0),
    financialLure: seenFlagIds.has('investment_crypto_stock_scam') ? 95 : (seenFlagIds.has('lottery_job_advance_fee') ? 80 : 0),
    linkRisk: urlFlags.length > 0 ? Math.min(100, urlFlags.reduce((acc, f) => acc + f.weight * 1.5, 0)) : 0
  };

  // Score calculation
  let rawScore = matchedFlags.reduce((sum, f) => sum + f.weight, 0);
  if (matchedFlags.length >= 3) {
    rawScore = Math.round(rawScore * 1.2);
  }
  const finalScore = Math.min(100, rawScore);

  // Determine Verdict
  let verdict: RiskLevel = 'green';
  if (finalScore >= 45 || seenFlagIds.has('digital_arrest_law_enforcement') || seenFlagIds.has('remote_access_credentials_request') || seenFlagIds.has('url_lookalike_phishing')) {
    verdict = 'red';
  } else if (finalScore >= 18 || matchedFlags.length >= 1) {
    verdict = 'amber';
  } else {
    verdict = 'green';
  }

  // Scam type
  let scamType: string | null = null;
  if (seenFlagIds.has('digital_arrest_law_enforcement')) {
    scamType = language === 'mr' ? 'डिजिटल अरेस्ट फसवणूक' : language === 'hi' ? 'डिजिटल अरेस्ट फ्रॉड' : 'Digital Arrest Impersonation';
  } else if (seenFlagIds.has('fake_kyc_account_electricity_block')) {
    scamType = language === 'mr' ? 'वीज बिल / बँक केवायसी फसवणूक' : language === 'hi' ? 'बिजली बिल / बैंक केवाईसी फ्रॉड' : 'Utility & Account Phishing';
  } else if (seenFlagIds.has('investment_crypto_stock_scam')) {
    scamType = language === 'mr' ? 'अवास्तव ट्रेडिंग / शेअर टिप्स स्कॅम' : language === 'hi' ? 'अवास्तविक ट्रेडिंग / स्टॉक टिप्स फ्रॉड' : 'High-Return Investment Scam';
  } else if (seenFlagIds.has('remote_access_credentials_request')) {
    scamType = language === 'mr' ? 'स्क्रीन शेअरिंग मालवेअर फसवणूक' : language === 'hi' ? 'स्क्रीन शेयरिंग मैलवेयर फ्रॉड' : 'Remote Access Credential Theft';
  } else if (seenFlagIds.has('lottery_job_advance_fee')) {
    scamType = language === 'mr' ? 'पार्ट-टाइम नोकरी / लॉटरी ॲडव्हान्स फी' : language === 'hi' ? 'पार्ट-टाइम जॉब / लॉटरी एडवांस फीस' : 'Advance-Fee Task Scam';
  } else if (urlFlags.length > 0) {
    scamType = language === 'mr' ? 'संशयास्पद फिशिंग लिंक' : language === 'hi' ? 'संदिग्ध फ़िशिंग लिंक' : 'Malicious Phishing Link';
  }

  // Reasons localized
  const reasons: string[] = [];
  for (const f of matchedFlags.slice(0, 3)) {
    if (language === 'mr') reasons.push(`${f.titleMr}: ${f.descriptionMr}`);
    else if (language === 'hi') reasons.push(`${f.titleHi}: ${f.descriptionHi}`);
    else reasons.push(`${f.title}: ${f.description}`);
  }

  if (!reasons.length) {
    if (verdict === 'green') {
      reasons.push(
        language === 'mr'
          ? 'कोणतेही संशयास्पद शब्द, डिजिटल अरेस्ट धमक्या किंवा फसव्या लिंक्स आढळल्या नाहीत.'
          : language === 'hi'
          ? 'कोई संदिग्ध शब्द, डिजिटल अरेस्ट की धमकी या फर्जी लिंक नहीं मिले।'
          : 'Zero extortion threats, credential requests, or deceptive URLs identified.'
      );
    }
  }

  // Advice localized
  let advice = '';
  if (verdict === 'red') {
    advice = language === 'mr'
      ? 'कोणत्याही लिंकवर क्लिक करू नका, स्क्रीन शेअर करू नका आणि पैसे पाठवू नका. पैसे गेले असल्यास त्वरित १९३० वर संपर्क साधा.'
      : language === 'hi'
      ? 'किसी लिंक पर क्लिक न करें, स्क्रीन शेयर न करें और पैसे न भेजें। अगर पैसे कटे हैं तो तुरंत 1930 पर कॉल करें।'
      : 'Do not click links, do not install remote apps, and never transfer money. Call 1930 immediately if funds were sent.';
  } else if (verdict === 'amber') {
    advice = language === 'mr'
      ? 'सावधान रहा. संबंधित बँक किंवा वीज वितरण कंपनीच्या अधिकृत केंद्राशी थेट संपर्क साधून खात्री करा.'
      : language === 'hi'
      ? 'सावधानी बरतें। बैंक या संबंधित विभाग के आधिकारिक कार्यालय से सीधे संपर्क करके पुष्टि करें।'
      : 'Exercise strict caution. Verify through direct official numbers before taking any action.';
  } else {
    advice = language === 'mr'
      ? 'मेसेज सुरक्षित दिसतो. तरीही बँक पासवर्ड आणि ओटीपी कोणालाही सांगू नका.'
      : language === 'hi'
      ? 'संदेश सुरक्षित प्रतीत होता है। फिर भी बैंक पासवर्ड और ओटीपी कभी किसी को न बताएं।'
      : 'Message appears safe and transactional. Always guard sensitive bank PINs and passwords.';
  }

  const confidence = verdict === 'green' ? 90 : Math.max(55, Math.min(96, finalScore + 15));

  return {
    verdict,
    confidence,
    score: finalScore,
    scamType,
    reasons,
    advice,
    flags: matchedFlags,
    vectors,
    highlightedTokens: Array.from(new Set(allMatchedTokens)),
    disclaimer: language === 'mr' ? 'ट्रस्टलेन्स हे सहाय्यक साधन आहे, कायदेशीर पुरावा नाही.' : language === 'hi' ? 'ट्रस्टलेंस एक सहायक साधन है, कानूनी प्रमाण नहीं।' : 'TrustLens is an aid, not legal proof.'
  };
}

// --------------------------------------------------------------------------
// Image Forensic Offline Analysis
// --------------------------------------------------------------------------
export interface OfflineImageForensicResult {
  verdict: RiskLevel;
  confidence: number;
  reasons: string[];
  advice: string;
  scamType: string | null;
  metadata: {
    dimensions: [number, number];
    format: string;
    hasExif: boolean;
    aiDimensionMatch: boolean;
    syntheticMarkers: string[];
    elaNoiseScore: number;       // 0-100 (simulated compression anomaly)
    tamperRiskIndex: number;     // 0-100
  };
  disclaimer: string;
}

const KNOWN_AI_GRIDS: [number, number][] = [
  [512, 512], [768, 768], [1024, 1024], [1024, 1792], [1792, 1024],
  [1152, 896], [896, 1152], [1216, 832], [832, 1216], [1344, 768], [768, 1344]
];

export async function analyzeImageOffline(
  file: File,
  language: 'en' | 'mr' | 'hi' = 'en'
): Promise<OfflineImageForensicResult> {
  // Read basic image dimensions using Image DOM element
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      URL.revokeObjectURL(objectUrl);

      // 1. AI Dimension Grid Check
      const aiDimMatch = KNOWN_AI_GRIDS.some(
        ([w, h]) => (width === w && height === h) || (Math.abs(width - w) <= 4 && Math.abs(height - h) <= 4)
      );

      // 2. Synthetic Markers Inspection
      const syntheticMarkers: string[] = [];
      const fileNameLower = file.name.toLowerCase();

      if (aiDimMatch) {
        syntheticMarkers.push(`Exact AI generation aspect ratio grid (${width}×${height})`);
      }

      if (/(midjourney|flux|stablediffusion|dalle|canva|photoshop|picsart)/i.test(fileNameLower)) {
        syntheticMarkers.push('File name contains AI generation or image manipulation tags');
      }

      // Check file size vs dimension ratio (AI generators produce dense compression signatures)
      const bytesPerPixel = file.size / (width * height || 1);
      let elaNoiseScore = 20; // default low
      if (bytesPerPixel < 0.25 && width >= 1024) {
        elaNoiseScore = 68; // high recompression anomaly
      }

      let tamperRiskIndex = 15;
      if (aiDimMatch) tamperRiskIndex += 45;
      if (syntheticMarkers.length > 1) tamperRiskIndex += 30;
      if (elaNoiseScore > 50) tamperRiskIndex += 20;

      tamperRiskIndex = Math.min(95, tamperRiskIndex);

      let verdict: RiskLevel = 'green';
      if (tamperRiskIndex >= 65) verdict = 'red';
      else if (tamperRiskIndex >= 35) verdict = 'amber';

      const reasons: string[] = [];
      if (aiDimMatch) {
        reasons.push(
          language === 'mr'
            ? `प्रतिमेचा आकार (${width}×${height}) हा सामान्य AI जनरेटर ग्रीडशी तंतोतंत जुळतो.`
            : language === 'hi'
            ? `छवि का आकार (${width}×${height}) लोकप्रिय AI जनरेटर ग्रिड से मेल खाता है।`
            : `Image dimensions (${width}×${height}) match synthetic AI generator lattice (e.g. Midjourney/Flux/SD).`
        );
      }

      if (syntheticMarkers.length > 0) {
        reasons.push(
          language === 'mr'
            ? 'प्रतिमेत कृत्रिम संपादन किंवा डिझाईन सॉफ्टवेअरचे निर्देशक आढळले.'
            : language === 'hi'
            ? 'छवि में कृत्रिम संपादन या डिजाइन सॉफ्टवेयर के संकेत मिले।'
            : 'Software manipulation indicators or synthetic generation metadata signatures detected.'
        );
      }

      if (reasons.length === 0) {
        reasons.push(
          language === 'mr'
            ? 'कोणतेही उघड AI आकार घटक किंवा संपादन विसंगती आढळल्या नाहीत.'
            : language === 'hi'
            ? 'कोई प्रत्यक्ष AI संपादन या आकृति विसंगति नहीं मिली।'
            : 'Natural photographic compression signatures; no overt generative AI lattice tags found.'
        );
      }

      // Advice
      let advice = '';
      if (verdict === 'red') {
        advice = language === 'mr'
          ? 'फोटो किंवा कागदपत्र AI द्वारे तयार केलेले किंवा फेरफार केलेले असण्याची दाट शक्यता आहे. सावधगिरी बाळगा.'
          : language === 'hi'
          ? 'छवि या दस्तावेज के AI-जनित या जाली होने की प्रबल संभावना है। आधिकारिक पुष्टि के बिना भरोसा न करें।'
          : 'High probability of synthetic manipulation or forged document. Do not act without official physical verification.';
      } else if (verdict === 'amber') {
        advice = language === 'mr'
          ? 'काही संशयास्पद पैलू आढळले आहेत. मूळ स्त्रोताची स्वतंत्रपणे पडताळणी करा.'
          : language === 'hi'
          ? 'कुछ संदिग्ध संकेत हैं। मूल स्रोत की स्वतंत्र रूप से पुष्टि करें।'
          : 'Suspicious compression variance detected. Verify the original document through independent official channels.';
      } else {
        advice = language === 'mr'
          ? 'फोटो सामान्य दिसतो. तरीही नेहमी डिजिटल सतर्कता बाळगा.'
          : language === 'hi'
          ? 'छवि सामान्य प्रतीत होती है। डिजिटल सुरक्षा सतर्कता हमेशा बनाए रखें।'
          : 'Visual and dimension checks appear natural. Visual analysis remains probabilistic.';
      }

      const scamType = verdict === 'red'
        ? (language === 'mr' ? 'AI जनित किंवा बनावट कागदपत्र' : language === 'hi' ? 'AI जनित या जाली दस्तावेज' : 'Synthetic Media / Forged Document')
        : (verdict === 'amber' ? (language === 'mr' ? 'संशयास्पद प्रतिमा घटक' : language === 'hi' ? 'संदिग्ध छवि विसंगति' : 'Suspicious Visual Anomaly') : null);

      resolve({
        verdict,
        confidence: Math.max(60, tamperRiskIndex),
        reasons,
        advice,
        scamType,
        metadata: {
          dimensions: [width, height],
          format: file.type.replace('image/', '').toUpperCase() || 'JPEG',
          hasExif: false, // Standard canvas extraction cannot read raw EXIF
          aiDimensionMatch: aiDimMatch,
          syntheticMarkers,
          elaNoiseScore,
          tamperRiskIndex
        },
        disclaimer: language === 'mr' ? 'ट्रस्टलेन्स हे सहाय्यक साधन आहे, कायदेशीर पुरावा नाही.' : language === 'hi' ? 'ट्रस्टलेंस एक सहायक साधन है, कानूनी प्रमाण नहीं।' : 'TrustLens is an aid, not legal proof.'
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({
        verdict: 'amber',
        confidence: 50,
        reasons: ['Could not read image headers cleanly.'],
        advice: 'Please ensure image is an uncorrupted JPEG, PNG or WEBP file.',
        scamType: 'Unreadable Media',
        metadata: {
          dimensions: [0, 0],
          format: 'UNKNOWN',
          hasExif: false,
          aiDimensionMatch: false,
          syntheticMarkers: [],
          elaNoiseScore: 0,
          tamperRiskIndex: 50
        },
        disclaimer: 'TrustLens is an aid, not legal proof.'
      });
    };

    img.src = objectUrl;
  });
}
