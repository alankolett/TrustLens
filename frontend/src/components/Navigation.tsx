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

  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'text', label: t.tabText, icon: <MessageSquareText className="w-4 h-4" /> },
    { id: 'image', label: t.tabImage, icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'voice', label: t.tabVoice, icon: <Mic className="w-4 h-4" /> },
    { id: 'video', label: t.tabVideo, icon: <Video className="w-4 h-4" /> },
    { id: 'about', label: t.tabAbout, icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  return (
    <nav className="sticky top-0 z-30 bg-[#080a0f]/90 backdrop-blur-xl border-b border-white/[0.06] py-2.5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-xl bg-zinc-900/60 border border-white/[0.06]">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-xs border border-white/[0.1]'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                <span className={isActive ? 'text-orange-400' : 'text-zinc-400'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
