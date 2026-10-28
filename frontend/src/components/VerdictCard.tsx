import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { Language, I18N } from '../i18n';

export type VerdictType = 'red' | 'amber' | 'green';

export interface RuleFlagData {
  id: string;
  category: string;
  weight: number;
  title: string;
  description: string;
}

export interface VerdictData {
  verdict: VerdictType;
  confidence: number;
  reasons: string[];
  advice: string;
  scam_type?: string | null;
  rule_score?: number;
  flags?: RuleFlagData[];
  analysis_mode?: string;
  disclaimer: string;
}

interface VerdictCardProps {
  verdictData: VerdictData;
  currentLang: Language;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ verdictData, currentLang }) => {
  const t = I18N[currentLang];
  const { verdict, confidence, reasons, advice, scam_type, flags, analysis_mode, disclaimer } = verdictData;

  const styleConfig = {
    red: {
      bg: 'bg-red-50 border-red-500 text-red-950',
      badge: 'bg-red-600 text-white',
      badgeBorder: 'border-red-600',
      barBg: 'bg-red-200',
      barFill: 'bg-red-600',
      icon: <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 flex-shrink-0" />,
      title: t.verdictRedTitle
    },
    amber: {
      bg: 'bg-amber-50 border-amber-500 text-amber-950',
      badge: 'bg-amber-600 text-white',
      badgeBorder: 'border-amber-600',
      barBg: 'bg-amber-200',
      barFill: 'bg-amber-600',
      icon: <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 flex-shrink-0" />,
      title: t.verdictAmberTitle
    },
    green: {
      bg: 'bg-emerald-50 border-emerald-500 text-emerald-950',
      badge: 'bg-emerald-600 text-white',
      badgeBorder: 'border-emerald-600',
      barBg: 'bg-emerald-200',
      barFill: 'bg-emerald-600',
      icon: <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 flex-shrink-0" />,
      title: t.verdictGreenTitle
    }
  }[verdict];

  return (
    <div className={`rounded-2xl border-2 p-5 sm:p-7 shadow-lg transition-all ${styleConfig.bg}`}>
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/10">
        <div className="flex items-center gap-3.5">
          {styleConfig.icon}
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <span className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full tracking-wider ${styleConfig.badge}`}>
                {styleConfig.title}
              </span>
              {scam_type && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/80 border border-black/10 text-slate-800">
                  {scam_type}
                </span>
              )}
            </div>
            {analysis_mode === 'rules_only' && (
              <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                {t.offlineModeNotice}
              </p>
            )}
          </div>
        </div>

        {/* Confidence Gauge */}
        <div className="sm:text-right bg-white/60 p-2.5 rounded-xl border border-black/5 min-w-[140px]">
          <div className="text-xs font-bold text-slate-700 flex justify-between sm:justify-end gap-2">
            <span>{t.confidenceLabel}</span>
            <span className="text-sm font-black">{confidence}%</span>
          </div>
          <div className={`w-full sm:w-36 h-2.5 rounded-full mt-1.5 overflow-hidden ${styleConfig.barBg}`}>
            <div
              className={`h-full rounded-full transition-all duration-700 ${styleConfig.barFill}`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Immediate Advice Banner */}
      <div className="mt-5 p-4 rounded-xl bg-white shadow-xs border border-black/10">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
          {t.adviceTitle}
        </h4>
        <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {advice}
        </p>
      </div>

      {/* Forensic / Rule Findings */}
      {reasons && reasons.length > 0 && (
        <div className="mt-5">
          <h4 className="text-sm font-bold text-slate-800 mb-2.5">
            {t.reasonsTitle}
          </h4>
          <ul className="space-y-2">
            {reasons.slice(0, 3).map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Triggered Rule Flags (for transparency) */}
      {flags && flags.length > 0 && (
        <div className="mt-5 pt-4 border-t border-black/10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            {t.detectedFlagsTitle} ({flags.length})
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {flags.map((flag) => (
              <span
                key={flag.id}
                title={flag.description}
                className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/90 border border-slate-300 text-slate-800 shadow-2xs"
              >
                ⚠️ {flag.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mandatory Disclaimer in Selected Language */}
      <div className="mt-6 pt-3.5 border-t border-black/10 flex items-center justify-between text-xs text-slate-600">
        <span className="font-semibold italic">
          ⚖️ {disclaimer || t.disclaimer}
        </span>
      </div>
    </div>
  );
};
