"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  FloatEl,
  SketchFigureWriter,
  SketchDocument,
  SketchArrow,
  SketchStar,
  SketchFlame,
  SketchLightbulb,
  SketchCrown,
} from "./SketchElements";

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
      background: 'var(--color-bg)',
    }}>
      {/* Outer dot texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle, rgba(214,58,26,0.15) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, var(--color-bg) 80%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Floating sketch figures ── */}
      <FloatEl x="-2%" y="14%" delay={0} amplitude={10} duration={6}>
        <SketchFigureWriter />
      </FloatEl>
      <FloatEl x="5%" y="68%" delay={1.4} amplitude={9} duration={7}>
        <SketchLightbulb />
      </FloatEl>
      <FloatEl x="88%" y="54%" delay={1.8} amplitude={9} duration={6.5}>
        <SketchDocument />
      </FloatEl>
      <FloatEl x="79%" y="42%" delay={0.8} amplitude={6} duration={4} rotate={false}>
        <SketchArrow />
      </FloatEl>
      <FloatEl x="83%" y="78%" delay={2} amplitude={11} duration={5}>
        <SketchStar />
      </FloatEl>
      <FloatEl x="3%" y="84%" delay={0.3} amplitude={13} duration={6}>
        <SketchFlame />
      </FloatEl>
      <FloatEl x="90%" y="18%" delay={2.2} amplitude={7} duration={5.5}>
        <SketchCrown />
      </FloatEl>

      {/* ── Real statue images — clearly visible ── */}
      {/* GenZ torso — right side hero */}
      <FloatEl x="72%" y="0%" delay={0.4} amplitude={8} duration={7} rotate={false}>
        <img
          src="/roman-empire/rm324-element-boom-07a.jpg"
          alt=""
          width={240}
          style={{
            display: 'block',
            filter: 'drop-shadow(0 12px 28px rgba(80,40,0,0.2))',
            opacity: 0.95,
          }}
        />
      </FloatEl>
      {/* Goddess bust — left side */}
      <FloatEl x="-6%" y="42%" delay={1.0} amplitude={11} duration={6.5} rotate={false}>
        <img
          src="/roman-empire/rm324-element-baifernn-05.jpg"
          alt=""
          width={200}
          style={{
            display: 'block',
            filter: 'drop-shadow(0 8px 20px rgba(80,40,0,0.16))',
            opacity: 0.92,
          }}
        />
      </FloatEl>

      {/* CENTERED INNER CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: '900px', width: '100%',
          background: 'rgba(255,253,248,0.82)',
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
            linear-gradient(rgba(214,58,26,0.09) 1px, transparent 1px),
            linear-gradient(90deg, rgba(214,58,26,0.09) 1px, transparent 1px)
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

        {/* Roman profile — large, behind "START DESIGNING / CLARITY." */}
        <div style={{
          position: 'absolute',
          right: '-4%',
          bottom: '-8%',
          width: '52%',
          maxWidth: '420px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.22,
          mixBlendMode: 'multiply',
        }}>
          <img
            src="/roman-empire/rm324-element-baifernn-02.jpg"
            alt=""
            style={{ width: '100%', display: 'block' }}
          />
        </div>

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
                    fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
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
              fontSize: 'clamp(0.9rem, 2.2vw, 1.2rem)',
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
