import React, { useState } from 'react';
import { Video, Eye, Scan, Layers, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Language, I18N } from '../i18n';

interface VideoScenario {
  id: string;
  title: string;
  titleMr: string;
  titleHi: string;
  category: 'deepfake' | 'safe';
  deepfakeScore: number;
  facialWarpScore: number;
  blinkAnomaly: string;
  cornealReflection: string;
  lipSyncLatency: string;
  summary: string;
  summaryMr: string;
  summaryHi: string;
  wireframeColor: string;
}

const VIDEO_SCENARIOS: VideoScenario[] = [
  {
    id: 'vid_digital_arrest',
    title: 'Impersonated Officer Video Call (Digital Arrest)',
    titleMr: 'मुंबई पोलीस सायबर सेलचा बनावट व्हिडिओ कॉल',
    titleHi: 'मुंबई पुलिस साइबर सेल का फर्जी वीडियो कॉल',
    category: 'deepfake',
    deepfakeScore: 92,
    facialWarpScore: 89,
    blinkAnomaly: '3.2 blinks/min (Abnormally low, synthetic gaze freeze)',
    cornealReflection: 'Mismatched illumination angles vs background',
    lipSyncLatency: '140ms asynchronous phonetic phase gap',
    summary: 'Synthetic face swap superimposed onto police uniform footage. Noticeable pixel warping along jawline and uniform collar edges.',
    summaryMr: 'पोलीस गणवेशावर AI चेहऱ्याचा वापर. मानेभोवती आणि कॉलरवर डिजिटल फेरफार आढळला.',
    summaryHi: 'पुलिस वर्दी पर AI द्वारा निर्मित फर्जी चेहरा लगाया गया है। कॉलर और जबड़े के किनारों पर पिक्सेल हेरफेर है।',
    wireframeColor: '#ef4444'
  },
  {
    id: 'vid_celebrity_crypto',
    title: 'Deepfake Celebrity / Public Figure Investment Ad',
    titleMr: 'प्रसिद्ध व्यक्तीचा बनावट AI व्हिडिओ (शेअर मार्केट आमिष)',
    titleHi: 'मशहूर हस्ती का फर्जी AI वीडियो (शेयर बाजार झांसा)',
    category: 'deepfake',
    deepfakeScore: 88,
    facialWarpScore: 84,
    blinkAnomaly: 'Synthetic micro-gaze freezing detected during speech',
    cornealReflection: 'Identical static reflection in both pupils',
    lipSyncLatency: 'Mouth boundary distortion during vowel transitions',
    summary: 'Generative video diffusion model animating a public figure to promote an investment scheme. Noticeable mouth boundary blur.',
    summaryMr: 'AI व्हिडिओ वापरून जनतेला पैसे गुंतवण्याचे खोटे आमिष दाखवणारा बनावट व्हिडिओ.',
    summaryHi: 'AI वीडियो द्वारा जनता को पैसे दोगुना करने का लालच देने वाला फर्जी वीडियो।',
    wireframeColor: '#f59e0b'
  },
  {
    id: 'vid_authentic_citizen',
    title: 'Authentic Smartphone Video Recording (Safe)',
    titleMr: 'नागरिकाने स्वतः रेकॉर्ड केलेला अस्सल व्हिडिओ (सुरक्षित)',
    titleHi: 'नागरिक द्वारा रिकॉर्ड किया गया असली वीडियो (सुरक्षित)',
    category: 'safe',
    deepfakeScore: 8,
    facialWarpScore: 6,
    blinkAnomaly: '14 blinks/min with natural eyelid closure cadence',
    cornealReflection: 'Consistent ambient specular highlights',
    lipSyncLatency: '0ms acoustic-visual alignment',
    summary: 'Natural video capture with organic camera sensor blur, dynamic focal depth, and consistent facial lighting.',
    summaryMr: 'नैसर्गिक मानवी व्हिडिओ. डोळ्यांची हालचाल आणि आवाजाशी ओठांची हालचाल तंतोतंत जुळते.',
    summaryHi: 'प्रामाणिक मानवीय वीडियो। आंखों की सामान्य हलचल और आवाज से होठों का स्वाभाविक तालमेल है।',
    wireframeColor: '#10b981'
  }
];

interface VideoForensicsProps {
  currentLang: Language;
}

