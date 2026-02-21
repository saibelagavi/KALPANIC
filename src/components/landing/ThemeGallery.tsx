"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const themes = [
  { id: "imperium", name: "IMPERIUM", tagline: "Dark · Brutal · Roman", bg: "#0e0a06", surface: "#1a1108", accent: "#d63a1a", text: "#f5ede0", textMuted: "#c8a882", border: "#3d2510", tag: "Default" },
  { id: "obsidian", name: "OBSIDIAN", tagline: "Dark · Editorial · Luxury", bg: "#0a0a0f", surface: "#16161f", accent: "#7c6af5", text: "#f0f0f8", textMuted: "#a0a0c0", border: "#2a2a3a", tag: "Classic" },
  { id: "aurora", name: "AURORA", tagline: "Sci-fi · Vivid · Electric", bg: "#050a12", surface: "#0c1828", accent: "#00d4ff", text: "#e8f4ff", textMuted: "#8ab4d4", border: "#1e3450", tag: "Tech" },
  { id: "ivory", name: "IVORY", tagline: "Light · Print · Refined", bg: "#faf9f6", surface: "#fff", accent: "#2d1b69", text: "#1a1814", textMuted: "#5a5650", border: "#ddd9d0", tag: "Editorial" },
  { id: "ember", name: "EMBER", tagline: "Warm · Bold · Founder", bg: "#0f0a08", surface: "#1c1408", accent: "#ff6b20", text: "#f8f0e8", textMuted: "#c0a890", border: "#3a2818", tag: "Founder" },
];

function ThemePreview({ theme }: { theme: typeof themes[0] }) {
  return (
    <div style={{ background: theme.bg, height: '100%', borderRadius: '4px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
      <div style={{ background: theme.surface, padding: '0.875rem 1rem', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: "'Anton', sans-serif", fontSize: '0.9rem', color: theme.text, letterSpacing: '0.08em' }}>KALPANIC</div>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          {[...Array(3)].map((_, i) => <div key={i} style={{ width: 22, height: 4, borderRadius: '1px', background: theme.border }} />)}
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ height: '1rem', background: theme.accent, borderRadius: '2px', width: '60%', marginBottom: '0.5rem', opacity: 0.85 }} />
        <div style={{ height: '0.5rem', background: theme.border, borderRadius: '1px', width: '40%', marginBottom: '1.5rem' }} />
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderLeft: `3px solid ${theme.accent}`, padding: '0.625rem 0.875rem', marginBottom: '0.5rem', borderRadius: '2px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: theme.accent, flexShrink: 0 }} />
            <div style={{ height: '0.45rem', background: theme.textMuted, borderRadius: '1px', width: `${65 - i * 12}%`, opacity: 0.35 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ThemeGallery() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % themes.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: '8rem 2rem', background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '5rem' }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 700, marginBottom: '1rem' }}>
            Alaukik Themes
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--color-text)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', margin: 0 }}>
            FIVE WORLDS.<br />
            <span style={{ color: 'var(--color-accent)' }}>ONE CLICK TO INHABIT.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {themes.map((t, i) => (
              <motion.button
                key={t.id}
                onClick={() => setActive(i)}
                whileHover={{ x: 4 }}
                style={{
                  padding: '1rem 1.25rem',
                  background: active === i ? 'var(--color-surface)' : 'transparent',
                  border: `1px solid ${active === i ? t.accent + '60' : 'transparent'}`,
                  borderLeft: `3px solid ${active === i ? t.accent : 'transparent'}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.875rem',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '1px', background: t.accent, flexShrink: 0, boxShadow: active === i ? `0 0 8px ${t.accent}80` : 'none' }} />
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--color-text)', letterSpacing: '0.06em', marginBottom: '0.1rem' }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-text-3)' }}>{t.tagline}</div>
                </div>
                {active === i && (
                  <span style={{ marginLeft: 'auto', fontSize: '0.6rem', background: t.accent + '20', color: t.accent, border: `1px solid ${t.accent}40`, borderRadius: '2px', padding: '0.2rem 0.5rem', fontWeight: 700, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                    {t.tag}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          <div style={{ height: '400px', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%' }}
              >
                <ThemePreview theme={themes[active]} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
