import React from 'react';
import { MessageSquareText, Image as ImageIcon, Mic, Video, Info } from 'lucide-react';
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

  const tabs: { id: NavTab; label: string; icon: React.ReactNode; isSoon?: boolean }[] = [
    { id: 'text', label: t.tabText, icon: <MessageSquareText className="w-5 h-5" /> },
    { id: 'image', label: t.tabImage, icon: <ImageIcon className="w-5 h-5" /> },
    { id: 'voice', label: t.tabVoice, icon: <Mic className="w-5 h-5" />, isSoon: true },
    { id: 'video', label: t.tabVideo, icon: <Video className="w-5 h-5" />, isSoon: true },
    { id: 'about', label: t.tabAbout, icon: <Info className="w-5 h-5" /> }
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="flex items-center overflow-x-auto no-scrollbar gap-1 sm:gap-2 py-2">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-navy-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.isSoon && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                    isActive ? 'bg-saffron-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {currentLang === 'mr' ? 'लवकरच' : (currentLang === 'hi' ? 'जल्द' : 'Soon')}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
