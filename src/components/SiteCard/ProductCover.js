import React from "react";

function Frame({ children }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" aria-hidden>
      {children}
    </svg>
  );
}

const covers = {
  "rdk-x": (
    <Frame>
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={`t${i}`} x={28 + i * 12} y="28" width="7" height="10" rx="1" fill="#a8a29e" />
      ))}
      <rect x="22" y="38" width="116" height="86" rx="7" fill="#d6d3d1" />
      <rect x="28" y="44" width="104" height="74" rx="4" fill="#1c1917" />
      <rect x="38" y="54" width="42" height="32" rx="2" fill="#44403c" />
      <rect x="88" y="54" width="26" height="18" rx="2" fill="#57534e" />
      <rect x="88" y="76" width="16" height="16" rx="2" fill="#78716c" />
      <circle cx="118" cy="92" r="9" fill="currentColor" />
      <rect x="38" y="94" width="62" height="5" rx="1" fill="#a8a29e" />
      <rect x="38" y="104" width="44" height="5" rx="1" fill="#78716c" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={`b${i}`} x={28 + i * 12} y="124" width="7" height="10" rx="1" fill="#a8a29e" />
      ))}
    </Frame>
  ),
  "rdk-s": (
    <Frame>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={24 + i * 11} y="24" width="6" height="10" rx="1" fill="#a8a29e" />
      ))}
      <rect x="18" y="34" width="124" height="98" rx="8" fill="#e7e5e4" />
      <rect x="24" y="40" width="112" height="86" rx="5" fill="#0c0a09" />
      <rect x="36" y="52" width="54" height="40" rx="3" fill="#292524" />
      <rect x="98" y="52" width="26" height="22" rx="2" fill="#44403c" />
      <rect x="98" y="78" width="26" height="14" rx="2" fill="#57534e" />
      <circle cx="48" cy="108" r="7" fill="currentColor" />
      <circle cx="68" cy="108" r="7" fill="#78716c" />
      <rect x="86" y="104" width="32" height="9" rx="1" fill="#a8a29e" />
    </Frame>
  ),
  tros: (
    <Frame>
      <path d="M80 18v10" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="16" r="5" fill="currentColor" />
      <rect x="44" y="28" width="72" height="58" rx="16" fill="#1c1917" />
      <circle cx="66" cy="54" r="9" fill="#fafaf9" />
      <circle cx="94" cy="54" r="9" fill="#fafaf9" />
      <circle cx="66" cy="54" r="4" fill="currentColor" />
      <circle cx="94" cy="54" r="4" fill="currentColor" />
      <rect x="68" y="72" width="24" height="5" rx="2" fill="#a8a29e" />
      <rect x="52" y="86" width="56" height="44" rx="12" fill="#292524" />
      <rect x="38" y="100" width="14" height="32" rx="7" fill="#44403c" />
      <rect x="108" y="100" width="14" height="32" rx="7" fill="#44403c" />
    </Frame>
  ),
  "model-zoo": (
    <Frame>
      <path d="M80 22l48 26v52L80 126 32 100V48L80 22Z" fill="#1c1917" />
      <path d="M80 22l48 26-48 26L32 48 80 22Z" fill="#44403c" />
      <path d="M80 74v52" stroke="#a8a29e" strokeWidth="1.6" />
      <path d="M32 48l48 26 48-26" stroke="#a8a29e" strokeWidth="1.6" />
      <circle cx="80" cy="48" r="8" fill="currentColor" />
      <circle cx="52" cy="64" r="5" fill="#78716c" />
      <circle cx="108" cy="64" r="5" fill="#78716c" />
      <circle cx="80" cy="102" r="5" fill="#a8a29e" />
    </Frame>
  ),
  "s600-cases": (
    <Frame>
      <rect x="28" y="32" width="104" height="68" rx="10" fill="#1c1917" />
      <rect x="38" y="42" width="32" height="22" rx="4" fill="currentColor" />
      <rect x="76" y="42" width="46" height="22" rx="4" fill="#44403c" />
      <rect x="38" y="70" width="46" height="22" rx="4" fill="#57534e" />
      <rect x="90" y="70" width="32" height="22" rx="4" fill="#78716c" />
      <rect x="44" y="112" width="72" height="9" rx="4" fill="#d6d3d1" />
      <rect x="58" y="126" width="44" height="7" rx="3" fill="#e7e5e4" />
    </Frame>
  ),
  magicbox: (
    <Frame>
      <path d="M80 24l50 28v56L80 136 30 108V52L80 24Z" fill="#292524" />
      <path d="M80 24l50 28-50 28L30 52 80 24Z" fill="#44403c" />
      <path d="M80 80v56" stroke="#1c1917" strokeWidth="2" />
      <circle cx="66" cy="62" r="8" fill="#1c1917" />
      <circle cx="94" cy="62" r="8" fill="#1c1917" />
      <circle cx="66" cy="62" r="3.2" fill="currentColor" />
      <circle cx="94" cy="62" r="3.2" fill="currentColor" />
      <rect x="68" y="104" width="24" height="8" rx="2" fill="currentColor" />
    </Frame>
  ),
  "stereo-camera": (
    <Frame>
      <rect x="44" y="32" width="72" height="14" rx="4" fill="#292524" />
      <rect x="22" y="46" width="116" height="72" rx="14" fill="#1c1917" />
      <circle cx="56" cy="82" r="22" fill="#44403c" />
      <circle cx="104" cy="82" r="22" fill="#44403c" />
      <circle cx="56" cy="82" r="11" fill="#0c0a09" />
      <circle cx="104" cy="82" r="11" fill="#0c0a09" />
      <circle cx="51" cy="77" r="3.2" fill="#fafaf9" />
      <circle cx="99" cy="77" r="3.2" fill="#fafaf9" />
      <rect x="74" y="70" width="12" height="24" rx="3" fill="#57534e" />
    </Frame>
  ),
  bmi088: (
    <Frame>
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={`l${i}`} x="24" y={46 + i * 10} width="10" height="5" rx="1" fill="#a8a29e" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={`r${i}`} x="126" y={46 + i * 10} width="10" height="5" rx="1" fill="#a8a29e" />
      ))}
      <rect x="34" y="40" width="92" height="80" rx="8" fill="#e7e5e4" />
      <rect x="44" y="50" width="72" height="60" rx="4" fill="#1c1917" />
      <rect x="56" y="64" width="28" height="28" rx="3" fill="#44403c" />
      <rect x="90" y="64" width="16" height="16" rx="2" fill="currentColor" />
    </Frame>
  ),
  studio: (
    <Frame>
      <rect x="18" y="32" width="124" height="96" rx="10" fill="#1c1917" />
      <rect x="18" y="32" width="124" height="20" rx="10" fill="#292524" />
      <circle cx="34" cy="42" r="4" fill="currentColor" />
      <circle cx="46" cy="42" r="4" fill="#a8a29e" />
      <circle cx="58" cy="42" r="4" fill="#78716c" />
      <rect x="28" y="64" width="48" height="50" rx="4" fill="#44403c" />
      <rect x="84" y="64" width="46" height="22" rx="4" fill="#57534e" />
      <rect x="84" y="92" width="46" height="22" rx="4" fill="#78716c" />
    </Frame>
  ),
  xburn: (
    <Frame>
      <rect x="40" y="24" width="80" height="88" rx="10" fill="#1c1917" />
      <rect x="52" y="40" width="56" height="34" rx="4" fill="#44403c" />
      <rect x="62" y="50" width="36" height="8" rx="2" fill="currentColor" />
      <rect x="62" y="64" width="22" height="5" rx="1" fill="#a8a29e" />
      <rect x="68" y="112" width="24" height="20" rx="3" fill="#a8a29e" />
      <rect x="74" y="132" width="12" height="10" rx="1" fill="#78716c" />
    </Frame>
  ),
  "oe-s": (
    <Frame>
      <rect x="36" y="36" width="88" height="88" rx="10" fill="#1c1917" />
      <path d="M58 80h44M80 58v44" stroke="#a8a29e" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="80" cy="80" r="12" fill="currentColor" />
      <circle cx="58" cy="80" r="6" fill="#57534e" />
      <circle cx="102" cy="80" r="6" fill="#57534e" />
      <circle cx="80" cy="102" r="6" fill="#57534e" />
    </Frame>
  ),
  "oe-llm-s100": (
    <Frame>
      <rect x="32" y="34" width="96" height="92" rx="12" fill="#1c1917" />
      <rect x="46" y="52" width="68" height="10" rx="5" fill="#44403c" />
      <rect x="46" y="72" width="48" height="10" rx="5" fill="currentColor" />
      <rect x="46" y="92" width="58" height="10" rx="5" fill="#57534e" />
    </Frame>
  ),
  "oe-llm-s600": (
    <Frame>
      <rect x="28" y="30" width="104" height="100" rx="12" fill="#0c0a09" />
      <rect x="42" y="48" width="76" height="10" rx="5" fill="#44403c" />
      <rect x="42" y="66" width="62" height="10" rx="5" fill="currentColor" />
      <rect x="42" y="84" width="44" height="10" rx="5" fill="#a8a29e" />
      <rect x="42" y="102" width="54" height="10" rx="5" fill="#57534e" />
    </Frame>
  ),
  "oe-x5": (
    <Frame>
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={44 + i * 12} y="28" width="7" height="10" rx="1" fill="#a8a29e" />
      ))}
      <rect x="40" y="38" width="80" height="84" rx="8" fill="#1c1917" />
      <rect x="52" y="50" width="56" height="60" rx="4" fill="#292524" />
      <rect x="64" y="62" width="32" height="32" rx="3" fill="currentColor" />
    </Frame>
  ),
  "oe-x3": (
    <Frame>
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={46 + i * 11} y="32" width="7" height="10" rx="1" fill="#a8a29e" />
      ))}
      <rect x="44" y="42" width="72" height="76" rx="8" fill="#1c1917" />
      <rect x="56" y="54" width="48" height="52" rx="4" fill="#292524" />
      <rect x="68" y="66" width="24" height="24" rx="3" fill="currentColor" />
    </Frame>
  ),
  "x5-sdk": (
    <Frame>
      <rect x="22" y="36" width="60" height="88" rx="5" fill="#e7e5e4" />
      <rect x="30" y="48" width="44" height="7" rx="2" fill="#a8a29e" />
      <rect x="30" y="62" width="36" height="5" rx="1" fill="#d6d3d1" />
      <rect x="30" y="72" width="40" height="5" rx="1" fill="#d6d3d1" />
      <rect x="30" y="82" width="28" height="5" rx="1" fill="#d6d3d1" />
      <rect x="72" y="52" width="64" height="64" rx="8" fill="#1c1917" />
      <rect x="86" y="66" width="36" height="36" rx="4" fill="currentColor" />
    </Frame>
  ),
  notices: (
    <Frame>
      <rect x="42" y="28" width="68" height="88" rx="5" fill="#d6d3d1" transform="rotate(-8 76 72)" />
      <rect x="46" y="32" width="68" height="88" rx="5" fill="#e7e5e4" transform="rotate(7 80 76)" />
      <rect x="50" y="36" width="68" height="88" rx="5" fill="#fafaf9" stroke="#d6d3d1" />
      <rect x="62" y="56" width="44" height="6" rx="2" fill="currentColor" />
      <rect x="62" y="70" width="34" height="5" rx="2" fill="#d6d3d1" />
      <rect x="62" y="82" width="38" height="5" rx="2" fill="#e7e5e4" />
    </Frame>
  ),
};

export default function ProductCover({ name, className }) {
  return <div className={className}>{covers[name] || covers.notices}</div>;
}
