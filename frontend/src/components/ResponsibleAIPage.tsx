import React from 'react';
import { ShieldCheck, EyeOff, Scale, HeartHandshake, HelpCircle, Lock } from 'lucide-react';
import { Language, I18N } from '../i18n';

interface ResponsibleAIPageProps {
  currentLang: Language;
}

export const ResponsibleAIPage: React.FC<ResponsibleAIPageProps> = ({ currentLang }) => {
  const t = I18N[currentLang];

  const pillars = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-orange-400" />,
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
      <div className="rounded-2xl premium-card p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
          <Lock className="w-3 h-3" />
          <span>Stateless & Offline Architecture</span>
        </div>

        <h2 className="text-lg sm:text-2xl font-semibold text-white mb-2">
          {t.raiTitle}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 max-w-2xl">
          {t.raiIntro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-xl bg-zinc-900/60 border border-white/[0.06] flex flex-col gap-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/[0.06]">
                {p.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mt-1">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Feedback / Reporting section */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-white font-medium text-xs sm:text-sm">
              <HelpCircle className="w-4 h-4 text-orange-400" />
              <span>{t.raiFeedbackTitle}</span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              {t.raiFeedbackDesc}
            </p>
          </div>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-white/[0.08] transition-colors whitespace-nowrap"
          >
            cybercrime.gov.in
          </a>
        </div>
      </div>
    </div>
  );
};
