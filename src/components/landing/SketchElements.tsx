"use client";

import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Shared Alaukik Sketch SVGs — retro monoline style
// Used across landing page sections for ambient decoration
// ---------------------------------------------------------------------------

export const SketchFigureWriter = () => (
  <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <ellipse cx="40" cy="14" rx="10" ry="11" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.85" />
    <line x1="40" y1="25" x2="40" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M28 32 C26 42 25 52 26 60 L54 60 C55 52 54 42 52 32 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.8" />
    <path d="M28 38 C20 42 14 46 10 54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M52 38 C60 40 66 44 68 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M66 48 L72 56 M68 50 L63 58" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
    <path d="M30 60 C28 68 26 74 24 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M50 60 C52 68 54 74 56 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M22 80 C20 82 18 83 16 82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M56 80 C58 82 60 83 62 82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M10 56 L14 72 L38 70 L34 54 Z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.6" />
    <line x1="16" y1="61" x2="30" y2="60" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="17" y1="65" x2="32" y2="64" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="18" y1="69" x2="33" y2="68" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <path d="M30 10 C32 5 38 3 44 5 C48 7 50 12 48 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

export const SketchFigurePresenter = () => (
  <svg width="90" height="110" viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <ellipse cx="30" cy="14" rx="10" ry="11" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.85" />
    <line x1="30" y1="25" x2="30" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M18 33 L18 68 L42 68 L42 33 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.8" />
    <path d="M18 40 C12 46 10 52 10 58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M42 38 C52 32 62 26 72 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
    <line x1="72" y1="20" x2="79" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
    <path d="M24 68 L22 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M36 68 L38 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M18 90 L26 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <path d="M36 90 L44 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <rect x="56" y="8" width="30" height="22" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.65" />
    <line x1="71" y1="30" x2="71" y2="38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    <line x1="60" y1="14" x2="82" y2="14" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="60" y1="18" x2="78" y2="18" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <line x1="60" y1="22" x2="80" y2="22" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5" />
    <path d="M20 10 C22 5 28 3 34 5 C38 7 40 12 38 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

export const SketchFigureThinking = () => (
  <svg width="80" height="110" viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <ellipse cx="38" cy="32" rx="12" ry="13" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.85" />
    <line x1="38" y1="45" x2="38" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M24 52 L24 84 L52 84 L52 52 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.8" />
    <path d="M24 60 C16 60 12 58 10 56 C10 56 14 52 18 54 C22 56 24 62 28 64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M26 62 C30 66 34 66 36 64" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
    <path d="M52 60 C60 64 64 70 62 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
    <path d="M30 84 L28 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M46 84 L48 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M24 100 L32 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <path d="M44 100 L52 100" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <ellipse cx="52" cy="10" rx="8" ry="9" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.7" />
    <path d="M48 19 L48 23 L56 23 L56 19" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
    <line x1="52" y1="23" x2="52" y2="26" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <path d="M49 12 C50 10 52 10 53 12 C54 14 52 15 52 17" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />
    <path d="M44 15 C42 18 40 20 40 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" strokeDasharray="2 2" opacity="0.4" />
    <path d="M26 28 C28 22 34 20 40 22 C44 24 46 28 44 33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

export const SketchDocument = () => (
  <svg width="70" height="85" viewBox="0 0 70 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M8 4 L52 4 L52 56 L64 68 L8 68 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.8" />
    <path d="M52 56 L64 56 L64 68 L52 56 Z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.6" />
    <line x1="16" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <line x1="16" y1="23" x2="48" y2="23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <line x1="16" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <line x1="16" y1="37" x2="46" y2="37" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <line x1="16" y1="44" x2="38" y2="44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <rect x="16" y="52" width="22" height="12" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45" />
  </svg>
);

export const SketchArrow = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M8 48 C10 32 20 16 38 10 C52 6 64 12 72 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
    <path d="M72 22 L68 14 M72 22 L64 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
    <path d="M8 50 C12 34 22 18 40 12" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" fill="none" opacity="0.3" />
  </svg>
);

export const SketchStar = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-amber)' }}>
    <path d="M24 4 L27.5 16 L40 16 L30 23.5 L33.5 36 L24 28.5 L14.5 36 L18 23.5 L8 16 L20.5 16 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.9" />
    <line x1="24" y1="0" x2="24" y2="3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="44" y1="20" x2="47" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="4" y1="20" x2="1" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

export const SketchFlame = () => (
  <svg width="44" height="66" viewBox="0 0 44 66" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M22 62 C10 50 4 36 12 24 C14 20 12 12 17 7 C18 14 22 16 24 12 C28 22 38 30 34 44 C32 52 28 58 22 62Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.85" />
    <path d="M22 56 C16 48 14 38 19 30 C21 34 23 32 25 28 C27 36 30 44 22 56Z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" opacity="0.5" />
    <path d="M16 22 C14 18 15 12 18 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
  </svg>
);

export const SketchEye = () => (
  <svg width="60" height="36" viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M4 18 C10 6 20 2 30 2 C40 2 50 6 56 18 C50 30 40 34 30 34 C20 34 10 30 4 18Z" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.8" />
    <circle cx="30" cy="18" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.85" />
    <circle cx="30" cy="18" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
    <path d="M8 14 C6 10 4 6 5 2" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />
  </svg>
);

export const SketchLightbulb = () => (
  <svg width="52" height="72" viewBox="0 0 52 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-amber)' }}>
    <path d="M26 6 C14 6 6 14 6 24 C6 32 10 38 18 42 L18 54 L34 54 L34 42 C42 38 46 32 46 24 C46 14 38 6 26 6Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.85" />
    <line x1="19" y1="58" x2="33" y2="58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <line x1="21" y1="63" x2="31" y2="63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="24" y1="68" x2="28" y2="68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="26" y1="0" x2="26" y2="3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="46" y1="8" x2="48" y2="6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    <line x1="6" y1="8" x2="4" y2="6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
    <path d="M22 22 C22 18 26 16 26 22 C26 26 22 28 22 32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55" />
  </svg>
);

export const SketchQuill = () => (
  <svg width="64" height="80" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M58 4 C44 8 28 20 16 38 C10 48 8 58 10 66" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.85" />
    <path d="M10 66 L14 58 M10 66 L18 64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.85" />
    <path d="M58 4 C52 16 44 28 34 38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
    <path d="M58 4 C50 6 42 12 34 22" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.35" />
    <path d="M10 70 L42 72 L46 76 L8 76 Z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" opacity="0.5" />
    <line x1="14" y1="73" x2="40" y2="73" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export const SketchCrown = () => (
  <svg width="64" height="50" viewBox="0 0 64 50" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-amber)' }}>
    <path d="M6 42 L10 18 L22 30 L32 8 L42 30 L54 18 L58 42 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.85" />
    <line x1="6" y1="44" x2="58" y2="44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <circle cx="32" cy="8" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />
    <circle cx="10" cy="18" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.55" />
    <circle cx="54" cy="18" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.55" />
  </svg>
);

// ---------------------------------------------------------------------------
// Floating element wrapper — animates with y-bounce
// ---------------------------------------------------------------------------

export function FloatEl({
  children,
  x,
  y,
  delay = 0,
  amplitude = 12,
  duration = 5,
  rotate = true,
  className,
}: {
  children: React.ReactNode;
  x: string;
  y: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
  rotate?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={`sketch-float${className ? ` ${className}` : ''}`}
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 3 }}
      animate={{ y: [0, -amplitude, 0], rotate: rotate ? [-2, 2, -2] : [0, 0, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
