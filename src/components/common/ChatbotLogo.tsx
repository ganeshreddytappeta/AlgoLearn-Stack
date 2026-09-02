import React from 'react';

interface ChatbotLogoProps {
  className?: string;
  size?: number | string;
  onClick?: () => void;
}

export const ChatbotLogo: React.FC<ChatbotLogoProps> = ({
  className = '',
  size = 56,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{ width: size, height: size }}
      role="button"
      aria-label="AlgoLearn AI Chatbot"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Main Circular Background Gradient */}
          <radialGradient id="botBgGrad" cx="50%" cy="40%" r="55%" fx="45%" fy="30%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#2563eb" />
            <stop offset="85%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#172554" />
          </radialGradient>

          {/* Ear / Headphone Interior Gradient */}
          <linearGradient id="earGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Book Bottom / Glow Gradient */}
          <linearGradient id="bookCoverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="35%" stopColor="#2563eb" />
            <stop offset="70%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>

          {/* Book Page Glow */}
          <linearGradient id="pageGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="80%" stopColor="#f0fdf4" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>

          {/* Subtle Robot Body Ambient Gradient */}
          <linearGradient id="bodyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
        </defs>

        {/* ── 1. Circular Backdrop ── */}
        <circle cx="50" cy="50" r="48" fill="url(#botBgGrad)" />
        <circle cx="50" cy="50" r="47" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />

        {/* ── 2. Antenna ── */}
        {/* Antenna Stem */}
        <rect x="47.5" y="22" width="5" height="10" rx="2.5" fill="#ffffff" />
        {/* Antenna Ball */}
        <circle cx="50" cy="18.5" r="5" fill="#ffffff" />
        <circle cx="50" cy="18.5" r="3.2" fill="#38bdf8" />

        {/* ── 3. Headphones / Ears ── */}
        {/* Left Headphone */}
        <rect x="19" y="44" width="7" height="16" rx="3.5" fill="#ffffff" />
        <rect x="20.5" y="46" width="4" height="12" rx="2" fill="url(#earGrad)" />

        {/* Right Headphone */}
        <rect x="74" y="44" width="7" height="16" rx="3.5" fill="#ffffff" />
        <rect x="75.5" y="46" width="4" height="12" rx="2" fill="url(#earGrad)" />

        {/* ── 4. Robot Head Casing (White) ── */}
        <rect x="24" y="29" width="52" height="42" rx="19" fill="url(#bodyGrad)" />

        {/* ── 5. Visor / Screen (Dark Blue) ── */}
        <rect x="29" y="34.5" width="42" height="31" rx="13" fill="#0b1739" />

        {/* ── 6. Visor Face Elements ── */}
        {/* Left Happy Eye (Thick Curved Arc) */}
        <path
          d="M 37 49.5 C 37 45.5 43 45.5 43 49.5"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right Happy Eye (Thick Curved Arc) */}
        <path
          d="M 57 49.5 C 57 45.5 63 45.5 63 49.5"
          stroke="#ffffff"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute Smile */}
        <path
          d="M 45 55.5 C 47.5 58.5 52.5 58.5 55 55.5"
          stroke="#38bdf8"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* ── 7. Open Book (Cover / Layered Base) ── */}
        {/* Lower colored book layer (Cyan to Purple glow) */}
        <path
          d="M 17 83.5 
             C 30 79 46 84 50 87 
             C 54 84 70 79 83 83.5 
             C 80 88 68 93.5 50 93.5 
             C 32 93.5 20 88 17 83.5 Z"
          fill="url(#bookCoverGrad)"
        />

        {/* Middle colored book spine fold */}
        <path
          d="M 18.5 79.5 
             C 32 75 46 80 50 83.5 
             C 54 80 68 75 81.5 79.5 
             C 77 84.5 64 88.5 50 88.5 
             C 36 88.5 23 84.5 18.5 79.5 Z"
          fill="#1e40af"
          opacity="0.8"
        />

        {/* ── 8. Open White Book Pages ── */}
        {/* Left Book Page */}
        <path
          d="M 20 72 
             C 32 70 44 75 49 79.5 
             L 49 84 
             C 44 80 32 75.5 19 77.5 
             Z"
          fill="url(#pageGrad)"
        />

        {/* Right Book Page */}
        <path
          d="M 80 72 
             C 68 70 56 75 51 79.5 
             L 51 84 
             C 56 80 68 75.5 81 77.5 
             Z"
          fill="url(#pageGrad)"
        />

        {/* Center Spine crease */}
        <line x1="50" y1="79" x2="50" y2="86" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
};
