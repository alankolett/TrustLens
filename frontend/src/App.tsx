import React, { useState } from 'react';
import { ThreatTicker } from './components/ThreatTicker';
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
    <div className="min-h-screen flex flex-col font-sans bg-[#080a0f] text-zinc-100 selection:bg-orange-500 selection:text-white">
      {/* Live Cyber Threat Advisory Ticker */}
      <ThreatTicker currentLang={currentLang} />

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
          <TextCheck currentLang={currentLang} onTabNavigate={setCurrentTab} />
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
      <footer className="bg-[#06080d] text-zinc-500 border-t border-white/[0.06] py-8 px-4 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-semibold text-zinc-200">TrustLens 2026</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span className="text-zinc-400">Seva First Innovation Challenge</span>
            </div>
            <div className="text-[11px] text-zinc-500">
              Citizen Scam Verification & Deepfake Forensics Platform
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1 text-zinc-400">
            <span className="text-zinc-400">{t.disclaimer}</span>
            <span className="text-[11px] text-zinc-500">Stateless • Zero Cloud Storage • Fully On-Device</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
