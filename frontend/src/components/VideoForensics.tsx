import React, { useState } from 'react';
import { Video, Eye, Scan, AlertTriangle, ShieldCheck, Layers, Sparkles } from 'lucide-react';
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
    title: 'Fake Mumbai Police Cyber Cell Video Call (Digital Arrest)',
    titleMr: 'मुंबई पोलीस सायबर सेलचा बनावट व्हिडिओ कॉल (डिजिटल अरेस्ट)',
    titleHi: 'मुंबई पुलिस साइबर सेल का फर्जी वीडियो कॉल (डिजिटल अरेस्ट)',
    category: 'deepfake',
    deepfakeScore: 92,
    facialWarpScore: 89,
    blinkAnomaly: 'Abnormal: 3.2 blinks/min (70% below human average)',
    cornealReflection: 'Mismatched ambient illumination vs room background',
    lipSyncLatency: '140ms asynchronous phonetic phase gap',
    summary: 'Synthetic face swap grafted onto police uniform footage. Severe edge pixel warping along jawline and uniform collar boundaries.',
    summaryMr: 'खोट्या पोलीस गणवेशावर AI चेहऱ्याचा वापर. मानेभोवती आणि गणवेशाच्या कॉलरवर स्पष्ट डिजिटल फेरफार आढळला.',
    summaryHi: 'पुलिस वर्दी पर AI द्वारा निर्मित फर्जी चेहरा लगाया गया है। कॉलर और जबड़े के किनारों पर स्पष्ट पिक्सेल हेरफेर है।',
    wireframeColor: '#ef4444'
  },
  {
    id: 'vid_celebrity_crypto',
    title: 'Deepfake Industrialist / Politician Crypto Scheme',
    titleMr: 'प्रसिद्ध उद्योगपतीचा खोटा AI व्हिडिओ (शेअर मार्केट फसवणूक)',
    titleHi: 'मशहूर उद्योगपति का फर्जी AI वीडियो (शेयर बाजार फ्रॉड)',
    category: 'deepfake',
    deepfakeScore: 88,
    facialWarpScore: 84,
    blinkAnomaly: 'Synthetic micro-gaze freezing detected',
    cornealReflection: 'Identical static reflection in both pupils',
    lipSyncLatency: 'Mouth boundary distortion during vowel transitions',
    summary: 'Generative video diffusion model animating a public figure to advertise a high-yield investment scheme. Unnatural teeth texture.',
    summaryMr: 'उद्योगपतीच्या चेहऱ्याचा गैरवापर करून जनतेला पैसे गुंतवण्याचे खोटे आमिष दाखवणारा AI व्हिडिओ.',
    summaryHi: 'उद्योगपति के चेहरे का फर्जी इस्तेमाल कर जनता को पैसे दोगुना करने का लालच देने वाला AI वीडियो।',
    wireframeColor: '#f97316'
  },
  {
    id: 'vid_authentic_citizen',
    title: 'Authentic Smartphone Video Message (Safe)',
    titleMr: 'नागरिकाने स्वतः रेकॉर्ड केलेला अस्सल व्हिडिओ (सुरक्षित)',
    titleHi: 'नागरिक द्वारा रिकॉर्ड किया गया असली वीडियो (सुरक्षित)',
    category: 'safe',
    deepfakeScore: 8,
    facialWarpScore: 6,
    blinkAnomaly: 'Normal: 14 blinks/min with natural eye lid closure',
    cornealReflection: 'Consistent geometric specular highlights',
    lipSyncLatency: '0ms perfect acoustic-visual alignment',
    summary: 'Natural biological video recording with authentic optical sensor blur, dynamic focal depth, and consistent facial lighting vectors.',
    summaryMr: 'नैसर्गिक मानवी व्हिडिओ. डोळ्यांची हालचाल आणि आवाजाशी ओठांची हालचाल तंतोतंत जुळते.',
    summaryHi: 'प्रामाणिक मानवीय वीडियो। आंखों की सामान्य हलचल और आवाज से होठों का स्वाभाविक तालमेल मौजूद है।',
    wireframeColor: '#22c55e'
  }
];

interface VideoForensicsProps {
  currentLang: Language;
}

