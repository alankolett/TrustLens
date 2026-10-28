import React from 'react';
import { Shield, Globe } from 'lucide-react';
import { Language, I18N } from '../i18n';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange }) => {
  const t = I18N[currentLang];

  return (
    <header className="bg-navy-900 text-white shadow-lg border-b border-navy-800">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo and App Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-saffron-500 flex items-center justify-center shadow-md shadow-saffron-500/20 text-white flex-shrink-0">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{t.appTitle}</h1>
              <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-saffron-500/20 text-saffron-500 border border-saffron-500/30">
                {t.badgeGov}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1.5 bg-navy-950/70 p-1 rounded-xl border border-navy-800 self-stretch sm:self-auto justify-center">
          <Globe className="w-4 h-4 text-slate-400 ml-1.5 mr-0.5" />
          {(['en', 'mr', 'hi'] as Language[]).map((lang) => {
            const labels: Record<Language, string> = {
              en: 'English',
              mr: 'मराठी',
              hi: 'हिंदी'
            };
            const isActive = currentLang === lang;
            return (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  isActive
                    ? 'bg-saffron-500 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800'
                }`}
                aria-label={`Switch to ${labels[lang]}`}
              >
                {labels[lang]}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
