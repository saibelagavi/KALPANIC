'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Block, DataRow } from '@/stores/editorStore';

/* ── Theme tokens (same as Canvas.tsx) ──────────────────── */
const THEME_TOKENS: Record<string, Record<string, string>> = {
  Obsidian: { '--ct-bg': '#13131f', '--ct-surface': '#1e1e30', '--ct-accent': '#7c6af5', '--ct-text': '#e4e4f0', '--ct-text2': '#7878a0', '--ct-border': '#2e2e4a' },
  Aurora:   { '--ct-bg': '#091020', '--ct-surface': '#0d1a30', '--ct-accent': '#34d4a0', '--ct-text': '#d0e8f0', '--ct-text2': '#5888a0', '--ct-border': '#1a3040' },
  Ivory:    { '--ct-bg': '#faf6f0', '--ct-surface': '#ffffff', '--ct-accent': '#c17a3a', '--ct-text': '#1a0d05', '--ct-text2': '#6a5040', '--ct-border': '#e8d8c0' },
  Ember:    { '--ct-bg': '#1c0800', '--ct-surface': '#2c1200', '--ct-accent': '#e85a0c', '--ct-text': '#f8e0c8', '--ct-text2': '#c07850', '--ct-border': '#402010' },
  Sage:     { '--ct-bg': '#eef3ec', '--ct-surface': '#ffffff', '--ct-accent': '#4a7c59', '--ct-text': '#192a1e', '--ct-text2': '#4a6850', '--ct-border': '#c8dcc8' },
};

/* ── Read-only block renderers ───────────────────────────── */

function ROText({ block }: { block: Block }) {
  const sizeMap = { sm: '0.9rem', md: '1.05rem', lg: '1.25rem' };
  return (
    <p style={{ fontSize: sizeMap[block.content.fontSize ?? 'md'], color: 'var(--ct-text)', lineHeight: 1.75, margin: 0 }}>
      {block.content.text}
    </p>
  );
}

function RODataVisual({ block }: { block: Block }) {
  const rows: DataRow[] = block.content.rows ?? [];
  const maxVal = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div>
      <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ct-text2)', marginBottom: 16 }}>
        {block.content.title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map((row) => (
          <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--ct-text2)', width: 36, textAlign: 'right', flexShrink: 0 }}>{row.label}</span>
            <div style={{ flex: 1, height: 26, background: 'rgba(128,128,128,0.12)', borderRadius: 6, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(row.value / maxVal) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                style={{ height: '100%', background: 'var(--ct-accent)', borderRadius: 6 }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--ct-text2)', width: 30 }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ROMedia({ block }: { block: Block }) {
  return (
    <div>
      <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--ct-border)', minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(128,128,128,0.06)' }}>
        {block.content.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.content.imageUrl} alt={block.content.caption ?? 'media'} style={{ width: '100%', objectFit: 'cover' }} />
        ) : (
          <p style={{ color: 'var(--ct-text2)', fontSize: '0.85rem' }}>Media</p>
        )}
      </div>
      {block.content.caption && (
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ct-text2)', marginTop: 10, fontStyle: 'italic' }}>
          {block.content.caption}
        </p>
      )}
    </div>
  );
}

