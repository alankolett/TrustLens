import React, { useState } from 'react';
import { PhoneCall, ExternalLink, Copy, Check, ShieldAlert, KeyRound, AlertOctagon } from 'lucide-react';
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

  const generateComplaintSummary = (): string => {
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const flagsList = (verdictData.flags || []).map(f => `• ${f.title}`).join('\n');
    const excerpt = originalText ? (originalText.length > 250 ? originalText.substring(0, 250) + '...' : originalText) : 'N/A';

    return `=== TRUSTLENS CYBER INCIDENT SUMMARY ===
Generated: ${timestamp} IST
Risk Level: ${verdictData.verdict.toUpperCase()} (${verdictData.confidence}% Confidence)
Scam Type: ${verdictData.scam_type || 'Suspicious Phishing / Social Engineering'}

SUSPICIOUS MESSAGE / CONTENT:
"${excerpt}"

DETECTED RISK INDICATORS:
${flagsList || '• Suspicious content detected by forensic rule analysis'}

RECOMMENDED CITIZEN ACTIONS:
• DO NOT share OTP, UPI PIN, or bank passwords with anyone.
• DO NOT install remote access software (AnyDesk, TeamViewer, QuickSupport).
• DO NOT transfer advance clearance fees, registration deposits, or penalty sums.
• In case of financial loss, report within the 1-hour golden window at helpline 1930 or https://cybercrime.gov.in
========================================`;
  };

  const handleCopy = async () => {
    const summary = generateComplaintSummary();
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback if clipboard API is restricted
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
      <div className="rounded-2xl bg-amber-500/10 border-2 border-amber-500 p-4 sm:p-5 flex items-start gap-3.5">
        <AlertOctagon className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-amber-900">
            {t.emergencyHeader}
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-0.5">
            {t.emergencyAlertPaid}
          </p>
        </div>
      </div>

      {/* Action Buttons: 1930 & Portal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href="tel:1930"
          className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-md transition-all text-center"
        >
          <PhoneCall className="w-5 h-5 stroke-[2.5]" />
          <span>{t.btnCall1930}</span>
        </a>

        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 px-5 py-4 rounded-xl bg-navy-900 hover:bg-navy-800 active:scale-[0.99] text-white font-bold text-base sm:text-lg shadow-md transition-all text-center"
        >
          <ExternalLink className="w-5 h-5" />
          <span>{t.btnOpenCybercrime}</span>
        </a>
      </div>

      {/* Copy Complaint Summary for Police */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-300 active:scale-[0.99] text-slate-800 font-bold text-sm sm:text-base shadow-xs transition-all"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
            <span className="text-emerald-700">{t.summaryCopied}</span>
          </>
        ) : (
          <>
            <Copy className="w-5 h-5 text-slate-600" />
            <span>{t.btnCopySummary}</span>
          </>
        )}
      </button>

      {/* Family Safe-Word Tip Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0">
            <KeyRound className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            💡 {t.safeWordTitle}
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mb-2">
          {t.safeWordDesc}
        </p>
        <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-xs sm:text-sm font-medium text-orange-900">
          {t.safeWordHow}
        </div>
      </div>
    </div>
  );
};
