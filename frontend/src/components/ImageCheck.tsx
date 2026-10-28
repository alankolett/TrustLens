import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2, AlertCircle, Cpu } from 'lucide-react';
import { Language, I18N } from '../i18n';
import { API_BASE_URL } from '../config';
import { VerdictCard, VerdictData } from './VerdictCard';
import { SafetyReport } from './SafetyReport';

interface ImageCheckProps {
  currentLang: Language;
}

interface ImageResponseData extends VerdictData {
  metadata?: {
    has_exif: boolean;
    suspicious_tags: string[];
    ai_dimension_match: boolean;
    dimensions: number[];
    format: string;
    mime_type: string;
    flags: string[];
  };
}

export const ImageCheck: React.FC<ImageCheckProps> = ({ currentLang }) => {
  const t = I18N[currentLang];
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verdictData, setVerdictData] = useState<ImageResponseData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    // 5 MB limit check
    if (file.size > 5 * 1024 * 1024) {
      setError(t.errorFileTooLarge);
      return;
    }

    // MIME type check
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
      setError(t.errorInvalidFile);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
    setVerdictData(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setVerdictData(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError(t.errorInvalidFile);
      return;
    }

    setLoading(true);
    setError(null);
    setVerdictData(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('language', currentLang);

    try {
      const response = await fetch(`${API_BASE_URL}/api/check-image`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.detail || t.errorGeneric);
      }

      const data: ImageResponseData = await response.json();
      setVerdictData(data);
    } catch (err: any) {
      console.error('Check image error:', err);
      setError(err.message || t.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
          {t.imageUploadTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-4">
          {t.imageUploadSubtitle}
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
          className="hidden"
        />

        {!previewUrl ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 hover:border-navy-900 bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-6 sm:p-10 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
          >
            <div className="w-14 h-14 rounded-full bg-navy-100 flex items-center justify-center text-navy-900">
              <UploadCloud className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-slate-800">
                {t.imageDragDrop}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {t.imageLimitNote}
              </p>
            </div>
            <button
              type="button"
              className="mt-2 px-4 py-2 rounded-xl bg-navy-900 text-white text-xs sm:text-sm font-bold shadow-xs hover:bg-navy-800"
            >
              {t.btnSelectImage}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900/5 max-h-72 flex items-center justify-center p-2">
              <img
                src={previewUrl}
                alt="Upload preview"
                className="max-h-68 rounded-lg object-contain shadow-xs"
              />
              <button
                onClick={handleClear}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-all shadow-md"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-slate-600 px-1">
              <span>{selectedFile?.name} ({(selectedFile?.size ? (selectedFile.size / 1024).toFixed(0) : 0)} KB)</span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-saffron-600 hover:text-saffron-700 font-bold"
              >
                {t.changeImage}
              </button>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.99] ${
                loading
                  ? 'bg-slate-400 text-white cursor-not-allowed'
                  : 'bg-navy-900 hover:bg-navy-800 text-white'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t.btnCheckingImage}</span>
                </>
              ) : (
                <>
                  <Cpu className="w-5 h-5 stroke-[2.2]" />
                  <span>{t.btnSelectImage}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Friendly Error Notice */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3 text-red-800 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Live Verdict & Forensic Metadata */}
      {verdictData && (
        <div className="space-y-6 animate-fadeIn">
          <VerdictCard verdictData={verdictData} currentLang={currentLang} />

          {/* Metadata Inspector Card */}
          {verdictData.metadata && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-500" />
                <span>EXIF & Dimension Inspection</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium text-slate-700">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Dimensions</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {verdictData.metadata.dimensions[0]} × {verdictData.metadata.dimensions[1]}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Format</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {verdictData.metadata.format}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">Camera EXIF</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {verdictData.metadata.has_exif ? 'Detected ✅' : 'Missing ⚠️'}
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-slate-500">AI Grid Match</div>
                  <div className="font-bold text-slate-900 mt-0.5">
                    {verdictData.metadata.ai_dimension_match ? 'Matched 🚨' : 'No'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(verdictData.verdict === 'red' || verdictData.verdict === 'amber') && (
            <SafetyReport
              verdictData={verdictData}
              originalText={`Image Upload: ${selectedFile?.name || 'Uploaded File'}`}
              currentLang={currentLang}
            />
          )}
        </div>
      )}
    </div>
  );
};
