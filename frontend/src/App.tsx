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
    <div className="min-h-screen flex flex-col font-sans bg-[#0a0c10] text-zinc-100 selection:bg-orange-500 selection:text-white">
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

      {/* Main Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
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

      {/* Clean Footer */}
      <footer className="bg-[#07090d] text-zinc-500 border-t border-white/[0.06] py-6 px-4 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center sm:text-left">
          <div className="space-y-0.5">
            <div>
              <span className="font-semibold text-zinc-300">TrustLens 2026</span> • Seva First Innovation Challenge
            </div>
            <div className="text-[11px] text-zinc-500">
              Citizen Scam Verification & Deepfake Forensics
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-0.5 text-zinc-400">
            <span className="text-zinc-400">{t.disclaimer}</span>
            <span className="text-[11px] text-zinc-500">Stateless • Zero Data Persistence</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
