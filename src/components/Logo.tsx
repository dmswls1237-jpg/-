import React from 'react';

interface LogoProps {
  className?: string;
  iconColor?: string;
  textColor?: string;
  goldColor?: string;
}

export default function Logo({ 
  className = "h-12 w-auto", 
  iconColor = "text-white", 
  textColor = "text-white",
  goldColor 
}: LogoProps) {
  const currentGoldColor = goldColor || "text-brand-gold";
  
  return (
    <svg 
      viewBox="0 0 220 220" 
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Emblem Group */}
      <g 
        className={iconColor} 
        stroke="currentColor" 
        strokeWidth="5" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Left Side: 율 (Yul) Box */}
        <rect x="20" y="15" width="80" height="120" rx="4" />
        
        {/* top circle 'ㅇ' inside '율' */}
        <circle cx="60" cy="48" r="19" />
        
        {/* 'ㅠ' / vowel divider at y=80 */}
        <line x1="20" y1="80" x2="100" y2="80" />
        {/* 'ㅠ' vertical ticks */}
        <line x1="45" y1="80" x2="45" y2="98" />
        <line x1="75" y1="80" x2="75" y2="98" />
        
        {/* 'ㄹ' consonant dividers at scale */}
        <line x1="20" y1="98" x2="100" y2="98" />
        {/* ㄹ inner labyrinth strokes */}
        <line x1="20" y1="114" x2="82" y2="114" />
        <line x1="38" y1="126" x2="100" y2="126" />

        {/* Right Side: 인 (In) Stroke & Curve */}
        {/* Top circle 'ㅇ' inside '인' */}
        <circle cx="148" cy="48" r="19" />
        
        {/* '인' vowel 'ㅣ' & consonant 'ㄴ' integrated loop */}
        <path d="M 183,15 L 183,105 A 35,35 0 0,1 148,135 L 110,135" />
      </g>

      {/* "Law & People" typography nested beautifully on right under circle */}
      <text 
        x="114" 
        y="110" 
        fontFamily="Georgia, 'Times New Roman', serif" 
        fontSize="10" 
        fontWeight="800" 
        fontStyle="italic"
        className={textColor}
        fill="currentColor"
        letterSpacing="-0.2"
      >
        Law <tspan className={currentGoldColor} fill="currentColor">&amp;</tspan> People
      </text>

      {/* Brand Label: 법무법인 율인 (Bottom center alignment) */}
      <text 
        x="110" 
        y="185" 
        fontFamily='"Noto Sans KR", sans-serif'
        fontWeight="900" 
        fontSize="25" 
        letterSpacing="1"
        className={textColor}
        fill="currentColor"
        textAnchor="middle"
      >
        법무법인 율인
      </text>
    </svg>
  );
}

