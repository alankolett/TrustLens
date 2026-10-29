import React, { useState, useEffect } from 'react';
import { Mic, Play, Pause, Radio, CheckCircle2, ShieldCheck, KeyRound, AlertTriangle } from 'lucide-react';
import { Language, I18N } from '../i18n';

interface VoiceScenario {
  id: string;
  title: string;
  titleMr: string;
  titleHi: string;
  category: 'clone' | 'safe';
  riskScore: number;
  syntheticJitter: number;
  vocalTremor: string;
  respiratoryPause: string;
  summary: string;
  summaryMr: string;
  summaryHi: string;
  audioDuration: number;
}

const VOICE_SCENARIOS: VoiceScenario[] = [
  {
    id: 'voice_clone_ransom',
    title: 'AI Voice Clone: Urgent Bail Scam Call',
    titleMr: 'AI द्वारे तयार केलेला नातवाचा बनावट आवाज',
    titleHi: 'AI द्वारा क्लोन की गई पोते की फर्जी आवाज',
    category: 'clone',
    riskScore: 94,
    syntheticJitter: 88,
    vocalTremor: 'Flat emotional cadence (Synthetic neural model)',
    respiratoryPause: 'Missing natural breathing pauses between phrases',
    summary: 'High probability of neural voice cloning. The speech exhibits unnatural continuous frequency cadence without organic breath pauses.',
    summaryMr: 'AI द्वारे तयार केलेला बनावट आवाज. बोलताना नैसर्गिक श्वासाचे अंतर आणि मानवी भावनांचा अभाव.',
    summaryHi: 'AI द्वारा तैयार किया गया क्लोन ऑडियो। सांस लेने का प्राकृतिक अंतराल और स्वाभाविक कंपन अनुपस्थित है।',
    audioDuration: 8.4
  },
  {
    id: 'voice_fake_officer',
    title: 'Synthesized Robocall: Fake Police Summons',
    titleMr: 'खोटे पोलीस अधिकारी रोबोटिक कॉल',
    titleHi: 'फर्जी पुलिस अधिकारी रोबोटिक कॉल',
    category: 'clone',
    riskScore: 86,
    syntheticJitter: 76,
    vocalTremor: 'Monotone pitch curve with uniform phoneme duration',
    respiratoryPause: 'Algorithmic sentence splicing detected',
    summary: 'Automated robocall using text-to-speech engine to simulate a formal summons. Noticeable acoustic boundary splices identified.',
    summaryMr: 'रोबोटिक आवाजाचा वापर करून पोलिसांची खोटी नोटीस वाचून दाखवली जात आहे.',
    summaryHi: 'रोबोटिक कंप्यूटर आवाज का उपयोग करके फर्जी समन की धमकी दी जा रही है।',
    audioDuration: 6.2
  },
  {
    id: 'voice_authentic_family',
    title: 'Authentic Phone Call (Safe)',
    titleMr: 'कुटुंबातील सदस्याचा खरा फोन कॉल (सुरक्षित)',
    titleHi: 'परिवार के सदस्य का असली फोन कॉल (सुरक्षित)',
    category: 'safe',
    riskScore: 12,
    syntheticJitter: 14,
    vocalTremor: 'Natural physiological voice pitch variance',
    respiratoryPause: 'Authentic ambient room reverberation & breath pauses',
    summary: 'Natural voice profile with organic acoustic reverberation, normal diaphragm breathing pauses, and expected pitch variations.',
    summaryMr: 'नैसर्गिक मानवी आवाज. नैसर्गिक श्वास आणि खोलीतील सामान्य आवाजाचे संकेत.',
    summaryHi: 'प्रामाणिक मानवीय आवाज। प्राकृतिक सांस लेने का अंतराल और सामान्य ध्वनि मौजूद है।',
    audioDuration: 7.1
  }
];

interface VoiceForensicsProps {
  currentLang: Language;
}

