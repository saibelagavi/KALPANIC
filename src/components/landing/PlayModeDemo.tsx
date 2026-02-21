"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const slides = [
  { step: 1, tag: "THE PROBLEM", title: "NOBODY READS YOUR DOCS.", body: "60% of documentation is never read past page 2. Your team has the answers — but no one can find them.", accent: "#d63a1a" },
  { step: 2, tag: "WHY IT HAPPENS", title: "WALLS OF TEXT KILL IDEAS.", body: "No visual hierarchy. No guided flow. Information without narrative is just noise nobody asked for.", accent: "#e8890a" },
  { step: 3, tag: "THE FIX", title: "EVERY IDEA BECOMES A JOURNEY.", body: "Structured. Beautiful. Navigable. Play Mode guides your audience step by step through your content.", accent: "#ff5c2a" },
  { step: 4, tag: "THE RESULT", title: "3× LONGER ENGAGEMENT.", body: "70%+ completion rate. Documentation people actually want to open. Your ideas finally land.", accent: "#d63a1a" },
];

export function PlayModeDemo() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  return (
    <section style={{ padding: '8rem 2rem', background: 'var(--color-bg-2)', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 700, marginBottom: '1rem' }}>
            Play Mode
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--color-text)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', margin: 0 }}>
            CONTENT AS<br /><span style={{ color: 'var(--color-accent)' }}>AN EXPERIENCE.</span>
          </h2>
        </motion.div>

        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
          {/* Chrome bar */}
          <div style={{ background: 'var(--color-bg-2)', padding: '0.875rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{
                  width: 28, height: 5, borderRadius: '1px',
                  background: i === current ? slide.accent : 'var(--color-border-2)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'background 0.2s ease',
                }} />
              ))}
            </div>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {current + 1} / {slides.length}
            </span>
          </div>

          {/* Slide */}
          <div style={{ padding: '5rem 4rem', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '0.18em', color: slide.accent, textTransform: 'uppercase' }}>
                    {String(slide.step).padStart(2, '0')} / {slide.tag}
                  </div>
                  <div style={{ flex: 1, height: '1px', background: slide.accent, opacity: 0.3 }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 5vw, 3rem)', color: 'var(--color-text)', letterSpacing: '0.02em', textTransform: 'uppercase', lineHeight: 1, margin: '0 0 1.25rem 0' }}>
                  {slide.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--color-text-2)', lineHeight: 1.7, maxWidth: '520px', margin: 0 }}>
                  {slide.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div style={{ padding: '1.25rem 4rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}
              style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-2)', cursor: current === 0 ? 'not-allowed' : 'pointer', opacity: current === 0 ? 0.4 : 1, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: '2px', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Prev
            </button>
            {current < slides.length - 1 ? (
              <button onClick={() => setCurrent(current + 1)}
                style={{ padding: '0.5rem 1.25rem', background: slide.accent, border: 'none', color: 'white', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: '0.375rem', boxShadow: `3px 3px 0 ${slide.accent}60` }}>
                Next
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            ) : (
              <a href="/sign-up" style={{ padding: '0.5rem 1.25rem', background: slide.accent, textDecoration: 'none', color: 'white', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px', fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', boxShadow: `3px 3px 0 ${slide.accent}60` }}>
                Build Yours Free →
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
