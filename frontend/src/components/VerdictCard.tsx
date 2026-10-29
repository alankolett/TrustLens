import React from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { Language, I18N } from '../i18n';
import { ThreatFlag, ThreatVectorScores } from '../lib/offlineForensics';

export type VerdictType = 'red' | 'amber' | 'green';

export interface VerdictData {
  verdict: VerdictType;
  confidence: number;
  score?: number;
  reasons: string[];
  advice: string;
  scam_type?: string | null;
  flags?: ThreatFlag[] | any[];
  vectors?: ThreatVectorScores;
  highlightedTokens?: string[];
  analysis_mode?: string;
  disclaimer: string;
}

interface VerdictCardProps {
  verdictData: VerdictData;
  currentLang: Language;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({ verdictData, currentLang }) => {
  const t = I18N[currentLang];
  const { verdict, confidence, reasons, advice, scam_type, flags, vectors, highlightedTokens, disclaimer } = verdictData;
  const score = verdictData.score ?? confidence;

  const config = {
    red: {
      border: 'border-red-500/30',
      badge: 'bg-red-500/10 text-red-400 border border-red-500/20',
      barColor: 'bg-red-500',
      icon: <ShieldAlert className="w-5 h-5 text-red-400" />,
      title: t.verdictRedTitle
    },
    amber: {
      border: 'border-amber-500/30',
      badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      barColor: 'bg-amber-500',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
      title: t.verdictAmberTitle
    },
    green: {
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      barColor: 'bg-emerald-500',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: t.verdictGreenTitle
    }
  }[verdict];

  return (
    <div className={`rounded-2xl bg-[#11141c] border p-5 sm:p-6 transition-all ${config.border}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-zinc-900 border border-white/[0.08] mt-0.5">
            {config.icon}
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${config.badge}`}>
                {config.title}
              </span>
              {scam_type && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-white/[0.06]">
                  {scam_type}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              {t.offlineModeNotice}
            </p>
          </div>
        </div>

        {/* Score indicator */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-zinc-900/80 px-3.5 py-2 rounded-xl border border-white/[0.08]">
          <div className="text-right">
            <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">Threat Score</div>
            <div className="text-lg font-bold text-white font-mono">{score}<span className="text-xs text-zinc-400 font-sans">/100</span></div>
          </div>
          <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${config.barColor}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Body: Findings & Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
        {/* Left: Key Findings */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            <span>{t.reasonsTitle}</span>
          </h4>

          <ul className="space-y-2">
            {reasons.map((reason, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                <span className="text-zinc-500 mt-1">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          {/* Matched Keywords / Indicators */}
          {highlightedTokens && highlightedTokens.length > 0 && (
            <div className="pt-2">
              <span className="text-[11px] font-medium text-zinc-400 block mb-1.5">
                {t.detectedFlagsTitle}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {highlightedTokens.map((token, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 border border-white/[0.08]"
                  >
                    "{token}"
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Recommended Action */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
            <span>{t.adviceTitle}</span>
          </h4>

          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
            {advice}
          </div>

          {/* Threat Vector Breakdown */}
          {vectors && (
            <div className="pt-1">
              <div className="text-[11px] font-medium text-zinc-400 mb-2">Signal Breakdown</div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-zinc-900/60 p-2 rounded-lg border border-white/[0.04] flex items-center justify-between">
                  <span className="text-zinc-400">Urgency</span>
                  <span className="font-mono text-zinc-200">{vectors.urgencyPressure}%</span>
                </div>
                <div className="bg-zinc-900/60 p-2 rounded-lg border border-white/[0.04] flex items-center justify-between">
                  <span className="text-zinc-400">Authority</span>
                  <span className="font-mono text-zinc-200">{vectors.authorityCoercion}%</span>
                </div>
                <div className="bg-zinc-900/60 p-2 rounded-lg border border-white/[0.04] flex items-center justify-between">
                  <span className="text-zinc-400">Financial</span>
                  <span className="font-mono text-zinc-200">{vectors.financialLure}%</span>
                </div>
                <div className="bg-zinc-900/60 p-2 rounded-lg border border-white/[0.04] flex items-center justify-between">
                  <span className="text-zinc-400">Link Risk</span>
                  <span className="font-mono text-zinc-200">{vectors.linkRisk}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-zinc-500">
        {disclaimer || t.disclaimer}
      </div>
    </div>
  );
};
