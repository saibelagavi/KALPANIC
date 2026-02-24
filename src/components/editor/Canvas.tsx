'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditorStore, Block, DataRow } from '@/stores/editorStore';

/* ─────────────────────────────────────────────────────────── */
/* Theme CSS variable overrides applied to the canvas subtree  */
/* ─────────────────────────────────────────────────────────── */
export const THEME_TOKENS: Record<string, Record<string, string>> = {
  Obsidian: {
    '--ct-bg': '#13131f',
    '--ct-surface': '#1e1e30',
    '--ct-accent': '#7c6af5',
    '--ct-text': '#e4e4f0',
    '--ct-text2': '#7878a0',
    '--ct-border': '#2e2e4a',
  },
  Aurora: {
    '--ct-bg': '#091020',
    '--ct-surface': '#0d1a30',
    '--ct-accent': '#34d4a0',
    '--ct-text': '#d0e8f0',
    '--ct-text2': '#5888a0',
    '--ct-border': '#1a3040',
  },
  Ivory: {
    '--ct-bg': '#faf6f0',
    '--ct-surface': '#ffffff',
    '--ct-accent': '#c17a3a',
    '--ct-text': '#1a0d05',
    '--ct-text2': '#6a5040',
    '--ct-border': '#e8d8c0',
  },
  Ember: {
    '--ct-bg': '#1c0800',
    '--ct-surface': '#2c1200',
    '--ct-accent': '#e85a0c',
    '--ct-text': '#f8e0c8',
    '--ct-text2': '#c07850',
    '--ct-border': '#402010',
  },
  Sage: {
    '--ct-bg': '#eef3ec',
    '--ct-surface': '#ffffff',
    '--ct-accent': '#4a7c59',
    '--ct-text': '#192a1e',
    '--ct-text2': '#4a6850',
    '--ct-border': '#c8dcc8',
  },
};

/* ─────────────────────────────────────────────────────────── */
/* Small icon-button used in block action bar                  */
/* ─────────────────────────────────────────────────────────── */
function ActionBtn({
  onClick,
  title,
  danger = false,
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  title: string;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 26,
        height: 26,
        border: 'none',
        borderRadius: 6,
        background: danger ? 'rgba(220,60,60,0.15)' : 'var(--ct-surface)',
        color: danger ? '#e05050' : 'var(--ct-text2)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.8rem',
        fontWeight: 700,
        transition: 'background 0.12s, color 0.12s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = danger ? 'rgba(220,60,60,0.3)' : 'var(--ct-accent)';
        (e.currentTarget as HTMLButtonElement).style.color = '#fff';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = danger ? 'rgba(220,60,60,0.15)' : 'var(--ct-surface)';
        (e.currentTarget as HTMLButtonElement).style.color = danger ? '#e05050' : 'var(--ct-text2)';
      }}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Text Block                                                  */
