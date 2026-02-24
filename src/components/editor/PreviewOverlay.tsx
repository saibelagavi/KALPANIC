'use client';

import { motion } from 'framer-motion';
import { useEditorStore, Block, DataRow } from '@/stores/editorStore';
import { THEME_TOKENS } from './Canvas';

/* ── Read-only block renderers ───────────────────────────── */

function ROText({ block }: { block: Block }) {
  const sizeMap = { sm: '0.875rem', md: '1rem', lg: '1.2rem' };
  const size = sizeMap[block.content.fontSize ?? 'md'];
  return (
    <p style={{ fontSize: size, color: 'var(--ct-text)', lineHeight: 1.7, margin: 0 }}>
      {block.content.text}
    </p>
  );
}

function RODataVisual({ block }: { block: Block }) {
  const rows: DataRow[] = block.content.rows ?? [];
  const maxVal = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ct-text2)', marginBottom: 14 }}>
        {block.content.title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((row) => (
          <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--ct-text2)', width: 32, textAlign: 'right', flexShrink: 0 }}>{row.label}</span>
            <div style={{ flex: 1, height: 22, background: 'rgba(255,255,255,0.05)', borderRadius: 5, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(row.value / maxVal) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                style={{ height: '100%', background: 'var(--ct-accent)', borderRadius: 5 }}
              />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--ct-text2)', width: 26 }}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ROMedia({ block }: { block: Block }) {
  return (
    <div>
      <div style={{
        border: '2px dashed var(--ct-border)',
        borderRadius: 10,
        minHeight: 140,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {block.content.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.content.imageUrl} alt="media" style={{ width: '100%', objectFit: 'cover', borderRadius: 8 }} />
        ) : (
          <p style={{ color: 'var(--ct-text2)', fontSize: '0.85rem' }}>Media block</p>
        )}
      </div>
      {block.content.caption && (
        <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--ct-text2)', marginTop: 8, fontStyle: 'italic' }}>
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
        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, position: 'relative' }}>
          {idx < steps.length - 1 && (
            <div style={{ position: 'absolute', left: 15, top: 30, width: 2, height: 'calc(100% - 4px)', background: 'var(--ct-border)' }} />
          )}
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'var(--ct-accent)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, zIndex: 1,
          }}>{idx + 1}</div>
          <p style={{ color: 'var(--ct-text)', fontSize: '0.9rem', lineHeight: 1.6, paddingBottom: 20, paddingTop: 4 }}>
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}

function ROQuote({ block }: { block: Block }) {
  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div style={{ fontSize: '3.5rem', lineHeight: 0.8, color: 'var(--ct-accent)', fontFamily: 'Georgia, serif', marginBottom: 8, opacity: 0.8 }}>"</div>
      <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--ct-text)', lineHeight: 1.65, marginBottom: 10 }}>
        {block.content.quote}
      </p>
      <p style={{ fontSize: '0.82rem', color: 'var(--ct-text2)' }}>— {block.content.attribution}</p>
    </div>
  );
}

const NAKSHI_CONFIG = {
  info:      { color: '#3b9edd', bg: 'rgba(59,158,221,0.08)',  label: 'INFO' },
  insight:   { color: '#7c6af5', bg: 'rgba(124,106,245,0.08)', label: 'INSIGHT' },
  warning:   { color: '#e8930a', bg: 'rgba(232,147,10,0.08)',  label: 'WARNING' },
  highlight: { color: '#4a7c59', bg: 'rgba(74,124,89,0.08)',   label: 'HIGHLIGHT' },
};

function RONakshi({ block }: { block: Block }) {
  const t = block.content.calloutType ?? 'insight';
  const cfg = NAKSHI_CONFIG[t];
  return (
    <div style={{ borderLeft: `4px solid ${cfg.color}`, borderRadius: '0 8px 8px 0', background: cfg.bg, padding: '12px 16px' }}>
      <span style={{ display: 'inline-block', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: cfg.color, marginBottom: 6 }}>
        {cfg.label}
      </span>
      <p style={{ fontSize: '0.9rem', color: 'var(--ct-text)', lineHeight: 1.6, margin: 0 }}>
        {block.content.text}
      </p>
    </div>
  );
}

function ROBlock({ block }: { block: Block }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      style={{
        background: 'var(--ct-surface)',
        borderRadius: 12,
        padding: '1.25rem',
        border: '1px solid var(--ct-border)',
      }}
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

/* ── Overlay ─────────────────────────────────────────────── */

export function PreviewOverlay({ onClose }: { onClose: () => void }) {
  const blocks = useEditorStore((s) => s.blocks);
  const activeTheme = useEditorStore((s) => s.activeTheme);
  const tokens = THEME_TOKENS[activeTheme] ?? THEME_TOKENS.Obsidian;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: tokens['--ct-bg'] ?? '#13131f',
        display: 'flex', flexDirection: 'column',
        ...(tokens as React.CSSProperties),
      }}
    >
      {/* Fake browser chrome */}
      <div style={{
        height: 48,
        background: 'var(--ct-surface)',
        borderBottom: '1px solid var(--ct-border)',
        display: 'flex', alignItems: 'center',
        padding: '0 1.25rem',
        gap: 12,
        flexShrink: 0,
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
          ))}
        </div>

        {/* URL bar */}
        <div style={{
          flex: 1,
          maxWidth: 460,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid var(--ct-border)',
          borderRadius: 7,
          padding: '4px 12px',
          fontSize: '0.75rem',
          color: 'var(--ct-text2)',
          letterSpacing: '0.02em',
        }}>
          kalpanic.com/p/my-playbook
        </div>

        {/* Exit */}
        <button
          onClick={onClose}
          style={{
            padding: '5px 14px', borderRadius: 7,
            border: '1px solid var(--ct-border)',
            background: 'transparent', color: 'var(--ct-text)',
            fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
        >
          ✕  Exit Preview
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2.5rem 1.5rem', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {blocks.length > 0 ? (
            blocks.map((block) => <ROBlock key={block.id} block={block} />)
          ) : (
            <div style={{ textAlign: 'center', marginTop: '5rem' }}>
              <p style={{ color: 'var(--ct-text2)', fontSize: '0.9rem' }}>
                No blocks yet — add some from the editor to preview them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
