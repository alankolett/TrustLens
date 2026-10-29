import React, { useState, useEffect } from 'react';
import { Clipboard, X, Search, Sparkles, Loader2, AlertCircle, ShieldAlert, Cpu } from 'lucide-react';
import { Language, I18N } from '../i18n';
import { VerdictCard, VerdictData } from './VerdictCard';
import { SafetyReport } from './SafetyReport';
import { analyzeTextOffline, OfflineTextAnalysisResult } from '../lib/offlineForensics';

interface DemoSample {
  id: string;
  title: string;
  category: string;
  language: string;
  text: string;
}

interface TextCheckProps {
  currentLang: Language;
}

export const TextCheck: React.FC<TextCheckProps> = ({ currentLang }) => {
  const t = I18N[currentLang];
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verdictData, setVerdictData] = useState<VerdictData | null>(null);
  const [samples, setSamples] = useState<DemoSample[]>([]);

  // Fetch benchmark demo samples or fallback to offline samples
  useEffect(() => {
    fetch('/samples')
      .then((res) => {
        if (!res.ok) throw new Error('Samples unavailable');
        return res.json();
      })
      .then((data) => setSamples(data))
      .catch(() => {
        // Fallback pre-loaded offline samples
        setSamples([
          {
            id: 'digital_arrest_en',
            title: 'CBI Digital Arrest Warrant (English)',
            category: 'scam',
            language: 'en',
            text: 'URGENT NOTICE FROM CENTRAL BUREAU OF INVESTIGATION (CBI) & MUMBAI POLICE CYBER CELL. A courier parcel containing fake passports and narcotics was intercepted at Mumbai Airport registered under your Aadhaar. You are placed under 24-HOUR DIGITAL ARREST. Report on Skype immediately or non-bailable arrest warrant will be issued within 1 hour.'
          },
          {
            id: 'fake_mseb_bill_mr',
            title: 'MSEDCL Power Cutoff Tonight (Marathi)',
            category: 'scam',
            language: 'mr',
            text: 'प्रिय ग्राहक, महावितरण वीज बिल थकबाकीमुळे आज रात्री ९:३० वाजता तुमचे वीज कनेक्शन तोडले जाईल. तात्काळ खंडन टाळण्यासाठी आमचे अधिकारी 9823412345 वर त्वरित संपर्क साधा किंवा येथे अपडेट करा: http://msedcl-bill-pay.xyz/update'
          },
          {
            id: 'fake_kyc_hi',
            title: 'SBI Yono Account Block Notice (Hindi)',
            category: 'scam',
            language: 'hi',
            text: 'प्रिय एसबीआई ग्राहक, आपका बैंक खाता आज रात 12 बजे ब्लॉक कर दिया जाएगा क्योंकि पैन और आधार केवाईसी लंबित है। तुरंत अपना खाता सक्रिय करने के लिए इस लिंक पर क्लिक करें: http://sbi-kyc-update.top/login'
          },
          {
            id: 'high_return_vip_en',
            title: 'Guaranteed 300% Stock Profit (English)',
            category: 'scam',
            language: 'en',
            text: 'EXCLUSIVE VIP STOCK TRADING: Guaranteed 300% returns in 7 days with SEBI approved insider institutional tips. 100% risk free profit sharing. Deposit Rs 10,000 and get Rs 40,000 guaranteed tomorrow. Join WhatsApp now: https://bit.ly/vip-wealth-pump'
          },
          {
            id: 'remote_access_mr',
            title: 'PM Kisan Subsidy / AnyDesk (Marathi)',
            category: 'scam',
            language: 'mr',
            text: 'महाराष्ट्र शासन कृषी विभाग: तुमच्या खात्यात पीएम किसान अनुदानाचे ₹६,००० अडकले आहेत. तांत्रिक पडताळणीसाठी त्वरित AnyDesk ॲप डाउनलोड करा आणि ९ आकडी कोड आमच्या अधिकाऱ्याला सांगा.'
          },
          {
            id: 'legit_bank_otp_en',
            title: 'Authentic Bank OTP SMS (English - Safe)',
            category: 'safe',
            language: 'en',
            text: '749201 is your OTP for purchase of Rs. 1,450.00 at DMART on HDFC Bank Card ending 8219. Valid for 5 mins. NEVER share OTP with anyone, including bank staff. Bank never calls asking for OTP or password.'
          },
          {
            id: 'harmless_family_mr',
            title: 'Family WhatsApp Message (Marathi - Safe)',
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
      setError('Clipboard access blocked by browser. Please paste manually into the text box.');
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
    // Instant offline analysis on sample click
    triggerAnalysis(sample.text);
  };

  const triggerAnalysis = (inputText: string) => {
    if (!inputText.trim()) {
      setError(t.errorEmptyText);
      return;
    }

    setLoading(true);
    setError(null);

    // 100% Offline Forensic Execution
    setTimeout(() => {
      try {
        const offlineResult: OfflineTextAnalysisResult = analyzeTextOffline(inputText, currentLang);
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
          analysis_mode: 'offline_forensics'
        });
      } catch (err: any) {
        setError(err.message || t.errorGeneric);
      } finally {
        setLoading(false);
      }
    }, 150); // slight delay for smooth visual feedback
  };

  return (
    <div className="space-y-6">
      {/* Input Deck */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 mb-3">
          <label htmlFor="scam-text-input" className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-orange-400" />
            <span>{t.textInputLabel}</span>
          </label>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePaste}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl transition-all border border-slate-700/80 shadow-xs active:scale-95"
              title="Paste clipboard"
            >
              <Clipboard className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.btnPaste}</span>
            </button>
            {text && (
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition-all border border-slate-800"
                title="Clear text"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t.btnClear}</span>
              </button>
            )}
          </div>
        </div>

        <textarea
          id="scam-text-input"
          rows={4}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError(null);
          }}
          placeholder={t.textPlaceholder}
          className="w-full p-4 text-sm sm:text-base bg-slate-950 border border-slate-800 rounded-2xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-hidden transition-all text-slate-100 placeholder:text-slate-500 font-medium resize-y"
        />

        {/* Action Button */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Multi-Lingual Offline Rule Engine (Zero Cloud Key Needed)</span>
          </div>

          <button
            onClick={() => triggerAnalysis(text)}
            disabled={loading}
            className={`w-full sm:w-auto py-3 px-7 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl active:scale-95 ${
              loading
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                : 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white shadow-orange-500/20'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.btnChecking}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>{t.btnCheckText}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Friendly Error Notice */}
      {error && (
        <div className="rounded-2xl bg-red-950/40 border border-red-500/50 p-4 flex items-start gap-3 text-red-200 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
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

      {/* 1-Click Interactive Benchmark Samples for Jury Demo */}
      {samples.length > 0 && (
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-200">
              {t.samplesHeading}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-4 font-medium">
            {t.samplesHelp}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {samples.map((s) => {
              const isSafe = s.category === 'safe';
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectSample(s)}
                  className={`text-xs font-bold px-3.5 py-2.5 rounded-xl border text-left transition-all active:scale-95 flex items-center gap-2 shadow-sm ${
                    isSafe
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200 hover:bg-emerald-900/50 hover:border-emerald-400'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-orange-500/50 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{isSafe ? '✅' : '🚨'}</span>
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
