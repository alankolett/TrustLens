import React from 'react';
import { Shield, Globe, Zap, Cpu } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#090d18]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-3 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.3]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="Offline Forensic Shield Online" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                  {t.appTitle}
                </span>
                <span className="text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  {t.badgeGov}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Offline Badge for Mobile */}
          <div className="sm:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
            <Cpu className="w-3 h-3" />
            <span>0ms Offline</span>
          </div>
        </div>

        {/* Right side controls: Offline Engine Indicator & Language Switcher */}
        <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-between sm:justify-end">
          {/* Offline engine indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-slate-300">Offline Cyber Engine</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold">0ms</span>
          </div>

          {/* Language Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-slate-800 self-stretch sm:self-auto justify-center">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
            {(['en', 'mr', 'hi'] as Language[]).map((lang) => {
              const isActive = currentLang === lang;
              return (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
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
