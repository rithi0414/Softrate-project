import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Unique Softrate Geometric Tech Logo
 * Represents:
 * - Interlocking geometric 'S' ribbons signifying Software velocity and compute Rate
 * - Gradient flowing from Electric Indigo to Vivid Cyan with glowing nexus points
 */
export const LogoIcon = ({ className = 'w-9 h-9', idPrefix = 'sr' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}
  >
    <defs>
      {/* Primary Cyber Indigo to Cyan Gradient */}
      <linearGradient id={`${idPrefix}-grad1`} x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>

      {/* Secondary Accent Gradient */}
      <linearGradient id={`${idPrefix}-grad2`} x1="40" y1="8" x2="8" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06B6D4" />
        <stop offset="50%" stopColor="#818CF8" />
        <stop offset="100%" stopColor="#4338CA" />
      </linearGradient>

      {/* Subtle Glow Filter */}
      <filter id={`${idPrefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3B82F6" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Modern Hexagonal Shield Base */}
    <rect
      x="3"
      y="3"
      width="42"
      height="42"
      rx="12"
      fill="#0F172A"
      stroke={`url(#${idPrefix}-grad1)`}
      strokeWidth="1.5"
    />

    {/* Upper Geometric Arc of the 'S' */}
    <path
      d="M33 14H19C15.6863 14 13 16.6863 13 20C13 23.3137 15.6863 26 19 26H29C32.3137 26 35 28.6863 35 32C35 35.3137 32.3137 38 29 38H15"
      stroke={`url(#${idPrefix}-grad1)`}
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter={`url(#${idPrefix}-glow)`}
    />

    {/* Intersecting Pulse Accent (Rate Vector) */}
    <path
      d="M20 18L28 14L32 18"
      stroke="#38BDF8"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 30L20 34L16 30"
      stroke="#818CF8"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Illuminated Core Nodes */}
    <circle cx="33" cy="14" r="2.5" fill="#38BDF8" />
    <circle cx="15" cy="38" r="2.5" fill="#A855F7" />
    <circle cx="24" cy="26" r="2" fill="#FFFFFF" />
  </svg>
);

const Logo = ({
  size = 'md',
  variant = 'light', // 'light' (for light headers) or 'dark' (for dark sidebars/footers)
  showSubtitle = true,
  to = '/'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl'
  };

  const isDark = variant === 'dark';

  const content = (
    <div className="flex items-center gap-3 flex-shrink-0 group">
      <LogoIcon className={iconSizes[size] || iconSizes.md} />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`${titleSizes[size] || titleSizes.md} font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Soft<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">rate</span>
          </span>
          <span className="text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
            Tech
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[10px] font-semibold tracking-wider uppercase mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Engineering & Architecture Labs
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
