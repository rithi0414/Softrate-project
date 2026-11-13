import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link2, Check, Share2 } from 'lucide-react';

const ShareButtons = ({ title = '', url = '' }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5" /> Share:
      </span>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#000000] hover:text-white text-slate-600 flex items-center justify-center transition-colors"
      >
        <Twitter className="w-3.5 h-3.5" />
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#0A66C2] hover:text-white text-slate-600 flex items-center justify-center transition-colors"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-600 flex items-center justify-center transition-colors"
      >
        <Facebook className="w-3.5 h-3.5" />
      </a>

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        aria-label="Copy article link"
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          copied
            ? 'bg-emerald-500 text-white'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
        }`}
        title={copied ? 'Link copied!' : 'Copy link'}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

export default ShareButtons;
