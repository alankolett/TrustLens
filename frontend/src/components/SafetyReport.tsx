import React, { useState } from 'react';
import { PhoneCall, ExternalLink, Copy, Check, FileText, AlertCircle } from 'lucide-react';
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
    const excerpt = originalText ? (originalText.length > 250 ? originalText.substring(0, 250) + '...' : originalText) : 'N/A';

    return `=== TRUSTLENS INCIDENT REPORT ===
Timestamp: ${timestamp} IST
Risk Level: ${verdictData.verdict.toUpperCase()} (Threat Score: ${verdictData.confidence}%)
Type: ${verdictData.scam_type || 'Digital Fraud / Social Engineering'}

SUSPICIOUS CONTENT:
"${excerpt}"

DETECTED INDICATORS:
${flagsList || '• Matched known scam heuristic patterns'}

RECOMMENDED IMMEDIATE ACTION:
1. Do not transfer funds or share OTP/passwords.
2. If already transferred, call Helpline 1930 immediately to freeze transactions.
3. Report the incident at https://cybercrime.gov.in
=================================`;
  };

  const handleCopy = async () => {
    const summary = generateComplaintSummary();
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = summary;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-3">
      {/* Golden Hour Urgent Warning */}
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
            {t.emergencyHeader}
          </h4>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
            {t.emergencyAlertPaid}
          </p>
        </div>
      </div>

      {/* Action Buttons: 1930 & Portal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <a
          href="tel:1930"
          className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-medium text-sm transition-colors text-center shadow-xs"
        >
          <PhoneCall className="w-4 h-4 stroke-[2.2]" />
          <span>{t.btnCall1930}</span>
        </a>

        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:scale-[0.98] border border-white/[0.08] text-zinc-200 font-medium text-sm transition-colors text-center"
        >
          <ExternalLink className="w-4 h-4 text-zinc-400" />
          <span>{t.btnOpenCybercrime}</span>
        </a>
      </div>

      {/* Copy Incident Summary */}
      <div className="rounded-xl bg-zinc-900/60 border border-white/[0.06] p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-zinc-400" />
          <div>
            <span className="text-xs font-medium text-zinc-300">Official Incident Record</span>
            <span className="text-[11px] text-zinc-500 block">Pre-formatted text summary for reporting to 1930 or local police</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors"
          >
            {showPreview ? 'Hide Preview' : 'Preview'}
          </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-md border border-white/[0.08] transition-colors flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.btnCopySummary}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Preview */}
      {showPreview && (
        <pre className="p-3.5 rounded-xl bg-zinc-950 border border-white/[0.08] text-[11px] font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap leading-relaxed animate-fadeIn">
          {generateComplaintSummary()}
        </pre>
      )}
    </div>
  );
};