export const VideoForensics: React.FC<VideoForensicsProps> = ({ currentLang }) => {
  const t = I18N[currentLang];
  const [selectedScenario, setSelectedScenario] = useState<VideoScenario>(VIDEO_SCENARIOS[0]);
  const [activeOverlay, setActiveOverlay] = useState<'mesh' | 'heatmap' | 'clean'>('mesh');

  const isDeepfake = selectedScenario.category === 'deepfake';

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="rounded-2xl premium-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-orange-400" />
              <h2 className="text-base sm:text-lg font-semibold text-white">
                Deepfake Video Inspection Lab
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Inspect video calls and clips for synthetic facial manipulation, edge warping, and lip-sync latency.
            </p>
          </div>
          <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-white/[0.08] text-zinc-400 self-start sm:self-auto">
            Offline Biometric Engine
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="mt-4">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
            Select Test Video Clip
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {VIDEO_SCENARIOS.map((sc) => {
              const active = selectedScenario.id === sc.id;
              const isDanger = sc.category === 'deepfake';
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenario(sc)}
                  className={`p-3 rounded-xl border text-left transition-colors flex items-start gap-2.5 ${
                    active
                      ? 'bg-zinc-800 border-zinc-500 text-white shadow-xs'
                      : 'bg-zinc-900/60 border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isDanger ? 'bg-red-400' : 'bg-emerald-400'}`} />
                  <div>
                    <div className="text-xs font-medium line-clamp-1">{sc.title}</div>
                    <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                      {isDanger ? 'Manipulated' : 'Authentic'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Forensic Viewport Deck */}
        <div className="mt-5 rounded-xl bg-zinc-950 border border-white/[0.08] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-zinc-200">Forensic Viewport</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-zinc-400">
                1080p • 30 FPS
              </span>
            </div>

            {/* Overlay selector */}
            <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-lg border border-white/[0.06]">
              {(['mesh', 'heatmap', 'clean'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveOverlay(mode)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeOverlay === mode
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {mode === 'mesh' ? 'Facial Mesh' : mode === 'heatmap' ? 'Artifacts' : 'Clean'}
                </button>
              ))}
            </div>
          </div>

          {/* Viewport Frame */}
          <div className="relative aspect-video max-h-72 w-full rounded-lg bg-zinc-900 border border-white/[0.06] overflow-hidden flex items-center justify-center">
            {/* Visual Subject simulation */}
            <div className="relative w-40 h-48 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center">
              {/* Eyes */}
              <div className="absolute top-16 left-8 w-4 h-2 rounded-full bg-zinc-400" />
              <div className="absolute top-16 right-8 w-4 h-2 rounded-full bg-zinc-400" />
              {/* Mouth */}
              <div className="absolute bottom-12 w-10 h-3 rounded-full bg-zinc-500" />

              {/* Forensic Overlays */}
              {activeOverlay === 'mesh' && (
                <div className="absolute inset-0 border-2 border-dashed rounded-full pointer-events-none opacity-60"
                  style={{ borderColor: selectedScenario.wireframeColor }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Scan className="w-24 h-24 stroke-[1]" style={{ color: selectedScenario.wireframeColor }} />
                  </div>
                </div>
              )}

              {activeOverlay === 'heatmap' && isDeepfake && (
                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md pointer-events-none" />
              )}
            </div>

            {/* Corner telemetry info */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-400 space-y-0.5 bg-black/60 px-2 py-1 rounded backdrop-blur-xs">
              <div>LATENCY: {selectedScenario.lipSyncLatency}</div>
              <div>WARP INDEX: {selectedScenario.facialWarpScore}/100</div>
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono px-2 py-1 rounded bg-black/60 text-zinc-300 backdrop-blur-xs">
              {isDeepfake ? 'FLAGGED: SYNTHETIC WARP' : 'VERIFIED: NATURAL BLINK'}
            </div>
          </div>
        </div>

        {/* Forensic Analysis Breakdown */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Findings</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${isDeepfake ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                {isDeepfake ? 'Deepfake Indicators Present' : 'Authentic Video Stream'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {currentLang === 'mr' ? selectedScenario.summaryMr : (currentLang === 'hi' ? selectedScenario.summaryHi : selectedScenario.summary)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/[0.06] space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block">Biometric Metrics</span>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400">Blink Rate</span>
                <span className="font-mono text-zinc-200">{selectedScenario.blinkAnomaly}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400">Pupil Reflection</span>
                <span className="font-mono text-zinc-200">{selectedScenario.cornealReflection}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Lip-Sync Latency</span>
                <span className="font-mono text-zinc-200">{selectedScenario.lipSyncLatency}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
