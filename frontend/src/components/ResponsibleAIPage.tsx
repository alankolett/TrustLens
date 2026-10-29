import React from 'react';
import { ShieldCheck, EyeOff, Scale, HeartHandshake, HelpCircle, Cpu, Lock } from 'lucide-react';
import { Language, I18N } from '../i18n';

interface ResponsibleAIPageProps {
  currentLang: Language;
}

export const ResponsibleAIPage: React.FC<ResponsibleAIPageProps> = ({ currentLang }) => {
  const t = I18N[currentLang];

  const pillars = [
    {
      icon: <Cpu className="w-5 h-5 text-orange-400" />,
      title: t.raiPillar1Title,
      desc: t.raiPillar1Desc
    },
    {
      icon: <EyeOff className="w-5 h-5 text-emerald-400" />,
      title: t.raiPillar2Title,
      desc: t.raiPillar2Desc
    },
    {
      icon: <Scale className="w-5 h-5 text-amber-400" />,
      title: t.raiPillar3Title,
      desc: t.raiPillar3Desc
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-blue-400" />,
      title: t.raiPillar4Title,
      desc: t.raiPillar4Desc
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-9 shadow-2xl backdrop-blur-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>Stateless & Offline by Design</span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black text-white mb-2">
          {t.raiTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8 max-w-2xl font-medium">
          {t.raiIntro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex flex-col gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-md">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Feedback / Reporting section */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <HelpCircle className="w-4 h-4 text-orange-400" />
              <span>{t.raiFeedbackTitle}</span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              {t.raiFeedbackDesc}
            </p>
          </div>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 whitespace-nowrap shadow-sm"
          >
            cybercrime.gov.in
          </a>
        </div>
      </div>
    </div>
  );
};
