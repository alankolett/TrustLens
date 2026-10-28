import React, { useState, useEffect } from 'react';
import { Clipboard, X, Search, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Language, I18N } from '../i18n';
import { API_BASE_URL } from '../config';
import { VerdictCard, VerdictData } from './VerdictCard';
import { SafetyReport } from './SafetyReport';

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

  // Fetch benchmark demo samples on load
  useEffect(() => {
    fetch(`${API_BASE_URL}/samples`)
      .then((res) => {
        if (!res.ok) throw new Error('Samples unavailable');
        return res.json();
      })
      .then((data) => setSamples(data))
      .catch((err) => {
        console.warn('Could not load samples from backend:', err);
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
      setError('Clipboard access was blocked by browser. Please paste manually into the box.');
    }
  };

  const handleClear = () => {
    setText('');
    setVerdictData(null);
    setError(null);
  };

  const handleSelectSample = (sample: DemoSample) => {
    setText(sample.text);
    setVerdictData(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError(t.errorEmptyText);
      return;
    }

    setLoading(true);
    setError(null);
    setVerdictData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/check-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          language: currentLang
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.detail || t.errorGeneric);
      }

      const data: VerdictData = await response.json();
      setVerdictData(data);
    } catch (err: any) {
      console.error('Check text error:', err);
      setError(err.message || t.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-2">
          <label htmlFor="scam-text-input" className="text-sm sm:text-base font-bold text-slate-900">
            {t.textInputLabel}
          </label>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePaste}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              title="Paste clipboard"
            >
              <Clipboard className="w-3.5 h-3.5" />
              <span>{t.btnPaste}</span>
            </button>
            {text && (
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
          className="w-full p-3.5 sm:p-4 text-sm sm:text-base border-2 border-slate-200 rounded-xl focus:border-navy-900 focus:ring-0 focus:outline-hidden transition-all text-slate-900 placeholder:text-slate-400 font-medium resize-y"
        />

        {/* Action Button */}
        <div className="mt-4">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] ${
              loading
                ? 'bg-slate-400 text-white cursor-not-allowed'
                : 'bg-navy-900 hover:bg-navy-800 text-white'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t.btnChecking}</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>{t.btnCheckText}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Friendly Error Notice */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-red-800 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
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

      {/* One-Click Benchmark Demo Samples for Jury */}
      {samples.length > 0 && (
        <div className="bg-slate-100/80 rounded-2xl p-4 sm:p-5 border border-slate-200">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles className="w-4 h-4 text-saffron-500" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
              {t.samplesHeading}
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            {t.samplesHelp}
          </p>

          <div className="flex flex-wrap gap-2">
            {samples.map((s) => {
              const isSafe = s.category === 'safe';
              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectSample(s)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl border text-left transition-all active:scale-95 ${
                    isSafe
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-400'
                  }`}
                >
                  <span className="mr-1">{isSafe ? '✅' : '🚨'}</span>
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
