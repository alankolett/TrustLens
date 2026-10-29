import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { TextCheck } from './components/TextCheck';
import { ImageCheck } from './components/ImageCheck';
import { VoiceForensics } from './components/VoiceForensics';
import { VideoForensics } from './components/VideoForensics';
import { ResponsibleAIPage } from './components/ResponsibleAIPage';
import { Language, I18N } from './i18n';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<NavTab>('text');

  const t = I18N[currentLang];

  return (
    <div className="min-h-screen flex flex-col font-sans relative selection:bg-orange-500 selection:text-white">
      {/* Brand Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* Navigation Dock */}
      <Navigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        currentLang={currentLang}
      />

      {/* Main Forensic Command Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {currentTab === 'text' && (
          <TextCheck currentLang={currentLang} />
        )}

        {currentTab === 'image' && (
          <ImageCheck currentLang={currentLang} />
        )}

        {currentTab === 'voice' && (
          <VoiceForensics currentLang={currentLang} />
        )}

        {currentTab === 'video' && (
          <VideoForensics currentLang={currentLang} />
        )}

        {currentTab === 'about' && (
          <ResponsibleAIPage currentLang={currentLang} />
        )}
      </main>

      {/* High-Tech Cyber Footer */}
      <footer className="bg-[#060913] text-slate-500 border-t border-slate-900 py-6 px-4 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center sm:text-left">
          <div className="space-y-0.5">
            <div>
              <span className="font-black text-slate-300">TrustLens 2026</span> • Seva First Innovation Challenge Flagship
            </div>
            <div className="text-[11px] text-slate-400">
              Responsible AI, Deepfake Detection, Cyber Resilience & Digital Trust
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-0.5 text-slate-400">
            <span className="font-semibold text-slate-300">{t.disclaimer}</span>
            <span className="text-[11px] text-slate-400">100% Stateless • Zero Data Persistence</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
