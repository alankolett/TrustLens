import React from 'react';
import { ShieldCheck, EyeOff, Scale, HelpCircle, HeartHandshake } from 'lucide-react';
import { Language, I18N } from '../i18n';

interface ResponsibleAIPageProps {
  currentLang: Language;
}

export const ResponsibleAIPage: React.FC<ResponsibleAIPageProps> = ({ currentLang }) => {
  const t = I18N[currentLang];

  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-saffron-600" />,
      title: t.raiPillar1Title,
      desc: t.raiPillar1Desc
    },
    {
      icon: <EyeOff className="w-6 h-6 text-navy-800" />,
      title: t.raiPillar2Title,
      desc: t.raiPillar2Desc
    },
    {
      icon: <Scale className="w-6 h-6 text-amber-600" />,
      title: t.raiPillar3Title,
      desc: t.raiPillar3Desc
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-600" />,
      title: t.raiPillar4Title,
      desc: t.raiPillar4Desc
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-black text-navy-900 mb-2">
          {t.raiTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
          {t.raiIntro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Feedback / Reporting */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-2 text-navy-900">
            <HelpCircle className="w-5 h-5 text-saffron-500" />
            <h4 className="text-base font-bold">{t.raiFeedbackTitle}</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            {t.raiFeedbackDesc}
          </p>
        </div>
      </div>
    </div>
  );
};
