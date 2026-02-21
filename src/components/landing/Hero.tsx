"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// Sketch decorations — inline SVG icons in red-orange style
const SketchLaurel = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M40 50 C30 45 15 38 10 25 C8 18 12 10 20 12 C26 13 30 20 28 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
    <path d="M40 50 C50 45 65 38 70 25 C72 18 68 10 60 12 C54 13 50 20 52 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7"/>
    <path d="M25 20 C22 16 18 14 16 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
    <path d="M55 20 C58 16 62 14 64 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
    <circle cx="40" cy="52" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.8"/>
  </svg>
);

const SketchFlame = () => (
  <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent-2)' }}>
    <path d="M20 55 C10 45 5 32 12 22 C14 18 12 12 16 8 C17 14 20 16 22 12 C26 22 35 28 30 40 C28 46 24 52 20 55Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.8"/>
    <path d="M20 50 C15 43 13 35 18 28 C20 32 22 30 24 26 C26 33 28 40 20 50Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
  </svg>
);

const SketchStar = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-amber)' }}>
    <path d="M20 4 L23 15 L35 15 L25 22 L28 34 L20 27 L12 34 L15 22 L5 15 L17 15 Z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" opacity="0.9"/>
  </svg>
);

const SketchEye = () => (
  <svg width="60" height="35" viewBox="0 0 60 35" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--color-accent)' }}>
    <path d="M5 17 C15 5 45 5 55 17 C45 29 15 29 5 17Z" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7"/>
    <circle cx="30" cy="17" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.8"/>
    <circle cx="30" cy="17" r="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
  </svg>
);

// Floating decoration element
function FloatEl({ children, x, y, delay = 0, amplitude = 12, duration = 5 }: {
  children: React.ReactNode;
  x: string; y: string; delay?: number; amplitude?: number; duration?: number;
}) {
  return (
    <motion.div
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', zIndex: 1 }}
      animate={{ y: [0, -amplitude, 0], rotate: [-3, 3, -3] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const line1 = "STOP EXPLAINING.";
  const line2 = "START CAPTIVATING.";

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
      background: 'var(--color-bg)',
    }}>
      {/* Grid texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(214,58,26,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(214,58,26,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Radial vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(14,10,6,0.8) 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Bottom glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70%',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(214,58,26,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(40px)',
      }} />

      {/* Floating sketch decorations */}
      <FloatEl x="4%" y="12%" delay={0} amplitude={10}><SketchLaurel /></FloatEl>
      <FloatEl x="88%" y="8%" delay={1} amplitude={14}><SketchFlame /></FloatEl>
      <FloatEl x="92%" y="55%" delay={2} amplitude={8}><SketchStar /></FloatEl>
      <FloatEl x="2%" y="60%" delay={0.5} amplitude={12}><SketchEye /></FloatEl>
      <FloatEl x="78%" y="75%" delay={1.5} amplitude={10}><SketchLaurel /></FloatEl>
      <FloatEl x="8%" y="78%" delay={2.5} amplitude={9}><SketchFlame /></FloatEl>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', width: '100%', textAlign: 'center' }}>

        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.375rem 1rem',
            border: '1px solid var(--color-accent)',
            borderRadius: '2px',
            marginBottom: '3rem',
            background: 'rgba(214,58,26,0.08)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block' }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}>
            Early Access — Free to Start
          </span>
        </motion.div>

        {/* MAIN HEADLINE — line 1 */}
        <div style={{ marginBottom: '0.5rem', overflow: 'hidden' }}>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 11vw, 9rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              color: 'var(--color-text)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {line1}
          </motion.h1>
        </div>

        {/* MAIN HEADLINE — line 2 (red) */}
        <div style={{ marginBottom: '3rem', overflow: 'hidden' }}>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.5rem, 11vw, 9rem)',
              fontWeight: 400,
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              margin: 0,
              WebkitTextStroke: '1px var(--color-accent)',
            }}
          >
            {line2}
          </motion.h1>
        </div>

        {/* Sub — serif italic */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            color: 'var(--color-text-2)',
            maxWidth: '560px',
            margin: '0 auto 3rem',
            lineHeight: 1.65,
          }}
        >
          Paste your rough idea. Pick an aesthetic. Publish a playbook so beautiful,
          people forget it was ever a document.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '5rem' }}
        >
          <Link href="/sign-up" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '1rem 2.5rem',
            background: 'var(--color-accent)',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '2px',
            boxShadow: '4px 4px 0px var(--color-border)',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translate(-2px, -2px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '6px 6px 0px var(--color-border)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translate(0, 0)';
            (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 0px var(--color-border)';
          }}
          >
            Start for Free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '1rem 2rem',
            background: 'transparent',
            color: 'var(--color-text-2)',
            border: '1px solid var(--color-border)',
            borderRadius: '2px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'border-color 0.15s ease, color 0.15s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-text-2)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-2)';
          }}
          >
            Watch Demo
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            paddingTop: '3rem',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {[
            { num: '< 15min', label: 'to first playbook' },
            { num: '5', label: 'Alaukik themes' },
            { num: '3×', label: 'more engagement' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                color: i === 1 ? 'var(--color-accent)' : 'var(--color-text)',
                letterSpacing: '0.02em',
                lineHeight: 1,
                marginBottom: '0.375rem',
              }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--color-text-3)', textTransform: 'uppercase' }}>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
