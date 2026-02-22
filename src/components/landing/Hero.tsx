"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Sketch SVG Components — retro hand-drawn monoline style
// ---------------------------------------------------------------------------

const SketchFigureWriter = () => (
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

const SketchFigurePresenter = () => (
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

const SketchFigureThinking = () => (
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
    <line x1="62" y1="7" x2="65" y2="4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
    <line x1="64" y1="12" x2="68" y2="12" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
    <path d="M44 15 C42 18 40 20 40 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" strokeDasharray="2 2" opacity="0.4" />
    <path d="M26 28 C28 22 34 20 40 22 C44 24 46 28 44 33" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

const SketchDocument = () => (
  <svg width="70" height="85" viewBox="0 0 70 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M8 4 L52 4 L52 56 L64 68 L8 68 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.8" />
    <path d="M52 56 L64 56 L64 68 L52 56 Z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" opacity="0.6" />
    <line x1="16" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <line x1="16" y1="23" x2="48" y2="23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <line x1="16" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <line x1="16" y1="37" x2="46" y2="37" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <line x1="16" y1="44" x2="38" y2="44" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    <rect x="16" y="52" width="22" height="12" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.45" />
    <line x1="20" y1="64" x2="20" y2="58" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
    <line x1="25" y1="64" x2="25" y2="55" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
    <line x1="30" y1="64" x2="30" y2="60" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
    <line x1="35" y1="64" x2="35" y2="57" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.45" />
    <path d="M12 68 L12 72 L68 72 L68 8 L64 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.3" />
    <path d="M54 76 L55.2 79.6 L59 79.6 L56 81.8 L57.2 85.4 L54 83.2 L50.8 85.4 L52 81.8 L49 79.6 L52.8 79.6 Z" stroke="currentColor" strokeWidth="0.8" fill="none" strokeLinejoin="round" opacity="0.5" />
  </svg>
);

const SketchArrow = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M8 48 C10 32 20 16 38 10 C52 6 64 12 72 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
    <path d="M72 22 L68 14 M72 22 L64 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75" />
    <path d="M8 50 C12 34 22 18 40 12" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" fill="none" opacity="0.3" />
  </svg>
);

const SketchStar = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-amber)' }}>
    <path d="M24 4 L27.5 16 L40 16 L30 23.5 L33.5 36 L24 28.5 L14.5 36 L18 23.5 L8 16 L20.5 16 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.9" />
    <line x1="24" y1="0" x2="24" y2="3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="44" y1="20" x2="47" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="4" y1="20" x2="1" y2="20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const SketchFlame = () => (
  <svg width="44" height="66" viewBox="0 0 44 66" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M22 62 C10 50 4 36 12 24 C14 20 12 12 17 7 C18 14 22 16 24 12 C28 22 38 30 34 44 C32 52 28 58 22 62Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.85" />
    <path d="M22 56 C16 48 14 38 19 30 C21 34 23 32 25 28 C27 36 30 44 22 56Z" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="round" opacity="0.5" />
    <path d="M16 22 C14 18 15 12 18 10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
  </svg>
);

// ---------------------------------------------------------------------------
// Floating element wrapper
// ---------------------------------------------------------------------------

function FloatEl({
  children, x, y, delay = 0, amplitude = 12, duration = 5, rotate = true,
}: {
  children: React.ReactNode;
  x: string; y: string; delay?: number; amplitude?: number; duration?: number; rotate?: boolean;
}) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 3 }}
      animate={{ y: [0, -amplitude, 0], rotate: rotate ? [-2, 2, -2] : [0, 0, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  useTransform(scrollYProgress, [0, 1], [0, 120]);

  const headlines: Array<{ text: string; style: React.CSSProperties }> = [
    { text: "STOP WRITING", style: { color: 'var(--color-text)' } },
    { text: "DOCUMENTS.", style: { color: 'transparent', WebkitTextStroke: '2px var(--color-text)' } },
    { text: "START DESIGNING", style: { color: 'var(--color-accent)' } },
    { text: "CLARITY.", style: { color: 'var(--color-accent)', paddingLeft: '2rem' } },
  ];

  return (
    <section ref={ref} style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6rem 2rem 5rem',
      position: 'relative',
      overflow: 'hidden',
      background: '#0e0a06',
    }}>
      {/* Outer dot texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(214,58,26,0.12) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, #0e0a06 80%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Floating sketch figures */}
      <FloatEl x="-2%" y="18%" delay={0} amplitude={10} duration={6}><SketchFigureWriter /></FloatEl>
      <FloatEl x="0%" y="58%" delay={1.2} amplitude={14} duration={7}><SketchFigureThinking /></FloatEl>
      <FloatEl x="86%" y="12%" delay={0.4} amplitude={12} duration={5.5}><SketchFigurePresenter /></FloatEl>
      <FloatEl x="88%" y="54%" delay={1.8} amplitude={9} duration={6.5}><SketchDocument /></FloatEl>
      <FloatEl x="78%" y="44%" delay={0.8} amplitude={6} duration={4} rotate={false}><SketchArrow /></FloatEl>
      <FloatEl x="82%" y="80%" delay={2} amplitude={11} duration={5}><SketchStar /></FloatEl>
      <FloatEl x="6%" y="82%" delay={0.3} amplitude={13} duration={6}><SketchFlame /></FloatEl>

      {/* CENTERED INNER CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: '900px', width: '100%',
          background: 'rgba(245,237,224,0.03)',
          border: '1.5px solid rgba(214,58,26,0.35)',
          borderRadius: '8px',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem)',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Card grid paper texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(214,58,26,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(214,58,26,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none', zIndex: 0, borderRadius: '8px',
        }} />

        {/* Card top glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '70%', height: '240px',
          background: 'radial-gradient(ellipse, rgba(214,58,26,0.14) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0, filter: 'blur(30px)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.375rem 1rem',
              border: '1px solid rgba(214,58,26,0.5)',
              borderRadius: '2px', marginBottom: '2.5rem',
              background: 'rgba(214,58,26,0.08)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
              A VISUAL THINKING ENGINE
            </span>
          </motion.div>

          {/* 4-line headline */}
          <div style={{ marginBottom: '2.5rem' }}>
            {headlines.map((line, i) => (
              <div key={i} style={{ overflow: 'hidden' }}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3rem, 9vw, 7.5rem)',
                    fontWeight: 400, lineHeight: 1.0,
                    letterSpacing: '-0.01em', textTransform: 'uppercase',
                    margin: '0 0 0.05em',
                    ...line.style,
                  }}>
                    {line.text}
                  </h1>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: 'var(--color-text-2)',
              maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.7,
            }}
          >
            KALPANIC transforms boring procedures, product notes, and lessons into visually
            powerful playbooks your audience actually understands.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}
          >
            <Link href="/sign-up" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
              padding: '1rem 2.25rem',
              background: 'var(--color-accent)', color: '#fff', textDecoration: 'none',
              fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px',
              boxShadow: '4px 4px 0px rgba(214,58,26,0.4)',
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px rgba(214,58,26,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px rgba(214,58,26,0.4)';
            }}>
              Create Your Playbook
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
              padding: '1rem 2rem', background: 'transparent',
              color: 'var(--color-text-2)', border: '1px solid var(--color-border)',
              borderRadius: '2px', fontFamily: 'var(--font-body)', fontSize: '0.85rem',
              fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'border-color 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-text-2)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-2)';
            }}>
              See Example
            </button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              display: 'flex', justifyContent: 'center',
              gap: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap',
              paddingTop: '2.5rem',
              borderTop: '1px solid rgba(214,58,26,0.2)',
            }}
          >
            {[
              { num: '< 15 min', label: 'to first playbook' },
              { num: '5', label: 'Alaukik themes' },
              { num: '3×', label: 'more engagement' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                  color: i === 1 ? 'var(--color-accent)' : 'var(--color-text)',
                  letterSpacing: '0.02em', lineHeight: 1, marginBottom: '0.375rem',
                }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--color-text-3)', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
