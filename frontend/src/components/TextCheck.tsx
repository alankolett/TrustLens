import React, { useState, useEffect } from 'react';
import { Clipboard, X, Search, Loader2, AlertCircle, Shield, ShieldAlert, Zap, Landmark, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Language, I18N } from '../i18n';
import { VerdictCard, VerdictData } from './VerdictCard';
import { SafetyReport } from './SafetyReport';
import { analyzeTextOffline } from '../lib/offlineForensics';

interface DemoSample {
  id: string;
  title: string;
  category: string;
  language: string;
  text: string;
}

interface TextCheckProps {
  currentLang: Language;
  onTabNavigate?: (tab: 'image' | 'voice' | 'video') => void;
}

export const TextCheck: React.FC<TextCheckProps> = ({ currentLang, onTabNavigate }) => {
  const t = I18N[currentLang];
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verdictData, setVerdictData] = useState<VerdictData | null>(null);
  const [samples, setSamples] = useState<DemoSample[]>([]);

  const heroContent = {
    en: {
      headline: "Verify suspicious messages before you trust.",
      subtitle: "Instant offline verification for Digital Arrest threats, fake MSEDCL power cut notices, bank KYC locks, and social engineering scams. 100% private, on-device analysis.",
      badge: "Seva First Innovation 2026 • 100% On-Device Shield",
      categories: [
        { id: 'digital_arrest_en', title: "Digital Arrest", subtitle: "Fake CBI / Police video notices", icon: ShieldAlert, color: "text-red-400" },
        { id: 'fake_mseb_bill_mr', title: "MSEDCL Power Cut", subtitle: "Fake electricity cutoff SMS", icon: Zap, color: "text-amber-400" },
        { id: 'fake_kyc_hi', title: "Bank KYC Block", subtitle: "SBI / HDFC account freeze threats", icon: Landmark, color: "text-blue-400" },
        { id: 'high_return_vip_en', title: "Stock Tip Frauds", subtitle: "Guaranteed 300% profit groups", icon: TrendingUp, color: "text-purple-400" }
      ]
    },
    mr: {
      headline: "मेसेज व सरकारी नोटिसांची एका सेकंदात पडताळणी करा.",
      subtitle: "डिजिटल अरेस्ट, महावितरण वीज बिल तोडण्याच्या धमक्या, बनावट बँक केवायसी आणि सायबर फसवणुकीची झटपट तपासणी. पूर्णपणे सुरक्षित आणि गोपनीय.",
      badge: "सेवा फर्स्ट २०२६ • १००% डिव्हाइसवर ऑफलाइन तपासणी",
      categories: [
        { id: 'digital_arrest_en', title: "डिजिटल अरेस्ट", subtitle: "खोट्या सीबीआय व पोलीस नोटिसा", icon: ShieldAlert, color: "text-red-400" },
        { id: 'fake_mseb_bill_mr', title: "महावितरण वीज बिल", subtitle: "वीज कापण्याचे बनावट मेसेज", icon: Zap, color: "text-amber-400" },
        { id: 'fake_kyc_hi', title: "बँक केवायसी ब्लॉक", subtitle: "खाते बंद करण्याचे धमकावणारे मेसेज", icon: Landmark, color: "text-blue-400" },
        { id: 'high_return_vip_en', title: "शेअर मार्केट आमिष", subtitle: "पैसे दुप्पट करण्याचे खोटे ग्रुप्स", icon: TrendingUp, color: "text-purple-400" }
      ]
    },
    hi: {
      headline: "संदेश और सरकारी नोटिसों की तुरंत सटीक जांच करें।",
      subtitle: "डिजिटल अरेस्ट, बिजली बिल कनेक्शन काटने की धमकी, बैंक केवाईसी ब्लॉक और साइबर फ्रॉड की तत्काल जांच। पूरी तरह सुरक्षित व निजी।",
      badge: "सेवा फर्स्ट 2026 • 100% ऑन-डिवाइस ऑफलाइन शील्ड",
      categories: [
        { id: 'digital_arrest_en', title: "डिजिटल अरेस्ट", subtitle: "फर्जी सीबीआई व पुलिस नोटिस", icon: ShieldAlert, color: "text-red-400" },
        { id: 'fake_mseb_bill_mr', title: "बिजली बिल फ्रॉड", subtitle: "बिजली काटने के फर्जी एसएमएस", icon: Zap, color: "text-amber-400" },
        { id: 'fake_kyc_hi', title: "बैंक केवाईसी फ्रॉड", subtitle: "अकाउंट ब्लॉक करने की धमकी", icon: Landmark, color: "text-blue-400" },
        { id: 'high_return_vip_en', title: "शेयर बाजार फ्रॉड", subtitle: "गारंटीड मुनाफे का झांसा", icon: TrendingUp, color: "text-purple-400" }
      ]
    }
  }[currentLang];

  useEffect(() => {
    fetch('/samples')
      .then((res) => {
        if (!res.ok) throw new Error('Samples unavailable');
        return res.json();
      })
      .then((data) => setSamples(data))
      .catch(() => {
        setSamples([
          {
            id: 'digital_arrest_en',
            title: 'CBI Digital Arrest Threat',
            category: 'scam',
            language: 'en',
            text: 'URGENT NOTICE FROM CENTRAL BUREAU OF INVESTIGATION (CBI) & MUMBAI POLICE CYBER CELL. A courier parcel containing fake passports and narcotics was intercepted at Mumbai Airport registered under your Aadhaar. You are placed under 24-HOUR DIGITAL ARREST. Report on Skype immediately or non-bailable arrest warrant will be issued within 1 hour.'
          },
          {
            id: 'fake_mseb_bill_mr',
            title: 'MSEDCL Power Disconnect Notice (मराठी)',
            category: 'scam',
            language: 'mr',
            text: 'प्रिय ग्राहक, महावितरण वीज बिल थकबाकीमुळे आज रात्री ९:३० वाजता तुमचे वीज कनेक्शन तोडले जाईल. तात्काळ खंडन टाळण्यासाठी आमचे अधिकारी 9823412345 वर त्वरित संपर्क साधा किंवा येथे अपडेट करा: http://msedcl-bill-pay.xyz/update'
          },
          {
            id: 'fake_kyc_hi',
            title: 'SBI Yono Account Block Threat (हिंदी)',
            category: 'scam',
            language: 'hi',
            text: 'प्रिय एसबीआई ग्राहक, आपका बैंक खाता आज रात 12 बजे ब्लॉक कर दिया जाएगा क्योंकि पैन और आधार केवाईसी लंबित है। तुरंत अपना खाता सक्रिय करने के लिए इस लिंक पर क्लिक करें: http://sbi-kyc-update.top/login'
          },
          {
            id: 'high_return_vip_en',
            title: 'Guaranteed 300% Stock Profit',
            category: 'scam',
            language: 'en',
            text: 'EXCLUSIVE VIP STOCK TRADING: Guaranteed 300% returns in 7 days with SEBI approved insider institutional tips. 100% risk free profit sharing. Deposit Rs 10,000 and get Rs 40,000 guaranteed tomorrow. Join WhatsApp now: https://bit.ly/vip-wealth-pump'
          },
          {
            id: 'remote_access_mr',
            title: 'PM Kisan Subsidy / AnyDesk (मराठी)',
            category: 'scam',
            language: 'mr',
            text: 'महाराष्ट्र शासन कृषी विभाग: तुमच्या खात्यात पीएम किसान अनुदानाचे ₹६,००० अडकले आहेत. तांत्रिक पडताळणीसाठी त्वरित AnyDesk ॲप डाउनलोड करा आणि ९ आकडी कोड आमच्या अधिकाऱ्याला सांगा.'
          },
          {
            id: 'legit_bank_otp_en',
            title: 'Authentic Bank OTP SMS (Safe)',
            category: 'safe',
            language: 'en',
            text: '749201 is your OTP for purchase of Rs. 1,450.00 at DMART on HDFC Bank Card ending 8219. Valid for 5 mins. NEVER share OTP with anyone, including bank staff. Bank never calls asking for OTP or password.'
          },
          {
            id: 'harmless_family_mr',
            title: 'Family WhatsApp Message (Safe)',
            category: 'safe',
            language: 'mr',
            text: 'आई, मी संध्याकाळी ७:३० पर्यंत घरी येईन. येताना दुकानातून कोथिंबीर आणि दूध घेऊन येतो. बाबांचे औषध आणायचे आहे का ते सांगा.'
          }
        ]);
      });
  }, []);

  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setText(clipText);
        setError(null);
      }
    } catch {
      setError('Please paste manually into the text box.');
    }
  };

  const handleClear = () => {
    setText('');
    setVerdictData(null);
    setError(null);
  };

  const handleSelectSample = (sample: DemoSample) => {
    setText(sample.text);
    setError(null);
    triggerAnalysis(sample.text);
  };

  const handleSelectCategory = (categoryId: string) => {
    const match = samples.find(s => s.id === categoryId);
    if (match) {
      handleSelectSample(match);
    }
  };

  const triggerAnalysis = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) {
      setError(t.errorEmptyText);
      return;
    }

    setLoading(true);
    setError(null);

    // Instant local offline evaluation
    setTimeout(() => {
      try {
        const offlineResult = analyzeTextOffline(trimmed, currentLang);
        setVerdictData({
          verdict: offlineResult.verdict,
          confidence: offlineResult.confidence,
          score: offlineResult.score,
          reasons: offlineResult.reasons,
          advice: offlineResult.advice,
          scam_type: offlineResult.scamType,
          flags: offlineResult.flags,
          vectors: offlineResult.vectors,
          highlightedTokens: offlineResult.highlightedTokens,
          disclaimer: offlineResult.disclaimer,
          analysis_mode: 'offline'
        });
      } catch (err: any) {
        setError(err.message || t.errorGeneric);
      } finally {
        setLoading(false);
      }
    }, 120);
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-8">
      {/* Hero Presentation */}
      <div className="text-center max-w-3xl mx-auto pt-2 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>{heroContent.badge}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          {heroContent.headline}
        </h1>

        <p className="text-xs sm:text-base text-zinc-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          {heroContent.subtitle}
        </p>

        {/* Quick Threat Vector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6 text-left">
          {heroContent.categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="glass-card-interactive p-3 sm:p-3.5 rounded-xl flex flex-col justify-between group text-left"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-1.5 rounded-lg bg-zinc-900 border border-white/[0.06] ${cat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                    {cat.title}
                  </div>
                  <div className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">
                    {cat.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Omni-Scanner Card */}
      <div className="rounded-2xl glass-panel p-5 sm:p-7 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <label htmlFor="scam-text-input" className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400" />
            <span>{t.textInputLabel}</span>
          </label>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePaste}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/90 hover:bg-zinc-700 rounded-md transition-colors border border-white/[0.08]"
              title="Paste from clipboard"
            >
              <Clipboard className="w-3.5 h-3.5 text-zinc-400" />
              <span>{t.btnPaste}</span>
            </button>
            {text && (
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors"
                title="Clear input"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.btnClear}</span>
              </button>
            )}
          </div>
        </div>

        {/* Input Textarea Well */}
        <div className="relative rounded-xl glass-well">
          <textarea
            id="scam-text-input"
            rows={4}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                triggerAnalysis(text);
              }
            }}
            placeholder={t.textPlaceholder}
            className="w-full p-4 text-sm sm:text-base bg-transparent focus:outline-hidden transition-colors text-zinc-100 placeholder:text-zinc-500 resize-y font-normal leading-relaxed"
          />

          {/* Character counter */}
          <div className="px-4 py-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>{charCount} characters • {wordCount} words</span>
            <span className="hidden sm:inline text-zinc-500">Press Ctrl+Enter to scan</span>
          </div>
        </div>

        {/* Bottom bar & action button */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <div className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>On-Device Verification • Zero Data Persistence</span>
          </div>

          <button
            onClick={() => triggerAnalysis(text)}
            disabled={loading}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
              loading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/[0.06]'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20 active:scale-[0.98]'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                <span>{t.btnChecking}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 stroke-[2.2]" />
                <span>{t.btnCheckText}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3.5 flex items-start gap-2.5 text-red-300 text-sm animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Live Verdict & Safety Actions */}
      {verdictData && (
        <div className="space-y-6 animate-fadeIn">
          <VerdictCard verdictData={verdictData} currentLang={currentLang} />
          {(verdictData.verdict === 'red' || verdictData.verdict === 'amber') && (
            <SafetyReport
              verdictData={verdictData}
              originalText={text}
              currentLang={currentLang}
            />
          )}
        </div>
      )}

      {/* All Benchmark Samples */}
      {samples.length > 0 && (
        <div className="rounded-2xl glass-panel p-5 sm:p-6">
          <div className="mb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {t.samplesHeading}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {t.samplesHelp}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {samples.map((s) => {
              const isSafe = s.category === 'safe';
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectSample(s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-white/[0.08] bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center gap-2"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSafe ? 'bg-emerald-400' : 'bg-red-400'}`} />
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