function ROStepFlow({ block }: { block: Block }) {
  const steps: string[] = block.content.steps ?? [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {steps.map((step, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative' }}>
          {idx < steps.length - 1 && (
            <div style={{ position: 'absolute', left: 16, top: 32, width: 2, height: 'calc(100% - 4px)', background: 'var(--ct-border)' }} />
          )}
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ct-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0, zIndex: 1 }}>
            {idx + 1}
          </div>
          <p style={{ color: 'var(--ct-text)', fontSize: '0.95rem', lineHeight: 1.6, paddingBottom: 22, paddingTop: 5, margin: 0 }}>
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}

function ROQuote({ block }: { block: Block }) {
  return (
    <div style={{ padding: '0.25rem 0' }}>
      <div style={{ fontSize: '4rem', lineHeight: 0.8, color: 'var(--ct-accent)', fontFamily: 'Georgia, serif', marginBottom: 12, opacity: 0.75 }}>"</div>
      <p style={{ fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--ct-text)', lineHeight: 1.7, marginBottom: 12 }}>
        {block.content.quote}
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--ct-text2)' }}>— {block.content.attribution}</p>
    </div>
  );
}

const NAKSHI_CONFIG = {
  info:      { color: '#3b9edd', bg: 'rgba(59,158,221,0.08)',  label: 'INFO'      },
  insight:   { color: '#7c6af5', bg: 'rgba(124,106,245,0.08)', label: 'INSIGHT'   },
  warning:   { color: '#e8930a', bg: 'rgba(232,147,10,0.08)',  label: 'WARNING'   },
  highlight: { color: '#4a7c59', bg: 'rgba(74,124,89,0.08)',   label: 'HIGHLIGHT' },
};

function RONakshi({ block }: { block: Block }) {
  const t = (block.content.calloutType ?? 'insight') as keyof typeof NAKSHI_CONFIG;
  const cfg = NAKSHI_CONFIG[t];
  return (
    <div style={{ borderLeft: `4px solid ${cfg.color}`, borderRadius: '0 10px 10px 0', background: cfg.bg, padding: '14px 18px' }}>
      <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: cfg.color, marginBottom: 8 }}>
        {cfg.label}
      </span>
      <p style={{ fontSize: '0.95rem', color: 'var(--ct-text)', lineHeight: 1.65, margin: 0 }}>
        {block.content.text}
      </p>
    </div>
  );
}

function ROBlock({ block, idx }: { block: Block; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      style={{ background: 'var(--ct-surface)', borderRadius: 14, padding: '1.5rem', border: '1px solid var(--ct-border)' }}
    >
      {block.type === 'text'        && <ROText block={block} />}
      {block.type === 'data-visual' && <RODataVisual block={block} />}
      {block.type === 'media'       && <ROMedia block={block} />}
      {block.type === 'step-flow'   && <ROStepFlow block={block} />}
      {block.type === 'quote'       && <ROQuote block={block} />}
      {block.type === 'nakshi'      && <RONakshi block={block} />}
    </motion.div>
  );
}

/* ── Main published view ─────────────────────────────────── */

interface Props {
  title: string;
  blocks: Block[];
  theme: string;
  slug: string;
}

export function PublishedView({ title, blocks, theme, slug }: Props) {
  const tokens = THEME_TOKENS[theme] ?? THEME_TOKENS.Obsidian;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--ct-bg)',
        ...(tokens as React.CSSProperties),
      }}
    >
      {/* Top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 40,
        height: 52,
        background: 'var(--ct-surface)',
        borderBottom: '1px solid var(--ct-border)',
        display: 'flex', alignItems: 'center',
        padding: '0 1.5rem',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--ct-text)', textDecoration: 'none', letterSpacing: '-0.02em' }}>
          Kalpanic
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--ct-text2)', background: 'rgba(128,128,128,0.1)', padding: '3px 10px', borderRadius: 20 }}>
            {theme}
          </span>
          <Link href="/dashboard" style={{ fontSize: '0.8rem', color: 'var(--ct-text2)', textDecoration: 'none' }}>
            Dashboard →
          </Link>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--ct-text)',
            marginBottom: '2rem',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
          }}
        >
          {title}
        </motion.h1>

        {/* Blocks */}
        {blocks.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {blocks.map((block, idx) => (
              <ROBlock key={block.id} block={block} idx={idx} />
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--ct-text2)', textAlign: 'center', marginTop: '4rem', fontSize: '0.9rem' }}>
            This playbook has no content yet.
          </p>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '4rem', paddingTop: '2rem',
          borderTop: '1px solid var(--ct-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--ct-text2)' }}>
            Made with <span style={{ color: 'var(--ct-accent)', fontWeight: 600 }}>Kalpanic</span>
          </span>
          <Link href="/sign-up" style={{
            padding: '8px 20px', borderRadius: 8,
            background: 'var(--ct-accent)', color: '#fff',
            textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600,
          }}>
            Create your own →
          </Link>
        </div>
      </main>
    </div>
  );
}
