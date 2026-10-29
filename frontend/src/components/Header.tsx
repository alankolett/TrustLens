import React from 'react';
import { Shield, Globe } from 'lucide-react';
import { Language, I18N } from '../i18n';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange }) => {
  const t = I18N[currentLang];

  const langNames: Record<Language, string> = {
    en: 'English',
    mr: 'मराठी',
    hi: 'हिंदी'
  };

  return (
    <header className="bg-[#080a0f] border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
            <Shield className="w-4.5 h-4.5 stroke-[2.2]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-semibold tracking-tight text-white">
                {t.appTitle}
              </span>
              <span className="hidden sm:inline-block text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                {t.badgeGov}
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-normal">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right side controls: Engine status & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Engine indicator */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300 font-medium">Offline Engine</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center p-0.5 rounded-lg bg-zinc-900 border border-white/[0.08]">
            <Globe className="w-3.5 h-3.5 text-zinc-400 ml-2 mr-1 hidden sm:block" />
            {(['en', 'mr', 'hi'] as Language[]).map((lang) => {
              const isActive = currentLang === lang;
              return (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                  aria-label={`Switch to ${langNames[lang]}`}
                >
                  {langNames[lang]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
