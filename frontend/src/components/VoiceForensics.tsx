import React, { useState, useEffect } from 'react';
import { Mic, Play, Pause, Activity, Radio, AlertOctagon, CheckCircle2, ShieldCheck, KeyRound } from 'lucide-react';
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
    title: 'AI Voice-Clone: "Grandson in Police Custody Bail Scam"',
    titleMr: 'AI द्वारे तयार केलेला नातवाचा खोटा आवाज (तातडीने पैसे मागणी)',
    titleHi: 'AI द्वारा क्लोन की गई पोते की फर्जी आवाज (इमरजेंसी फिरौती)',
    category: 'clone',
    riskScore: 94,
    syntheticJitter: 88,
    vocalTremor: 'Flat / Zero Physiological Tremor (Synthetic Model)',
    respiratoryPause: 'Missing Natural Inhales (Unnatural Continuous Audio)',
    summary: 'High probability of neural voice cloning (e.g. ElevenLabs/VALL-E). Audio lacks authentic breathing cadence and emotional biological tremor.',
    summaryMr: 'AI द्वारे तयार केलेला हुबेहूब बनावट आवाज. बोलताना नैसर्गिक श्वासाचे अंतर आणि मानवी भावनांचा अभाव.',
    summaryHi: 'AI द्वारा तैयार किया गया क्लोन ऑडियो। सांस लेने का प्राकृतिक अंतराल और जैविक कंपन पूरी तरह गायब है।',
    audioDuration: 8.4
  },
  {
    id: 'voice_fake_officer',
    title: 'Robotic TTS: "Fake CBI Cyber Cell Video-Call Notice"',
    titleMr: 'खोटे सीबीआय अधिकारी डिजिटल अरेस्ट व्हॉइस कॉल',
    titleHi: 'फर्जी सीबीआई अधिकारी डिजिटल अरेस्ट वॉयस कॉल',
    category: 'clone',
    riskScore: 86,
    syntheticJitter: 76,
    vocalTremor: 'Monotone Artificial Modulation',
    respiratoryPause: 'Fragmented Synthesizer Splices',
    summary: 'Automated robocall using text-to-speech engine to simulate formal police summons. Severe boundary phase shifts identified.',
    summaryMr: 'रोबोटिक आवाजाचा वापर करून पोलिसांची खोटी नोटीस वाचून दाखवली जात आहे.',
    summaryHi: 'रोबोटिक कंप्यूटर आवाज का उपयोग करके फर्जी समन की धमकी दी जा रही है।',
    audioDuration: 6.2
  },
  {
    id: 'voice_authentic_family',
    title: 'Authentic Family Audio Call (Safe)',
    titleMr: 'कुटुंबातील सदस्याचा खरा फोन कॉल (सुरक्षित)',
    titleHi: 'परिवार के सदस्य का असली फोन कॉल (सुरक्षित)',
    category: 'safe',
    riskScore: 12,
    syntheticJitter: 14,
    vocalTremor: 'Natural Micro-laryngeal Flutter Detected',
    respiratoryPause: 'Authentic Inhale / Exhale Acoustic Signatures',
    summary: 'Authentic biological voice profile with natural room reverberation, normal diaphragm breathing pauses, and physiological frequency flutter.',
    summaryMr: 'नैसर्गिक मानवी आवाज. नैसर्गिक श्वास आणि खोलीतील सामान्य आवाजाचे संकेत.',
    summaryHi: 'प्रामाणिक मानवीय आवाज। प्राकृतिक सांस लेने का अंतराल और कमरे की स्वाभाविक ध्वनि मौजूद है।',
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
  const [userSafeWord, setUserSafeWord] = useState<string>(() => localStorage.getItem('trustlens_safeword') || 'KajuKatli');
  const [isEditingWord, setIsEditingWord] = useState<boolean>(false);

  // Simulated audio playback progress animation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + (100 / (selectedScenario.audioDuration * 10));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedScenario]);

  const togglePlayback = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (playProgress >= 100) setPlayProgress(0);
      setIsPlaying(true);
    }
  };

  const handleScenarioChange = (s: VoiceScenario) => {
    setSelectedScenario(s);
    setIsPlaying(false);
    setPlayProgress(0);
  };

  const handleSaveSafeWord = (word: string) => {
    setUserSafeWord(word);
    localStorage.setItem('trustlens_safeword', word);
    setIsEditingWord(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border border-slate-800 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500/20 border border-saffron-500/40 text-saffron-400 text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse text-saffron-400" />
              <span>Offline Audio Spectral Lab</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              AI Voice-Clone & Extortion Call Detector
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
              Analyze speech rhythm, biological vocal cord micro-tremors, and synthetic breathing anomalies in emergency calls.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Analysis Mode</div>
            <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              100% Offline Forensic Engine
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scenario Selector */}
      <div className="space-y-2.5">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Select Forensic Audio Scenario to Inspect:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VOICE_SCENARIOS.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            const isClone = scenario.category === 'clone';
            return (
              <button
                key={scenario.id}
                onClick={() => handleScenarioChange(scenario)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-slate-800/90 border-saffron-500 shadow-lg ring-1 ring-saffron-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    isClone ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {isClone ? '🚨 AI Synthetic' : '✅ Human Voice'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {scenario.audioDuration}s
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                  {currentLang === 'mr' ? scenario.titleMr : (currentLang === 'hi' ? scenario.titleHi : scenario.title)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Forensic Waveform & Spectrogram Deck */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl space-y-6">
        {/* Audio Visualizer Stage */}
        <div className="rounded-xl bg-slate-950 border border-slate-800/90 p-4 sm:p-5 relative overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlayback}
                className="w-12 h-12 rounded-xl bg-saffron-500 hover:bg-saffron-400 text-white flex items-center justify-center shadow-lg shadow-saffron-500/30 active:scale-95 transition-all"
                title={isPlaying ? 'Pause' : 'Play Audio'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{currentLang === 'mr' ? selectedScenario.titleMr : (currentLang === 'hi' ? selectedScenario.titleHi : selectedScenario.title)}</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Spectral Bandwidth: 16kHz • Frame Rate: 44.1kHz • Mono
                </div>
              </div>
            </div>

            <div className="hidden sm:block text-right font-mono">
              <div className="text-xs text-slate-400">Deepfake Probability</div>
              <div className={`text-lg font-black ${selectedScenario.riskScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                {selectedScenario.riskScore}%
              </div>
            </div>
          </div>

          {/* Animated Frequency Spectrum Bars */}
          <div className="h-20 sm:h-24 w-full flex items-end justify-between gap-1 py-2 px-1">
            {Array.from({ length: 36 }).map((_, i) => {
              const baseHeight = 15 + ((Math.sin(i * 0.4) + 1) * 35);
              const isPlayingHeight = isPlaying
                ? Math.min(100, baseHeight + (Math.sin((i + playProgress) * 0.8) * 30))
                : baseHeight * 0.4;
              const isHighFrequency = i > 24;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-all duration-100 ${
                    selectedScenario.category === 'clone'
                      ? (isHighFrequency ? 'bg-red-500/80' : 'bg-saffron-500')
                      : 'bg-emerald-500/80'
                  }`}
                  style={{
                    height: `${isPlayingHeight}%`,
                    opacity: isPlaying ? 0.9 : 0.4
                  }}
                />
              );
            })}
          </div>

          {/* Playback Scrub Bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-saffron-500 h-full transition-all duration-100"
              style={{ width: `${playProgress}%` }}
            />
          </div>
        </div>

        {/* Forensic Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Robotic Jitter Variance</div>
            <div className="text-base font-bold text-white mt-1 flex items-center justify-between">
              <span>{selectedScenario.syntheticJitter}%</span>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${selectedScenario.syntheticJitter > 50 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {selectedScenario.syntheticJitter > 50 ? 'High' : 'Normal'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Physiological Tremor</div>
            <div className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">
              {selectedScenario.vocalTremor}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Respiratory Pause Cadence</div>
            <div className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">
              {selectedScenario.respiratoryPause}
            </div>
          </div>
        </div>

        {/* Forensic Finding Summary Box */}
        <div className={`p-4 rounded-xl border ${
          selectedScenario.category === 'clone'
            ? 'bg-red-950/30 border-red-500/40 text-red-200'
            : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            {selectedScenario.category === 'clone' ? (
              <>
                <AlertOctagon className="w-5 h-5 text-red-400" />
                <span>Forensic Verdict: Synthetic Neural Voice-Clone Detected</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Forensic Verdict: Authentic Human Acoustic Signature Verified</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            {currentLang === 'mr' ? selectedScenario.summaryMr : (currentLang === 'hi' ? selectedScenario.summaryHi : selectedScenario.summary)}
          </p>
        </div>

        {/* Interactive Family Safe-Word Defense Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-saffron-500/10 via-slate-900 to-slate-900 border border-saffron-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-saffron-400 font-bold text-sm">
              <KeyRound className="w-4 h-4" />
              <span>Interactive Family Safe-Word Vault</span>
            </div>
            <p className="text-xs text-slate-300 max-w-lg">
              When an extortionist or AI voice-clone claims an emergency, never send money. Ask for your family secret word first.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2.5 rounded-xl border border-saffron-500/40">
            {isEditingWord ? (
              <input
                type="text"
                defaultValue={userSafeWord}
                onBlur={(e) => handleSaveSafeWord(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveSafeWord((e.target as HTMLInputElement).value);
                }}
                autoFocus
                className="bg-transparent border-b border-saffron-400 text-white font-mono font-bold text-sm focus:outline-hidden px-1 w-32"
              />
            ) : (
              <>
                <span className="text-xs text-slate-400">Secret Word:</span>
                <span className="font-mono font-black text-sm text-saffron-400 tracking-wider">
                  "{userSafeWord}"
                </span>
                <button
                  onClick={() => setIsEditingWord(true)}
                  className="text-[11px] font-bold text-slate-400 hover:text-white underline ml-1"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
