import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { TextCheck } from './components/TextCheck';
import { ImageCheck } from './components/ImageCheck';
import { ResponsibleAIPage } from './components/ResponsibleAIPage';
import { ComingSoonTab } from './components/ComingSoonTab';
import { Language, I18N } from './i18n';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<NavTab>('text');

  const t = I18N[currentLang];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Brand Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* Primary Navigation Tabs */}
      <Navigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        currentLang={currentLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {currentTab === 'text' && (
          <TextCheck currentLang={currentLang} />
        )}

        {currentTab === 'image' && (
          <ImageCheck currentLang={currentLang} />
        )}

        {currentTab === 'voice' && (
          <ComingSoonTab
            type="voice"
            currentLang={currentLang}
            onGoBack={setCurrentTab}
          />
        )}

        {currentTab === 'video' && (
          <ComingSoonTab
            type="video"
            currentLang={currentLang}
            onGoBack={setCurrentTab}
          />
        )}

        {currentTab === 'about' && (
          <ResponsibleAIPage currentLang={currentLang} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 text-slate-400 border-t border-navy-900 py-6 px-4 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-center sm:text-left">
          <div>
            <span className="font-bold text-slate-200">TrustLens 2026</span> • Built for Seva First Innovation Challenge
            <div className="text-slate-500 mt-0.5">
              Theme: Responsible AI, Deepfake Detection, Cyber Resilience & Digital Trust
            </div>
          </div>
          <div className="font-medium text-slate-400">
            {t.disclaimer}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
