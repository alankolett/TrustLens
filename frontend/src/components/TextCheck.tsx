import React, { useState, useEffect } from 'react';
import { Clipboard, X, Search, Loader2, AlertCircle, Shield } from 'lucide-react';
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
}

export const TextCheck: React.FC<TextCheckProps> = ({ currentLang }) => {
  const t = I18N[currentLang];
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verdictData, setVerdictData] = useState<VerdictData | null>(null);
  const [samples, setSamples] = useState<DemoSample[]>([]);

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

  return (
    <div className="space-y-6">
      {/* Input Deck */}
      <div className="rounded-2xl premium-card p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <label htmlFor="scam-text-input" className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-400" />
            <span>{t.textInputLabel}</span>
          </label>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePaste}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-700/80 rounded-md transition-colors border border-white/[0.08]"
              title="Paste clipboard"
            >
              <Clipboard className="w-3.5 h-3.5 text-zinc-400" />
              <span>{t.btnPaste}</span>
            </button>
            {text && (
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 rounded-md transition-colors"
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
          className="w-full p-3.5 text-sm sm:text-base premium-input-well rounded-xl focus:border-zinc-500 focus:outline-hidden transition-colors text-zinc-100 placeholder:text-zinc-500 resize-y font-normal"
        />

        {/* Footer actions */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{t.offlineModeNotice}</span>
          </div>

          <button
            onClick={() => triggerAnalysis(text)}
            disabled={loading}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-all ${
              loading
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs active:scale-[0.98]'
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
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3.5 flex items-start gap-2.5 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Verdict & Safety Report */}
      {verdictData && (
        <div className="space-y-5 animate-fadeIn">
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

      {/* Benchmark Samples */}
      {samples.length > 0 && (
        <div className="rounded-2xl premium-card p-5 sm:p-6">
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
