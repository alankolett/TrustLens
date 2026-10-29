import React from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert, CheckCircle2, Info, Activity } from 'lucide-react';
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

  const styleConfig = {
    red: {
      border: 'border-red-500/80',
      bg: 'bg-gradient-to-b from-red-950/40 via-slate-900/90 to-slate-950/90',
      badge: 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-400',
      radarStroke: '#ef4444',
      glow: 'shadow-[0_0_40px_-10px_rgba(239,68,68,0.35)]',
      icon: <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 flex-shrink-0 animate-pulse" />,
      title: t.verdictRedTitle
    },
    amber: {
      border: 'border-amber-500/80',
      bg: 'bg-gradient-to-b from-amber-950/30 via-slate-900/90 to-slate-950/90',
      badge: 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 border border-amber-400',
      radarStroke: '#f59e0b',
      glow: 'shadow-[0_0_40px_-10px_rgba(245,158,11,0.35)]',
      icon: <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 flex-shrink-0" />,
      title: t.verdictAmberTitle
    },
    green: {
      border: 'border-emerald-500/80',
      bg: 'bg-gradient-to-b from-emerald-950/30 via-slate-900/90 to-slate-950/90',
      badge: 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400',
      radarStroke: '#10b981',
      glow: 'shadow-[0_0_40px_-10px_rgba(16,185,129,0.35)]',
      icon: <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-400 flex-shrink-0" />,
      title: t.verdictGreenTitle
    }
  }[verdict];

  // SVG Circular Gauge calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`rounded-3xl border-2 p-5 sm:p-7 backdrop-blur-2xl transition-all ${styleConfig.bg} ${styleConfig.border} ${styleConfig.glow}`}>
      {/* HUD Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-inner">
            {styleConfig.icon}
          </div>
          <div>
            <div className="flex items-center flex-wrap gap-2">
              <span className={`text-xs uppercase font-black px-3 py-1 rounded-full tracking-wider ${styleConfig.badge}`}>
                {styleConfig.title}
              </span>
              {scam_type && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-200">
                  {scam_type}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Offline Multi-Vector Threat Analysis</span>
            </p>
          </div>
        </div>

        {/* Circular Radar Risk Meter */}
        <div className="flex items-center gap-3 bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800 self-start sm:self-auto min-w-[170px] justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Threat Index</div>
            <div className="text-xl font-black text-white">{score}<span className="text-xs text-slate-400">/100</span></div>
            <div className="text-[10px] text-slate-400 font-medium">Confidence: {confidence}%</div>
          </div>
          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="#1e293b"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke={styleConfig.radarStroke}
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-white">
              {score}%
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Action Directive */}
      <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 shadow-inner">
        <h4 className="text-[11px] font-black uppercase tracking-wider text-orange-400 mb-1 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5" />
          <span>{t.adviceTitle}</span>
        </h4>
        <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
          {advice}
        </p>
      </div>

      {/* Threat Vector Breakdown Bars (if available) */}
      {vectors && (
        <div className="mt-5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Threat Vector Breakdown</span>
            <span className="text-[10px] text-slate-400 lowercase">heuristic multi-signal</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Urgency Pressure', val: vectors.urgencyPressure, color: 'bg-amber-500' },
              { label: 'Authority Coercion', val: vectors.authorityCoercion, color: 'bg-red-500' },
              { label: 'Credential Risk', val: vectors.credentialHarvest, color: 'bg-rose-500' },
              { label: 'Financial Lure', val: vectors.financialLure, color: 'bg-orange-500' },
              { label: 'Link Malice', val: vectors.linkRisk, color: 'bg-purple-500' }
            ].map((v, i) => (
              <div key={i} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-medium truncate">{v.label}</div>
                <div className="text-xs font-black text-white mt-0.5">{v.val}%</div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div className={`h-full ${v.color} rounded-full transition-all duration-700`} style={{ width: `${v.val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Forensic Findings List */}
      {reasons && reasons.length > 0 && (
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            {t.reasonsTitle}
          </h4>
          <ul className="space-y-2">
            {reasons.slice(0, 3).map((reason, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-800/70 text-xs sm:text-sm font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Detected Signal Chips */}
      {flags && flags.length > 0 && (
        <div className="mt-5 pt-4 border-t border-slate-800">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            {t.detectedFlagsTitle} ({flags.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {flags.map((flag: any) => (
              <span
                key={flag.id}
                title={flag.description}
                className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 shadow-sm flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span>{currentLang === 'mr' ? (flag.titleMr || flag.title) : (currentLang === 'hi' ? (flag.titleHi || flag.title) : flag.title)}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Highlighted Dangerous Tokens */}
      {highlightedTokens && highlightedTokens.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <span className="font-bold text-slate-400">Trigger Phrases:</span>
          {highlightedTokens.slice(0, 5).map((tok, i) => (
            <span key={i} className="px-2 py-0.5 rounded-md bg-red-500/15 border border-red-500/30 text-red-300 font-mono text-[11px] font-bold">
              "{tok}"
            </span>
          ))}
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="italic">
          ⚖️ {disclaimer || t.disclaimer}
        </span>
      </div>
    </div>
  );
};
