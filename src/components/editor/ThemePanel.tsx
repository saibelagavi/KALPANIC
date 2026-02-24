'use client';

import { useState } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { createClient } from '@/lib/supabase/client';
import { THEME_TOKENS } from './Canvas';

const THEMES = [
  { name: 'Obsidian', description: 'Deep dark, premium' },
  { name: 'Aurora',   description: 'Teal on dark navy'  },
  { name: 'Ivory',    description: 'Warm cream, editorial' },
  { name: 'Ember',    description: 'Rust on midnight'   },
  { name: 'Sage',     description: 'Muted green, calm'  },
];

interface Props {
  playbookId: string;
  onPreview: () => void;
}

export function ThemePanel({ playbookId, onPreview }: Props) {
  const activeTheme  = useEditorStore((s) => s.activeTheme);
  const setTheme     = useEditorStore((s) => s.setTheme);
  const blocks       = useEditorStore((s) => s.blocks);

  const [publishing,   setPublishing]   = useState(false);
  const [published,    setPublished]    = useState<{ slug: string } | null>(null);
  const [publishError, setPublishError] = useState<string | null>(null);

  async function handlePublish() {
    if (publishing) return;
    setPublishing(true);
    setPublishError(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('playbooks')
        .update({
          content:      { blocks },
          theme_id:     activeTheme,
          status:       'published',
          is_public:    true,
          published_at: new Date().toISOString(),
        })
        .eq('id', playbookId)
        .select('slug')
        .single();

      if (error) throw error;
      setPublished({ slug: data.slug });
    } catch (err) {
      console.error('Publish error:', err);
      setPublishError('Could not publish. Please try again.');
    } finally {
      setPublishing(false);
    }
  }

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
      {/* ── Alaukik Theme ───────────────────────────────────── */}
      <p style={{
        fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-3)',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        marginBottom: '0.75rem', paddingLeft: '0.5rem',
      }}>
        Alaukik Theme
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: '1.5rem' }}>
        {THEMES.map(({ name, description }) => {
          const tokens   = THEME_TOKENS[name] ?? {};
          const isActive = activeTheme === name;

          return (
            <button
              key={name}
              onClick={() => setTheme(name)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '0.6rem 0.75rem', borderRadius: 8,
                cursor: 'pointer', textAlign: 'left', width: '100%',
                background: isActive ? 'rgba(124,106,245,0.08)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(124,106,245,0.3)' : 'transparent'}`,
                transition: 'all 0.15s ease',
              }}
            >
              {/* Swatch */}
              <div style={{
                width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                background: tokens['--ct-bg'] ?? '#111',
                border: `2px solid ${isActive ? (tokens['--ct-accent'] ?? 'var(--color-accent)') : 'rgba(255,255,255,0.1)'}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 6,
                  background: tokens['--ct-accent'] ?? '#7c6af5',
                }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--color-accent)' : 'var(--color-text)' }}>
                  {name}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-3)', marginTop: 1 }}>
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

      {/* ── Canvas stats ────────────────────────────────────── */}
      <div style={{
        padding: '0.875rem', borderRadius: 8,
        background: 'var(--color-bg)', border: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
      }}>
        <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Canvas
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--color-text-2)' }}>Blocks</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-accent)', background: 'rgba(124,106,245,0.1)', padding: '1px 8px', borderRadius: 10 }}>
            {blocks.length}
          </span>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* ── Publish section ─────────────────────────────────── */}
      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{
          fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-3)',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          marginBottom: '0.75rem', paddingLeft: '0.25rem',
        }}>
          Publish
        </p>

        {/* Success state */}
        {published ? (
          <div style={{
            borderRadius: 10, background: 'rgba(40,200,80,0.08)',
            border: '1px solid rgba(40,200,80,0.25)', padding: '0.875rem',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#28c840" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,8 6,12 14,4" />
              </svg>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#28c840' }}>Published!</span>
            </div>
            <a
              href={`/p/${published.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', fontSize: '0.75rem', color: 'var(--color-accent)',
                textDecoration: 'none', wordBreak: 'break-all',
                padding: '4px 0',
              }}
            >
              /p/{published.slug} →
            </a>
            <button
              onClick={() => setPublished(null)}
              style={{
                padding: '5px', fontSize: '0.72rem', borderRadius: 6,
                border: '1px solid var(--color-border)', background: 'transparent',
                color: 'var(--color-text-2)', cursor: 'pointer',
              }}
            >
              Continue editing
            </button>
          </div>
        ) : (
          <>
            {/* Error */}
            {publishError && (
              <p style={{ fontSize: '0.72rem', color: '#e05050', marginBottom: 8, padding: '0 0.25rem' }}>
                {publishError}
              </p>
            )}

            {/* Preview */}
            <button
              onClick={onPreview}
              style={{
                width: '100%', padding: '0.6rem',
                background: 'transparent', color: 'var(--color-text-2)',
                border: '1px solid var(--color-border)', borderRadius: 8,
                fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer',
                marginBottom: 8, transition: 'all 0.15s',
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

            {/* Publish */}
            <button
              onClick={handlePublish}
              disabled={publishing}
              style={{
                width: '100%', padding: '0.7rem',
                background: publishing ? 'rgba(124,106,245,0.5)' : 'var(--color-accent)',
                color: 'white', border: 'none', borderRadius: 8,
                fontSize: '0.875rem', fontWeight: 700, cursor: publishing ? 'not-allowed' : 'pointer',
                letterSpacing: '0.02em', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
              onMouseEnter={e => { if (!publishing) (e.currentTarget as HTMLButtonElement).style.opacity = '0.88'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
            >
              {publishing ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Publishing…
                </>
              ) : 'Publish Playbook'}
            </button>
          </>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </aside>
  );
}
