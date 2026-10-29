import React, { useState } from 'react';
import { PhoneCall, ExternalLink, Copy, Check, ShieldAlert, KeyRound, AlertOctagon, FileText } from 'lucide-react';
import { Language, I18N } from '../i18n';
import { VerdictData } from './VerdictCard';

interface SafetyReportProps {
  verdictData: VerdictData;
  originalText?: string;
  currentLang: Language;
}

export const SafetyReport: React.FC<SafetyReportProps> = ({
  verdictData,
  originalText,
  currentLang
}) => {
  const t = I18N[currentLang];
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const generateComplaintSummary = (): string => {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const flagsList = (verdictData.flags || []).map((f: any) => `• ${f.title || f.title_en || f}`).join('\n');
    const excerpt = originalText ? (originalText.length > 300 ? originalText.substring(0, 300) + '...' : originalText) : 'N/A';

    return `=== TRUSTLENS CYBER INCIDENT FORENSIC RECORD ===
[EVIDENTIARY DECLARATION UNDER BSA 2023 SEC 63 / IEA 1872 SEC 65B]

Incident Timestamp: ${timestamp} IST
Assessed Risk Level: ${verdictData.verdict.toUpperCase()} (${verdictData.confidence}% Confidence Index)
Identified Scam Class: ${verdictData.scam_type || 'Social Engineering / Digital Fraud'}

SUSPICIOUS EVIDENCE PAYLOAD:
"${excerpt}"

DETECTED HEURISTIC THREAT INDICATORS:
${flagsList || '• Multi-vector algorithmic threat patterns detected'}

IMMEDIATE CITIZEN SAFETY DIRECTIVES:
1. NEVER share OTP, MPIN, UPI PIN, or net-banking passwords with any caller.
2. NEVER install remote administration software (AnyDesk, TeamViewer, QuickSupport, RustDesk).
3. In case of financial debit, report within the 1-hour golden window at Helpline 1930 or https://cybercrime.gov.in
================================================`;
  };

  const handleCopy = async () => {
    const summary = generateComplaintSummary();
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = summary;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Golden Hour Urgent Warning */}
      <div className="rounded-3xl bg-amber-500/10 border border-amber-500/40 p-5 flex items-start gap-3.5 backdrop-blur-xl shadow-lg">
        <AlertOctagon className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 animate-pulse" />
        <div>
          <h4 className="text-sm font-black text-amber-200 uppercase tracking-wide">
            {t.emergencyHeader}
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-amber-300/90 mt-1 leading-relaxed">
            {t.emergencyAlertPaid}
          </p>
        </div>
      </div>

      {/* Action Buttons: 1930 & Portal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href="tel:1930"
          className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 active:scale-95 text-white font-black text-base sm:text-lg shadow-xl shadow-red-600/30 transition-all text-center"
        >
          <PhoneCall className="w-5 h-5 stroke-[2.5]" />
          <span>{t.btnCall1930}</span>
        </a>

        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-95 border border-slate-700 text-white font-black text-base sm:text-lg shadow-xl transition-all text-center"
        >
          <ExternalLink className="w-5 h-5 text-orange-400" />
          <span>{t.btnOpenCybercrime}</span>
        </a>
      </div>

      {/* Copy Section 63 BSA Police Complaint Summary */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 active:scale-95 text-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span className="text-emerald-300 font-black">{t.summaryCopied}</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-orange-400" />
              <span>{t.btnCopySummary} (Section 63 BSA)</span>
            </>
          )}
        </button>

        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
        >
          <FileText className="w-4 h-4 text-slate-400" />
          <span>{showPreview ? 'Hide Text' : 'Preview Text'}</span>
        </button>
      </div>

      {/* Complaint Preview Box */}
      {showPreview && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto animate-fadeIn">
          {generateComplaintSummary()}
        </div>
      )}

      {/* Family Safe-Word Tip Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-5 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center flex-shrink-0">
            <KeyRound className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">
            💡 {t.safeWordTitle}
          </h4>
        </div>
        <p className="text-xs text-slate-300 mb-3 leading-relaxed">
          {t.safeWordDesc}
        </p>
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium text-orange-300 leading-relaxed">
          {t.safeWordHow}
        </div>
      </div>
    </div>
  );
};
