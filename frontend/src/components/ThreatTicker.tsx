import React from 'react';
import { AlertCircle, Radio } from 'lucide-react';
import { Language } from '../i18n';

interface ThreatTickerProps {
  currentLang: Language;
}

export const ThreatTicker: React.FC<ThreatTickerProps> = ({ currentLang }) => {
  const alerts = {
    en: [
      "MAHARASHTRA CYBER ADVISORY: Beware of fake Mumbai Police video calls claiming narcotics parcel under your Aadhaar.",
      "MSEDCL ALERT: Fraudulent electricity disconnection notices with malicious payment links circulating in Maharashtra.",
      "BANK SECURITY: No legitimate bank ever requests AnyDesk or TeamViewer installation for KYC updates.",
      "GOLDEN HOUR RULE: If financial fraud occurred, immediately dial 1930 to freeze fraudulent bank transfers."
    ],
    mr: [
      "महाराष्ट्र सायबर इशारा: आधार कार्डवर अमली पदार्थांचे पार्सल आल्याचा दावा करणाऱ्या खोट्या पोलीस व्हिडिओ कॉलपासून सावध रहा.",
      "महावितरण सूचना: वीज कापण्याच्या धमक्या देणाऱ्या बनावट मेसेजमधील कोणत्याही लिंकवर क्लिक करू नका.",
      "बँक सुरक्षा: कोणतीही बँक केवायसीसाठी AnyDesk किंवा TeamViewer ॲप डाउनलोड करण्यास सांगत नाही.",
      "गोल्डन अवर: पैसे कापले गेल्यास त्वरित १९३० या सायबर हेल्पलाईनवर संपर्क साधून पैसे गोठवण्याची विनंती करा."
    ],
    hi: [
      "महाराष्ट्र साइबर चेतावनी: आधार पर ड्रग्स पार्सल का झूठा दावा करने वाले फर्जी पुलिस वीडियो कॉल से सावधान रहें।",
      "बिजली बिल अलर्ट: बिजली कनेक्शन काटने की धमकी देने वाले फर्जी संदेशों में दिए गए नंबर या लिंक पर भरोसा न करें।",
      "बैंक सुरक्षा: कोई भी बैंक केवाईसी अपडेट के लिए AnyDesk या रिमोट एक्सेस ऐप डाउनलोड करने को नहीं कहता।",
      "गोल्डन ऑवर: वित्तीय धोखाधड़ी होने पर तुरंत 1930 पर कॉल करके संदिग्ध ट्रांजेक्शन फ्रीज करवाएं।"
    ]
  }[currentLang];

  const fullList = [...alerts, ...alerts];

  return (
    <div className="w-full bg-[#0a0d14]/90 border-b border-white/[0.06] overflow-hidden py-1.5 px-3 flex items-center gap-2.5 text-xs text-zinc-400">
      <div className="flex items-center gap-1.5 text-orange-400 font-semibold uppercase text-[10px] tracking-wider flex-shrink-0 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
        <Radio className="w-3 h-3 animate-pulse" />
        <span>Live Threat Feed</span>
      </div>

      <div className="overflow-hidden relative flex-1 mask-linear-fade">
        <div className="animate-marquee gap-8 items-center">
          {fullList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 flex-shrink-0">
              <span className="w-1 h-1 rounded-full bg-orange-400/80" />
              <span className="text-[11px] font-medium text-zinc-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