export const VoiceForensics: React.FC<VoiceForensicsProps> = ({ currentLang }) => {
  const t = I18N[currentLang];
  const [selectedScenario, setSelectedScenario] = useState<VoiceScenario>(VOICE_SCENARIOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playProgress, setPlayProgress] = useState<number>(0);
  const [userSafeWord, setUserSafeWord] = useState<string>(() => localStorage.getItem('trustlens_safeword') || 'Gulabjamun');
  const [isEditingWord, setIsEditingWord] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 5;
        });
      }, 250);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSelectScenario = (sc: VoiceScenario) => {
    setSelectedScenario(sc);
    setIsPlaying(false);
    setPlayProgress(0);
  };

  const handleTogglePlay = () => {
    if (playProgress >= 100) setPlayProgress(0);
    setIsPlaying(!isPlaying);
  };

  const handleSaveSafeWord = (newWord: string) => {
    const clean = newWord.trim();
    if (clean) {
      setUserSafeWord(clean);
      localStorage.setItem('trustlens_safeword', clean);
    }
    setIsEditingWord(false);
  };

  const isClone = selectedScenario.category === 'clone';

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="rounded-2xl premium-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-orange-400" />
              <h2 className="text-base sm:text-lg font-semibold text-white">
                AI Voice Clone Detection Lab
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Analyze audio calls for synthetic neural voice cloning and robocall speech synthesis.
            </p>
          </div>
          <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-white/[0.08] text-zinc-400 self-start sm:self-auto">
            Offline Acoustic Engine
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
            Select Test Audio Scenario
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {VOICE_SCENARIOS.map((sc) => {
              const active = selectedScenario.id === sc.id;
              const isDanger = sc.category === 'clone';
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc)}
                  className={`p-3 rounded-xl border text-left transition-colors flex items-start gap-2.5 ${
                    active
                      ? 'bg-zinc-800 border-zinc-500 text-white shadow-xs'
                      : 'bg-zinc-900/60 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isDanger ? 'bg-red-400' : 'bg-emerald-400'}`} />
                  <div>
                    <div className="text-xs font-medium line-clamp-1">{sc.title}</div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5">{sc.audioDuration}s sample</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Audio Waveform Player */}
        <div className="mt-5 p-4 rounded-xl bg-zinc-950 border border-white/[0.08]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors shadow-xs"
                title={isPlaying ? 'Pause' : 'Play audio simulation'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <span className="text-xs font-medium text-zinc-200">{selectedScenario.title}</span>
                <span className="text-[11px] font-mono text-zinc-400 block">
                  {isPlaying ? 'Analyzing playback...' : 'Ready to analyze'}
                </span>
              </div>
            </div>

            <div className="text-xs font-mono text-zinc-400">
              {((selectedScenario.audioDuration * playProgress) / 100).toFixed(1)}s / {selectedScenario.audioDuration}s
            </div>
          </div>

          {/* Precision Audio Waveform Bars */}
          <div className="h-14 flex items-center justify-between gap-1 px-1 bg-zinc-900/60 rounded-lg p-2 border border-white/[0.04]">
            {Array.from({ length: 36 }).map((_, i) => {
              const activeBar = (i / 36) * 100 <= playProgress;
              const height = isClone
                ? 25 + Math.sin(i * 0.8) * 15 + ((i % 3) * 8)
                : 15 + Math.sin(i * 0.4) * 20 + ((i % 5) * 6);

              return (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-all duration-150 ${
                    activeBar
                      ? isClone ? 'bg-red-400' : 'bg-emerald-400'
                      : 'bg-zinc-800'
                  }`}
                  style={{ height: `${Math.max(12, Math.min(100, height))}%` }}
                />
              );
            })}
          </div>
        </div>

        {/* Forensic Analysis Details */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Acoustic Analysis</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${isClone ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                {isClone ? 'Synthetic Audio Detected' : 'Authentic Human Voice'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {currentLang === 'mr' ? selectedScenario.summaryMr : (currentLang === 'hi' ? selectedScenario.summaryHi : selectedScenario.summary)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06] space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">Biometric Signatures</span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400">Cadence Continuity</span>
                <span className="font-mono text-zinc-200">{selectedScenario.respiratoryPause}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400">Pitch Naturalness</span>
                <span className="font-mono text-zinc-200">{selectedScenario.vocalTremor}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Synthetic Confidence</span>
                <span className="font-mono text-zinc-200">{selectedScenario.riskScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Family Safe-Word Protection Card */}
      <div className="rounded-2xl premium-card p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 mt-0.5">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">
                {t.safeWordTitle}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                {t.safeWordDesc}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                {t.safeWordHow}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-zinc-900/80 border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Your Family Passphrase:</span>
            {isEditingWord ? (
              <input
                type="text"
                defaultValue={userSafeWord}
                id="safe-word-input"
                className="px-2.5 py-1 text-xs bg-zinc-950 border border-zinc-700 rounded text-white font-mono"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveSafeWord((e.target as HTMLInputElement).value);
                }}
              />
            ) : (
              <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                "{userSafeWord}"
              </span>
            )}
          </div>

          <button
            onClick={() => {
              if (isEditingWord) {
                const input = document.getElementById('safe-word-input') as HTMLInputElement;
                if (input) handleSaveSafeWord(input.value);
              } else {
                setIsEditingWord(true);
              }
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/[0.08] transition-colors"
          >
            {isEditingWord ? 'Save Passphrase' : 'Change Passphrase'}
          </button>
        </div>
      </div>
    </div>
  );
};