export const VideoForensics: React.FC<VideoForensicsProps> = ({ currentLang }) => {
  const t = I18N[currentLang];
  const [selectedScenario, setSelectedScenario] = useState<VideoScenario>(VIDEO_SCENARIOS[0]);
  const [activeOverlay, setActiveOverlay] = useState<'mesh' | 'heatmap' | 'gaze'>('mesh');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 border border-slate-800 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500/20 border border-saffron-500/40 text-saffron-400 text-xs font-bold uppercase tracking-wider">
              <Scan className="w-3.5 h-3.5 text-saffron-400 animate-pulse" />
              <span>Offline Video Biometric Lab</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Deepfake Video & Digital Arrest Inspector
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-medium">
              Detect synthetic face-swapping, corneal reflection mismatch, and abnormal blinking rates in suspicious video calls.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pipeline State</div>
            <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Real-Time Frame Biometrics
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="space-y-2.5">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Select Forensic Video Scenario:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VIDEO_SCENARIOS.map((scenario) => {
            const isSelected = selectedScenario.id === scenario.id;
            const isFake = scenario.category === 'deepfake';
            return (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-slate-800/90 border-saffron-500 shadow-lg ring-1 ring-saffron-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    isFake ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {isFake ? '🚨 Deepfake Risk' : '✅ Authentic Video'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">
                    {scenario.deepfakeScore}% Risk
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

      {/* Interactive Video Viewfinder Deck */}
      <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl space-y-6">
        {/* Viewfinder Canvas */}
        <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden aspect-video sm:aspect-21/9 flex items-center justify-center">
          {/* Simulated Police / Target Frame Graphic */}
          <div className="absolute inset-0 flex items-center justify-center opacity-80">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              {/* Background Office / Grid */}
              <rect width="800" height="400" fill="#090d16" />
              <line x1="0" y1="200" x2="800" y2="200" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4" />
              <line x1="400" y1="0" x2="400" y2="400" stroke="#1e293b" stroke-width="1" stroke-dasharray="4,4" />

              {/* Head Silhouette */}
              <ellipse cx="400" cy="180" rx="90" ry="110" fill="#1e293b" />
              <path d="M 270 380 Q 400 300 530 380 L 530 400 L 270 400 Z" fill="#0f172a" stroke="#334155" stroke-width="2" />

              {/* Police Uniform Collar / Badge Simulation if scam */}
              {selectedScenario.category === 'deepfake' && (
                <>
                  <polygon points="370,270 430,270 400,320" fill="#dc2626" opacity="0.7" />
                  <rect x="290" y="320" width="40" height="20" fill="#f59e0b" rx="2" />
                </>
              )}

              {/* Overlay: Wireframe Facial Mesh */}
              {activeOverlay === 'mesh' && (
                <g stroke={selectedScenario.wireframeColor} stroke-width="1.5" fill="none" opacity="0.85">
                  <ellipse cx="400" cy="180" rx="80" ry="100" />
                  <path d="M 340 160 Q 400 170 460 160" />
                  <path d="M 350 200 Q 400 230 450 200" />
                  <circle cx="360" cy="160" r="14" />
                  <circle cx="440" cy="160" r="14" />
                  <line x1="400" y1="140" x2="400" y2="210" />
                  <polygon points="390,210 410,210 400,225" />
                  <path d="M 370 240 Q 400 260 430 240" />
                </g>
              )}

              {/* Overlay: Heatmap Anomaly */}
              {activeOverlay === 'heatmap' && (
                <g opacity="0.6">
                  <circle cx="400" cy="180" r="85" fill="url(#heatGrad)" />
                  <defs>
                    <radialGradient id="heatGrad">
                      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.8" />
                      <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.5" />
                      <stop offset="100%" stop-color="#10b981" stop-opacity="0.0" />
                    </radialGradient>
                  </defs>
                </g>
              )}

              {/* Overlay: Gaze Consistency */}
              {activeOverlay === 'gaze' && (
                <g stroke="#38bdf8" stroke-width="2" fill="none">
                  <line x1="360" y1="160" x2="310" y2="130" stroke-dasharray="3,3" />
                  <line x1="440" y1="160" x2="490" y2="130" stroke-dasharray="3,3" />
                  <circle cx="360" cy="160" r="4" fill="#38bdf8" />
                  <circle cx="440" cy="160" r="4" fill="#38bdf8" />
                </g>
              )}

              {/* Viewfinder Target Reticle */}
              <circle cx="400" cy="180" r="130" stroke="#f97316" stroke-width="1.5" stroke-dasharray="10,6" fill="none" opacity="0.7" />
              <path d="M 380 180 L 420 180 M 400 160 L 400 200" stroke="#f97316" stroke-width="2" />
            </svg>
          </div>

          {/* Forensic HUD Overlay Toggles */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <button
              onClick={() => setActiveOverlay('mesh')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeOverlay === 'mesh' ? 'bg-saffron-500 text-white shadow-md' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Mesh</span>
            </button>
            <button
              onClick={() => setActiveOverlay('heatmap')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeOverlay === 'heatmap' ? 'bg-saffron-500 text-white shadow-md' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Heatmap</span>
            </button>
            <button
              onClick={() => setActiveOverlay('gaze')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                activeOverlay === 'gaze' ? 'bg-saffron-500 text-white shadow-md' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Gaze</span>
            </button>
          </div>

          {/* Right Top Status HUD */}
          <div className="absolute top-3 right-3 bg-slate-950/90 border border-slate-800 px-3 py-1.5 rounded-xl text-right font-mono text-xs z-10">
            <span className="text-slate-400">Biometric Anomaly:</span>{' '}
            <span className={`font-black ${selectedScenario.deepfakeScore > 50 ? 'text-red-400' : 'text-emerald-400'}`}>
              {selectedScenario.deepfakeScore}%
            </span>
          </div>
        </div>

        {/* Forensic Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Blinking Frequency Metric</div>
            <div className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">
              {selectedScenario.blinkAnomaly}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Corneal Specular Reflection</div>
            <div className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">
              {selectedScenario.cornealReflection}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-slate-400 text-xs font-medium">Lip-Sync Boundary Latency</div>
            <div className="text-xs font-bold text-slate-200 mt-1 line-clamp-1">
              {selectedScenario.lipSyncLatency}
            </div>
          </div>
        </div>

        {/* Finding Box */}
        <div className={`p-4 rounded-xl border ${
          selectedScenario.category === 'deepfake'
            ? 'bg-red-950/30 border-red-500/40 text-red-200'
            : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            {selectedScenario.category === 'deepfake' ? (
              <>
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span>Forensic Verdict: Deepfake Synthetic Video Anomaly Identified</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Forensic Verdict: Biological Video Dynamics Authenticated</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            {currentLang === 'mr' ? selectedScenario.summaryMr : (currentLang === 'hi' ? selectedScenario.summaryHi : selectedScenario.summary)}
          </p>
        </div>
      </div>
    </div>
  );
};
