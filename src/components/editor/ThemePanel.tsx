'use client';

import { useEditorStore } from '@/stores/editorStore';
import { THEME_TOKENS } from './Canvas';

const THEMES = [
  { name: 'Obsidian', description: 'Deep dark, premium' },
  { name: 'Aurora', description: 'Teal on dark navy' },
  { name: 'Ivory', description: 'Warm cream, editorial' },
  { name: 'Ember', description: 'Rust on midnight' },
  { name: 'Sage', description: 'Muted green, calm' },
];

export function ThemePanel() {
  const activeTheme = useEditorStore((s) => s.activeTheme);
  const setTheme = useEditorStore((s) => s.setTheme);
  const blocks = useEditorStore((s) => s.blocks);

  return (
    <aside
      style={{
        borderLeft: '1px solid var(--color-border)',
        padding: '1.25rem 0.875rem',
        overflowY: 'auto',
        background: 'var(--color-surface)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Alaukik Theme */}
      <p style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        color: 'var(--color-text-3)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '0.75rem',
        paddingLeft: '0.5rem',
      }}>
        Alaukik Theme
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1.5rem' }}>
        {THEMES.map(({ name, description }) => {
          const tokens = THEME_TOKENS[name] ?? {};
          const isActive = activeTheme === name;

          return (
            <button
              key={name}
              onClick={() => setTheme(name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '0.6rem 0.75rem',
                borderRadius: 8,
                cursor: 'pointer',
                background: isActive ? 'rgba(124,106,245,0.08)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(124,106,245,0.3)' : 'transparent'}`,
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Color preview swatch */}
              <div style={{
                width: 28, height: 28,
                borderRadius: 6,
                background: tokens['--ct-bg'] ?? '#111',
                border: `2px solid ${isActive ? (tokens['--ct-accent'] ?? 'var(--color-accent)') : 'rgba(255,255,255,0.1)'}`,
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Accent strip */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: 6,
                  background: tokens['--ct-accent'] ?? '#7c6af5',
                }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                }}>
                  {name}
                </div>
                <div style={{
                  fontSize: '0.68rem',
                  color: 'var(--color-text-3)',
                  marginTop: 1,
                }}>
                  {description}
                </div>
              </div>

              {isActive && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2,7 5.5,10.5 12,3" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {/* Canvas Stats */}
      <div style={{
        padding: '0.875rem',
        borderRadius: 8,
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
      }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Canvas
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-2)' }}>Blocks</span>
          <span style={{
            fontSize: '0.78rem', fontWeight: 700,
            color: 'var(--color-accent)',
            background: 'rgba(124,106,245,0.1)',
            padding: '1px 8px',
            borderRadius: 10,
          }}>
            {blocks.length}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div style={{ flex: 1 }} />

      {/* Publish */}
      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'var(--color-text-3)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
          paddingLeft: '0.25rem',
        }}>
          Publish
        </p>

        {/* Preview button */}
        <button
          style={{
            width: '100%',
            padding: '0.6rem',
            background: 'transparent',
            color: 'var(--color-text-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            fontSize: '0.82rem',
            fontWeight: 500,
            cursor: 'pointer',
            marginBottom: 8,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-2)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-2)';
          }}
        >
          Preview
        </button>

        {/* Publish button */}
        <button
          style={{
            width: '100%',
            padding: '0.7rem',
            background: 'var(--color-accent)',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: '0.875rem',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
        >
          Publish Playbook
        </button>
      </div>
    </aside>
  );
}
