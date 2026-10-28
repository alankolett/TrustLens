import React from 'react';
import { Mic, Video, Sparkles, ArrowLeft } from 'lucide-react';
import { Language, I18N } from '../i18n';
import { NavTab } from './Navigation';

interface ComingSoonTabProps {
  type: 'voice' | 'video';
  currentLang: Language;
  onGoBack: (tab: NavTab) => void;
}

export const ComingSoonTab: React.FC<ComingSoonTabProps> = ({
  type,
  currentLang,
  onGoBack
}) => {
  const t = I18N[currentLang];
  const isVoice = type === 'voice';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center max-w-xl mx-auto my-4">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500/10 border border-saffron-500/20 text-saffron-600 text-xs font-bold uppercase tracking-wider mb-4">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{t.comingSoonBadge}</span>
      </div>

      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-navy-50 text-navy-900 border border-navy-100 mx-auto flex items-center justify-center mb-4 shadow-inner">
        {isVoice ? (
          <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-saffron-500" />
        ) : (
          <Video className="w-8 h-8 sm:w-10 sm:h-10 text-saffron-500" />
        )}
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
        {isVoice ? t.tabVoice : t.tabVideo}
      </h2>

      <p className="text-sm sm:text-base text-slate-600 mb-6 font-medium leading-relaxed max-w-md mx-auto">
        {isVoice ? t.comingSoonVoiceDesc : t.comingSoonVideoDesc}
      </p>

      <button
        onClick={() => onGoBack('text')}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm shadow-xs transition-all active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToHome}</span>
      </button>
    </div>
  );
};
