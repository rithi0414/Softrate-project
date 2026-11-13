import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2, Check } from 'lucide-react';
import { uploadService } from '../../api/uploadService';

const ImageUploader = ({ value = '', onChange, label = 'Featured Image' }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size must be less than 5MB');
      return;
    }

    setError('');
    setIsUploading(true);

    try {
      const res = await uploadService.uploadImage(file);
      if (res.success && res.url) {
        onChange(res.url);
      } else {
        setError(res.message || 'Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleApplyUrl = () => {
    if (customUrl.trim()) {
      onChange(customUrl.trim());
      setCustomUrl('');
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
        {label}
      </label>

      {/* Image Preview if available */}
      {value ? (
        <div className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50 max-h-60 group">
          <img
            src={value}
            alt="Upload preview"
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-zoho-red transition-colors shadow-md"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded text-[11px] text-white truncate max-w-[90%]">
            {value}
          </div>
        </div>
      ) : (
        /* Upload Box */
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-zoho-red transition-colors bg-white">
          <div className="flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-zoho-red flex items-center justify-center mb-3">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <UploadCloud className="w-6 h-6" />
              )}
            </div>
            <p className="text-sm font-semibold text-slate-800 mb-1">
              {isUploading ? 'Uploading Image...' : 'Click to upload or drag & drop'}
            </p>
            <p className="text-xs text-slate-400 mb-4">
              PNG, JPG, WEBP, or GIF up to 5MB
            </p>

            <label className="cursor-pointer px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors inline-block">
              <span>Choose Local File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      {/* Or paste direct image URL */}
      <div className="flex gap-2 pt-1">
        <input
          type="url"
          value={customUrl}
          onChange={(e) => setCustomUrl(e.target.value)}
          placeholder="Or paste external image URL (e.g. Unsplash)..."
          className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-zoho-red"
        />
        <button
          type="button"
          onClick={handleApplyUrl}
          disabled={!customUrl.trim()}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors"
        >
          Set URL
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