/* ─────────────────────────────────────────────────────────── */
function TextBlockView({ block, isSelected, onUpdate }: {
  block: Block; isSelected: boolean;
  onUpdate: (c: Partial<Block['content']>) => void;
}) {
  const fontSize = block.content.fontSize ?? 'md';
  const sizeMap = { sm: '0.875rem', md: '1rem', lg: '1.2rem' };

  return (
    <div>
      {isSelected && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <button
              key={s}
              onClick={() => onUpdate({ fontSize: s })}
              style={{
                padding: '2px 10px',
                borderRadius: 6,
                border: '1px solid var(--ct-border)',
                background: fontSize === s ? 'var(--ct-accent)' : 'transparent',
                color: fontSize === s ? '#fff' : 'var(--ct-text2)',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      )}
      <div
        contentEditable={isSelected}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate({ text: e.currentTarget.textContent ?? '' })}
        style={{
          fontSize: sizeMap[fontSize],
          color: 'var(--ct-text)',
          lineHeight: 1.7,
          outline: 'none',
          minHeight: 40,
          cursor: isSelected ? 'text' : 'default',
          padding: isSelected ? '4px 6px' : 0,
          borderRadius: 6,
          background: isSelected ? 'rgba(124,106,245,0.04)' : 'transparent',
          border: isSelected ? '1px dashed var(--ct-border)' : '1px solid transparent',
        }}
      >
        {block.content.text}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Data Visual Block — editable table + live bar chart         */
/* ─────────────────────────────────────────────────────────── */
function DataVisualBlockView({ block, isSelected, onUpdate }: {
  block: Block; isSelected: boolean;
  onUpdate: (c: Partial<Block['content']>) => void;
}) {
  const rows: DataRow[] = block.content.rows ?? [];
  const maxVal = Math.max(...rows.map((r) => r.value), 1);

  function uid() { return Math.random().toString(36).slice(2, 8); }

  function updateRow(id: string, field: 'label' | 'value', val: string) {
    onUpdate({
      rows: rows.map((r) =>
        r.id === id ? { ...r, [field]: field === 'value' ? Number(val) || 0 : val } : r
      ),
    });
  }

  function addRow() {
    onUpdate({ rows: [...rows, { id: uid(), label: 'New', value: 50 }] });
  }

  function removeRow(id: string) {
    onUpdate({ rows: rows.filter((r) => r.id !== id) });
  }

  return (
    <div>
      {/* Title */}
      <div
        contentEditable={isSelected}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate({ title: e.currentTarget.textContent ?? '' })}
        style={{
          fontSize: '0.8rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--ct-text2)',
          marginBottom: 16,
          outline: 'none',
          cursor: isSelected ? 'text' : 'default',
        }}
      >
        {block.content.title}
      </div>

      {/* Bar chart */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: isSelected ? 16 : 0 }}>
        {rows.map((row) => (
          <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--ct-text2)', width: 32, flexShrink: 0, textAlign: 'right' }}>
              {row.label}
            </span>
            <div style={{ flex: 1, height: 24, background: 'rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(row.value / maxVal) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'var(--ct-accent)',
                  borderRadius: 6,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 8,
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--ct-text2)', width: 28, textAlign: 'left' }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      {/* Edit table (shown when selected) */}
      {isSelected && (
        <div style={{
          borderTop: '1px solid var(--ct-border)',
          paddingTop: 14,
          marginTop: 8,
        }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ct-text2)', marginBottom: 8 }}>
            Edit data
          </p>
          {rows.map((row) => (
            <div key={row.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <input
                value={row.label}
                onChange={(e) => updateRow(row.id, 'label', e.target.value)}
                placeholder="Label"
                style={{
                  flex: 1,
                  padding: '4px 8px',
                  border: '1px solid var(--ct-border)',
                  borderRadius: 6,
                  background: 'transparent',
                  color: 'var(--ct-text)',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
              <input
                type="number"
                value={row.value}
                onChange={(e) => updateRow(row.id, 'value', e.target.value)}
                placeholder="Value"
                style={{
                  width: 64,
                  padding: '4px 8px',
                  border: '1px solid var(--ct-border)',
                  borderRadius: 6,
                  background: 'transparent',
                  color: 'var(--ct-text)',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
              <button
                onClick={() => removeRow(row.id)}
                style={{
                  width: 24, height: 24, borderRadius: 6, border: 'none',
                  background: 'rgba(220,60,60,0.12)', color: '#e05050',
                  cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >×</button>
            </div>
          ))}
          <button
            onClick={addRow}
            style={{
              marginTop: 6, padding: '5px 12px',
              border: '1px dashed var(--ct-border)', borderRadius: 6,
              background: 'transparent', color: 'var(--ct-text2)',
              fontSize: '0.78rem', cursor: 'pointer',
            }}
          >
            + Add row
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Media Block                                                 */
/* ─────────────────────────────────────────────────────────── */
function MediaBlockView({ block, isSelected, onUpdate }: {
  block: Block; isSelected: boolean;
  onUpdate: (c: Partial<Block['content']>) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpdate({ imageUrl: url });
  }

  return (
    <div>
      <div
        onClick={() => isSelected && fileRef.current?.click()}
        style={{
          border: `2px dashed ${block.content.imageUrl ? 'transparent' : 'var(--ct-border)'}`,
          borderRadius: 12,
          minHeight: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isSelected ? 'pointer' : 'default',
          overflow: 'hidden',
          position: 'relative',
          background: block.content.imageUrl ? 'transparent' : 'rgba(255,255,255,0.03)',
          transition: 'border-color 0.15s',
        }}
      >
        {block.content.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={block.content.imageUrl}
            alt="media"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--ct-text2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 12px' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <p style={{ color: 'var(--ct-text2)', fontSize: '0.85rem' }}>
              {isSelected ? 'Click to upload image' : 'Media block'}
            </p>
            {isSelected && (
              <p style={{ color: 'var(--ct-text2)', fontSize: '0.72rem', marginTop: 4, opacity: 0.6 }}>
                PNG, JPG, WebP supported
              </p>
            )}
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      <div
        contentEditable={isSelected}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate({ caption: e.currentTarget.textContent ?? '' })}
        style={{
          marginTop: 8,
          fontSize: '0.78rem',
          color: 'var(--ct-text2)',
          textAlign: 'center',
          outline: 'none',
          fontStyle: 'italic',
          cursor: isSelected ? 'text' : 'default',
        }}
      >
        {block.content.caption || 'Add a caption...'}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Step Flow Block                                             */
/* ─────────────────────────────────────────────────────────── */
function StepFlowBlockView({ block, isSelected, onUpdate }: {
  block: Block; isSelected: boolean;
  onUpdate: (c: Partial<Block['content']>) => void;
}) {
  const steps: string[] = block.content.steps ?? [];

  function updateStep(idx: number, val: string) {
    const newSteps = [...steps];
    newSteps[idx] = val;
    onUpdate({ steps: newSteps });
  }

  function addStep() {
    onUpdate({ steps: [...steps, 'New step'] });
  }

  function removeStep(idx: number) {
    onUpdate({ steps: steps.filter((_, i) => i !== idx) });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {steps.map((step, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, position: 'relative' }}>
          {/* Connector line */}
          {idx < steps.length - 1 && (
            <div style={{
              position: 'absolute',
              left: 15,
              top: 30,
              width: 2,
              height: 'calc(100% - 4px)',
              background: 'var(--ct-border)',
            }} />
          )}
          {/* Step number */}
          <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'var(--ct-accent)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            flexShrink: 0,
            zIndex: 1,
          }}>
            {idx + 1}
          </div>
          {/* Step text */}
          <div style={{ flex: 1, paddingBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              contentEditable={isSelected}
              suppressContentEditableWarning
              onBlur={(e) => updateStep(idx, e.currentTarget.textContent ?? '')}
              style={{
                flex: 1,
                color: 'var(--ct-text)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                outline: 'none',
                padding: isSelected ? '3px 8px' : '3px 0',
                borderRadius: 6,
                border: isSelected ? '1px dashed var(--ct-border)' : '1px solid transparent',
                cursor: isSelected ? 'text' : 'default',
                paddingTop: 4,
              }}
            >
              {step}
            </div>
            {isSelected && (
              <button
                onClick={() => removeStep(idx)}
                style={{
                  width: 22, height: 22, borderRadius: 5, border: 'none',
                  background: 'rgba(220,60,60,0.12)', color: '#e05050',
                  cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >×</button>
            )}
          </div>
        </div>
      ))}
      {isSelected && (
        <button
          onClick={addStep}
          style={{
            alignSelf: 'flex-start',
            marginLeft: 44,
            marginTop: 4,
            padding: '5px 12px',
            border: '1px dashed var(--ct-border)', borderRadius: 6,
            background: 'transparent', color: 'var(--ct-text2)',
            fontSize: '0.78rem', cursor: 'pointer',
          }}
        >
          + Add step
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Quote Block                                                 */
/* ─────────────────────────────────────────────────────────── */
function QuoteBlockView({ block, isSelected, onUpdate }: {
  block: Block; isSelected: boolean;
  onUpdate: (c: Partial<Block['content']>) => void;
}) {
  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div style={{
        fontSize: '4rem',
        lineHeight: 0.8,
        color: 'var(--ct-accent)',
        fontFamily: 'Georgia, serif',
        marginBottom: 8,
        opacity: 0.8,
      }}>
        "
      </div>
      <div
        contentEditable={isSelected}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate({ quote: e.currentTarget.textContent ?? '' })}
        style={{
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: 'var(--ct-text)',
          lineHeight: 1.65,
          outline: 'none',
          cursor: isSelected ? 'text' : 'default',
          padding: isSelected ? '4px 8px' : '4px 0',
          borderRadius: 6,
          border: isSelected ? '1px dashed var(--ct-border)' : '1px solid transparent',
          marginBottom: 12,
        }}
      >
        {block.content.quote}
      </div>
      <div
        contentEditable={isSelected}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate({ attribution: e.currentTarget.textContent ?? '' })}
        style={{
          fontSize: '0.82rem',
          color: 'var(--ct-text2)',
          outline: 'none',
          cursor: isSelected ? 'text' : 'default',
          padding: isSelected ? '3px 8px' : '3px 0',
          borderRadius: 6,
          border: isSelected ? '1px dashed var(--ct-border)' : '1px solid transparent',
        }}
      >
        — {block.content.attribution}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Nakshi Block — callout annotation                           */
/* ─────────────────────────────────────────────────────────── */
const NAKSHI_CONFIG = {
  info: { color: '#3b9edd', bg: 'rgba(59,158,221,0.08)', label: 'INFO' },
  insight: { color: '#7c6af5', bg: 'rgba(124,106,245,0.08)', label: 'INSIGHT' },
  warning: { color: '#e8930a', bg: 'rgba(232,147,10,0.08)', label: 'WARNING' },
  highlight: { color: '#4a7c59', bg: 'rgba(74,124,89,0.08)', label: 'HIGHLIGHT' },
};

function NakshiBlockView({ block, isSelected, onUpdate }: {
  block: Block; isSelected: boolean;
  onUpdate: (c: Partial<Block['content']>) => void;
}) {
  const calloutType = block.content.calloutType ?? 'insight';
  const cfg = NAKSHI_CONFIG[calloutType];

  return (
    <div style={{
      borderLeft: `4px solid ${cfg.color}`,
      borderRadius: '0 8px 8px 0',
      background: cfg.bg,
      padding: '12px 16px',
    }}>
      {/* Type selector (shown when selected) */}
      {isSelected && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
          {(Object.keys(NAKSHI_CONFIG) as Array<keyof typeof NAKSHI_CONFIG>).map((t) => (
            <button
              key={t}
              onClick={() => onUpdate({ calloutType: t })}
              style={{
                padding: '2px 10px',
                borderRadius: 6,
                border: `1px solid ${NAKSHI_CONFIG[t].color}`,
                background: calloutType === t ? NAKSHI_CONFIG[t].color : 'transparent',
                color: calloutType === t ? '#fff' : NAKSHI_CONFIG[t].color,
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              {NAKSHI_CONFIG[t].label}
            </button>
          ))}
        </div>
      )}

      {/* Label pill (shown when not selected) */}
      {!isSelected && (
        <span style={{
          display: 'inline-block',
          fontSize: '0.62rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: cfg.color,
          marginBottom: 6,
        }}>
          {cfg.label}
        </span>
      )}

      <div
        contentEditable={isSelected}
        suppressContentEditableWarning
        onBlur={(e) => onUpdate({ text: e.currentTarget.textContent ?? '' })}
        style={{
          fontSize: '0.9rem',
          color: 'var(--ct-text)',
          lineHeight: 1.6,
          outline: 'none',
          cursor: isSelected ? 'text' : 'default',
          padding: isSelected ? '4px 6px' : 0,
          borderRadius: 6,
          border: isSelected ? '1px dashed rgba(255,255,255,0.1)' : '1px solid transparent',
        }}
      >
        {block.content.text}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Block type label names                                      */
/* ─────────────────────────────────────────────────────────── */
const BLOCK_LABELS: Record<string, string> = {
  'text': 'Text',
  'data-visual': 'Data Visual',
  'media': 'Media',
  'step-flow': 'Step Flow',
  'quote': 'Quote',
  'nakshi': 'Nakshi',
};

/* ─────────────────────────────────────────────────────────── */
/* Block wrapper — hover, select, action bar, animation        */
/* ─────────────────────────────────────────────────────────── */
function BlockWrapper({ block, isFirst, isLast }: {
  block: Block; isFirst: boolean; isLast: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { selectedBlockId, selectBlock, removeBlock, moveBlock, duplicateBlock, updateBlock } = useEditorStore();
  const isSelected = selectedBlockId === block.id;
  const showActions = isHovered || isSelected;

  function update(content: Partial<Block['content']>) {
    updateBlock(block.id, content);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => { e.stopPropagation(); selectBlock(block.id); }}
      style={{
        position: 'relative',
        borderRadius: 12,
        border: isSelected
          ? '2px solid var(--ct-accent)'
          : isHovered
          ? '2px solid var(--ct-border)'
          : '2px solid transparent',
        background: 'var(--ct-surface)',
        padding: '1.25rem 1.25rem',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        boxShadow: isSelected
          ? '0 0 0 4px rgba(124,106,245,0.1), 0 4px 20px rgba(0,0,0,0.15)'
          : isHovered
          ? '0 2px 12px rgba(0,0,0,0.1)'
          : 'none',
      }}
    >
      {/* Block type chip */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{
              position: 'absolute',
              top: -11,
              left: 12,
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              background: isSelected ? 'var(--ct-accent)' : 'var(--ct-border)',
              color: isSelected ? '#fff' : 'var(--ct-text2)',
              padding: '2px 8px',
              borderRadius: 4,
              pointerEvents: 'none',
            }}
          >
            {BLOCK_LABELS[block.type]}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            style={{
              position: 'absolute',
              top: -14,
              right: 10,
              display: 'flex',
              gap: 4,
              zIndex: 20,
            }}
          >
            {!isFirst && (
              <ActionBtn onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'up'); }} title="Move up">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="9" x2="6" y2="3"/><polyline points="3,5.5 6,3 9,5.5"/></svg>
              </ActionBtn>
            )}
            {!isLast && (
              <ActionBtn onClick={(e) => { e.stopPropagation(); moveBlock(block.id, 'down'); }} title="Move down">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="3" x2="6" y2="9"/><polyline points="3,6.5 6,9 9,6.5"/></svg>
              </ActionBtn>
            )}
            <ActionBtn onClick={(e) => { e.stopPropagation(); duplicateBlock(block.id); }} title="Duplicate">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="1" y="3" width="7" height="8" rx="1"/><path d="M4 3V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9"/></svg>
            </ActionBtn>
            <ActionBtn onClick={(e) => { e.stopPropagation(); removeBlock(block.id); }} title="Delete" danger>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/></svg>
            </ActionBtn>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Block content */}
      {block.type === 'text' && <TextBlockView block={block} isSelected={isSelected} onUpdate={update} />}
      {block.type === 'data-visual' && <DataVisualBlockView block={block} isSelected={isSelected} onUpdate={update} />}
      {block.type === 'media' && <MediaBlockView block={block} isSelected={isSelected} onUpdate={update} />}
      {block.type === 'step-flow' && <StepFlowBlockView block={block} isSelected={isSelected} onUpdate={update} />}
      {block.type === 'quote' && <QuoteBlockView block={block} isSelected={isSelected} onUpdate={update} />}
      {block.type === 'nakshi' && <NakshiBlockView block={block} isSelected={isSelected} onUpdate={update} />}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Canvas — main scroll area                                   */
/* ─────────────────────────────────────────────────────────── */
export function Canvas({ playbookId, activeTheme }: { playbookId: string; activeTheme: string }) {
  const blocks = useEditorStore((s) => s.blocks);
  const selectBlock = useEditorStore((s) => s.selectBlock);
  const addBlock = useEditorStore((s) => s.addBlock);
  const tokens = THEME_TOKENS[activeTheme] ?? THEME_TOKENS.Obsidian;

  return (
    <main
      style={{
        overflowY: 'auto',
        padding: '2rem 2.5rem',
        background: 'var(--ct-bg)',
        ...tokens,
      } as React.CSSProperties}
      onClick={() => selectBlock(null)}
    >
      {/* Playbook metadata bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--ct-border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--ct-accent)',
            boxShadow: '0 0 0 3px rgba(124,106,245,0.15)',
          }} />
          <span style={{ fontSize: '0.72rem', color: 'var(--ct-text2)', letterSpacing: '0.05em' }}>
            {blocks.length} block{blocks.length !== 1 ? 's' : ''} · {activeTheme} theme
          </span>
        </div>
        <span style={{ fontSize: '0.68rem', color: 'var(--ct-text2)', opacity: 0.5 }}>
          ID {playbookId.slice(0, 8)}…
        </span>
      </div>

      {/* Block list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <AnimatePresence initial={false}>
          {blocks.map((block, idx) => (
            <BlockWrapper
              key={block.id}
              block={block}
              isFirst={idx === 0}
              isLast={idx === blocks.length - 1}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {blocks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 360,
            gap: 16,
          }}
        >
          <div style={{
            width: 64, height: 64,
            borderRadius: 16,
            background: 'rgba(124,106,245,0.08)',
            border: '1px solid rgba(124,106,245,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--ct-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--ct-text)', fontSize: '0.95rem', fontWeight: 600, marginBottom: 6 }}>
              Your canvas is empty
            </p>
            <p style={{ color: 'var(--ct-text2)', fontSize: '0.82rem' }}>
              Click any element in the left panel to add it here
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
            {(['text', 'step-flow', 'quote', 'nakshi'] as const).map((t) => (
              <button
                key={t}
                onClick={(e) => { e.stopPropagation(); addBlock(t); }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: '1px solid var(--ct-border)',
                  background: 'transparent',
                  color: 'var(--ct-text2)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                }}
              >
                {BLOCK_LABELS[t]}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </main>
  );
}
