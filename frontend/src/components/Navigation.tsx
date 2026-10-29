import React from 'react';
import { MessageSquareText, Image as ImageIcon, Mic, Video, ShieldCheck } from 'lucide-react';
import { Language, I18N } from '../i18n';

export type NavTab = 'text' | 'image' | 'voice' | 'video' | 'about';

interface NavigationProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  currentLang: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onTabChange,
  currentLang
}) => {
  const t = I18N[currentLang];

  const tabs: { id: NavTab; label: string; icon: React.ReactNode; isNew?: boolean }[] = [
    { id: 'text', label: t.tabText, icon: <MessageSquareText className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> },
    { id: 'image', label: t.tabImage, icon: <ImageIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> },
    { id: 'voice', label: t.tabVoice, icon: <Mic className="w-4 h-4 sm:w-4.5 sm:h-4.5" />, isNew: true },
    { id: 'video', label: t.tabVideo, icon: <Video className="w-4 h-4 sm:w-4.5 sm:h-4.5" />, isNew: true },
    { id: 'about', label: t.tabAbout, icon: <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> }
  ];

  return (
    <nav className="bg-[#0b101e]/80 border-b border-slate-800/80 sticky top-[65px] sm:top-[69px] z-30 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-2 sm:px-6">
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 sm:gap-2 py-2">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all min-h-[40px] relative ${
                  isActive
                    ? 'bg-slate-800 text-white shadow-lg border border-slate-700/80 ring-1 ring-orange-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <span className={isActive ? 'text-orange-400' : 'text-slate-400'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {tab.isNew && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-800 text-orange-400 border border-orange-500/30'
                  }`}>
                    {currentLang === 'mr' ? 'नवीन' : (currentLang === 'hi' ? 'नया' : 'Live')}
                  </span>
                )}
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
