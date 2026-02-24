'use client';

import { useState } from 'react';
import { useEditorStore, BlockType } from '@/stores/editorStore';

const ELEMENTS: { type: BlockType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    type: 'text',
    label: 'Text Block',
    description: 'Paragraph, heading, or body copy',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    type: 'data-visual',
    label: 'Data Visual',
    description: 'Live editable bar chart',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="13" width="5" height="8" rx="1" />
        <rect x="9.5" y="8" width="5" height="13" rx="1" />
        <rect x="17" y="3" width="5" height="18" rx="1" />
      </svg>
    ),
  },
  {
    type: 'media',
    label: 'Media',
    description: 'Image, video or embed',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    type: 'step-flow',
    label: 'Step Flow',
    description: 'Numbered sequential steps',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="4.5" cy="6" r="1.5" />
        <circle cx="4.5" cy="12" r="1.5" />
        <circle cx="4.5" cy="18" r="1.5" />
        <line x1="8" y1="6" x2="20" y2="6" />
        <line x1="8" y1="12" x2="20" y2="12" />
        <line x1="8" y1="18" x2="20" y2="18" />
      </svg>
    ),
  },
  {
    type: 'quote',
    label: 'Quote',
    description: 'Pull quote or testimonial',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
    ),
  },
  {
    type: 'nakshi',
    label: 'Nakshi',
    description: 'Callout annotation or insight',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 17-1.5-8L6 7.5l6-5.5 6 5.5-4.5 1.5L12 17z" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export function BlockPicker() {
  const addBlock = useEditorStore((s) => s.addBlock);
  const [hoveredType, setHoveredType] = useState<BlockType | null>(null);

  return (
    <aside
      style={{
        borderRight: '1px solid var(--color-border)',
        padding: '1.25rem 0.875rem',
        overflowY: 'auto',
        background: 'var(--color-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
      }}
    >
      <p style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        color: 'var(--color-text-3)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '0.625rem',
        paddingLeft: '0.5rem',
      }}>
        Elements
      </p>

      {ELEMENTS.map(({ type, label, description, icon }) => {
        const isHovered = hoveredType === type;
        return (
          <button
            key={type}
            onClick={() => addBlock(type)}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
            title={description}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.625rem 0.75rem',
              borderRadius: '8px',
              cursor: 'pointer',
              color: isHovered ? 'var(--color-accent)' : 'var(--color-text-2)',
              background: isHovered ? 'rgba(124,106,245,0.08)' : 'transparent',
              border: `1px solid ${isHovered ? 'rgba(124,106,245,0.2)' : 'transparent'}`,
              fontSize: '0.82rem',
              fontWeight: 500,
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ flexShrink: 0, opacity: isHovered ? 1 : 0.7 }}>{icon}</span>
            {label}
          </button>
        );
      })}

      <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'var(--color-text-3)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
          paddingLeft: '0.5rem',
        }}>
          Tips
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', lineHeight: 1.5, padding: '0 0.5rem' }}>
          Click any element to add it to the canvas. Click a block to select and edit it.
        </p>
      </div>
    </aside>
  );
}
