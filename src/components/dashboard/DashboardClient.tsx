'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

/* ── Types ────────────────────────────────────────────────── */
type FilterTab = 'all' | 'draft' | 'published';

interface Playbook {
  id: string;
  title: string;
  slug: string;
  status: string;
  theme_id: string | null;
  content: { blocks?: unknown[]; theme?: string } | null;
  created_at: string;
  updated_at: string;
}

interface Stats { total: number; published: number; views: number; }

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
  plan: string;
  persona: string | null;
}

interface Props {
  playbooks: Playbook[];
  stats: Stats;
  profile: Profile | null;
  userEmail: string;
}

/* ── Helpers ─────────────────────────────────────────────── */
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const d = Math.floor(diff / 86400000);
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 7)  return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const THEME_COLORS: Record<string, { bg: string; accent: string; textOnBg: string }> = {
  Obsidian: { bg: '#1e1e30', accent: '#7c6af5', textOnBg: '#e4e4f0' },
  Aurora:   { bg: '#0d1a30', accent: '#34d4a0', textOnBg: '#d0e8f0' },
  Ivory:    { bg: '#f5ede0', accent: '#c17a3a', textOnBg: '#1a0d05' },
  Ember:    { bg: '#2c1200', accent: '#e85a0c', textOnBg: '#f8e0c8' },
  Sage:     { bg: '#eef3ec', accent: '#4a7c59', textOnBg: '#192a1e' },
};

function getTheme(p: Playbook) {
  const name = p.content?.theme ?? p.theme_id ?? 'Obsidian';
  return { name, ...(THEME_COLORS[name] ?? THEME_COLORS.Obsidian) };
}

function blockCount(p: Playbook): number {
  return p.content?.blocks?.length ?? 0;
}

/* ── Stat card ───────────────────────────────────────────── */
function StatCard({ value, label, icon }: { value: string | number; label: string; icon: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 12,
      padding: '1.25rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>
          {value}
        </div>
        <div style={{ color: 'var(--color-accent)', opacity: 0.7 }}>{icon}</div>
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-3)', fontWeight: 500 }}>{label}</div>
    </div>
  );
}

/* ── Playbook card ───────────────────────────────────────── */
function PlaybookCard({
  playbook,
  onDelete,
  deleting,
}: {
  playbook: Playbook;
  onDelete: (id: string) => void;
  deleting: boolean;
}) {
  const [confirming, setConfirming] = useState(false);
  const theme = getTheme(playbook);
  const blocks = blockCount(playbook);
  const isPublished = playbook.status === 'published';

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 14,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.18s, transform 0.18s',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(0,0,0,0.10)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
      }}
    >
      {/* Theme header strip */}
      <div style={{
        background: theme.bg,
        padding: '1rem 1.125rem 0.875rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 56,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: theme.accent }} />
          <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.textOnBg, opacity: 0.7 }}>
            {theme.name}
          </span>
        </div>
        {/* Status badge */}
        <span style={{
          fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '3px 8px', borderRadius: 20,
          background: isPublished ? 'rgba(40,200,80,0.2)' : 'rgba(255,255,255,0.08)',
          color: isPublished ? '#28c840' : theme.textOnBg,
          border: `1px solid ${isPublished ? 'rgba(40,200,80,0.3)' : 'rgba(255,255,255,0.12)'}`,
        }}>
          {isPublished ? '✓ Published' : 'Draft'}
        </span>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.125rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          margin: 0,
        }}>
          {playbook.title}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.72rem', color: 'var(--color-text-3)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="8" y1="8" x2="12" y2="8"/>
            </svg>
            {blocks} block{blocks !== 1 ? 's' : ''}
          </span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--color-border)' }} />
          <span>{timeAgo(playbook.updated_at)}</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto' }}>
          <Link
            href={`/playbook/${playbook.id}`}
            style={{
              flex: 1, textAlign: 'center',
              padding: '6px 0',
              borderRadius: 8,
              background: 'var(--color-accent)',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            Edit
          </Link>

          {isPublished && (
            <Link
              href={`/p/${playbook.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1, textAlign: 'center',
                padding: '6px 0',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: 'transparent',
                color: 'var(--color-text-2)',
                textDecoration: 'none',
                fontSize: '0.78rem',
                fontWeight: 500,
              }}
            >
              View →
            </Link>
          )}

          {/* Delete */}
          {confirming ? (
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                onClick={() => { setConfirming(false); onDelete(playbook.id); }}
                disabled={deleting}
                style={{
                  padding: '5px 8px', borderRadius: 7, border: 'none',
                  background: '#e05050', color: '#fff',
                  fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
                }}
              >
                {deleting ? '…' : 'Yes'}
              </button>
              <button
                onClick={() => setConfirming(false)}
                style={{
                  padding: '5px 8px', borderRadius: 7, border: '1px solid var(--color-border)',
                  background: 'transparent', color: 'var(--color-text-2)',
                  fontSize: '0.7rem', cursor: 'pointer',
                }}
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              title="Delete"
              style={{
                width: 30, height: 30, borderRadius: 8,
                border: '1px solid var(--color-border)',
                background: 'transparent', color: 'var(--color-text-3)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main dashboard ──────────────────────────────────────── */
export function DashboardClient({ playbooks: initial, stats, profile, userEmail }: Props) {
  const [playbooks, setPlaybooks] = useState(initial);
  const [filter, setFilter]       = useState<FilterTab>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const displayName = profile?.display_name || userEmail.split('@')[0];
  const initials    = displayName.slice(0, 2).toUpperCase();
  const plan        = profile?.plan ?? 'free';
  const persona     = profile?.persona;

  const filtered = playbooks.filter(p => {
    if (filter === 'draft')     return p.status === 'draft';
    if (filter === 'published') return p.status === 'published';
    return true;
  });

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from('playbooks').delete().eq('id', id);
      if (!error) setPlaybooks(prev => prev.filter(p => p.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  const TAB_COUNTS = {
    all:       playbooks.length,
    draft:     playbooks.filter(p => p.status === 'draft').length,
    published: playbooks.filter(p => p.status === 'published').length,
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 2rem' }}>

      {/* ── Top row ──────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'space-between', marginBottom: '2.5rem',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.875rem', fontWeight: 700,
            color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 4,
          }}>
            Welcome back, {displayName}.
          </h1>
          <p style={{ color: 'var(--color-text-2)', fontSize: '0.9rem' }}>
            {playbooks.length === 0 ? 'Create your first playbook to get started.' : `You have ${playbooks.length} playbook${playbooks.length !== 1 ? 's' : ''}.`}
          </p>
        </div>

        <Link href="/playbook/new" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '0.7rem 1.375rem',
          background: 'var(--color-accent)', color: 'white',
          borderRadius: 10, textDecoration: 'none',
          fontSize: '0.875rem', fontWeight: 700,
          boxShadow: '0 0 24px rgba(124,106,245,0.25)',
          flexShrink: 0,
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Playbook
        </Link>
      </div>

      {/* ── Profile + Stats ──────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: '2.5rem' }}>

        {/* Profile card (spans 1 column) */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 12,
          padding: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          gridColumn: '1 / 2',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, var(--color-accent) 0%, #c084fc 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', fontWeight: 700, color: 'white',
          }}>
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '1px 7px', borderRadius: 20,
                background: plan === 'pro' ? 'rgba(124,106,245,0.15)' : 'rgba(128,128,128,0.1)',
                color: plan === 'pro' ? 'var(--color-accent)' : 'var(--color-text-3)',
                border: `1px solid ${plan === 'pro' ? 'rgba(124,106,245,0.25)' : 'transparent'}`,
              }}>
                {plan}
              </span>
              {persona && (
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-3)', textTransform: 'capitalize' }}>
                  {persona}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <StatCard
          value={stats.total}
          label="Total Playbooks"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
        />
        <StatCard
          value={stats.published}
          label="Published"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>}
        />
        <StatCard
          value={stats.views.toLocaleString()}
          label="Total Views"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>}
        />
      </div>

      {/* ── Filter tabs ───────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '1.5rem' }}>
        {(['all', 'draft', 'published'] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              border: filter === tab ? '1px solid rgba(124,106,245,0.35)' : '1px solid var(--color-border)',
              background: filter === tab ? 'rgba(124,106,245,0.08)' : 'transparent',
              color: filter === tab ? 'var(--color-accent)' : 'var(--color-text-2)',
              fontSize: '0.8rem',
              fontWeight: filter === tab ? 700 : 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.12s',
            }}
          >
            {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span style={{
              fontSize: '0.65rem', fontWeight: 700,
              padding: '0px 5px', borderRadius: 10,
              background: filter === tab ? 'rgba(124,106,245,0.15)' : 'rgba(128,128,128,0.1)',
              color: filter === tab ? 'var(--color-accent)' : 'var(--color-text-3)',
            }}>
              {TAB_COUNTS[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Playbook grid ─────────────────────────────────── */}
      {filtered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {filtered.map((playbook) => (
            <PlaybookCard
              key={playbook.id}
              playbook={playbook}
              onDelete={handleDelete}
              deleting={deletingId === playbook.id}
            />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 16,
          padding: '5rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,106,245,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 64, height: 64, margin: '0 auto 1.25rem',
              background: 'rgba(124,106,245,0.1)', border: '1px solid rgba(124,106,245,0.2)',
              borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 8, letterSpacing: '-0.02em' }}>
              {filter === 'all' ? 'Your first playbook awaits.' : `No ${filter} playbooks yet.`}
            </h2>
            <p style={{ color: 'var(--color-text-2)', fontSize: '0.88rem', maxWidth: 360, margin: '0 auto 1.75rem', lineHeight: 1.65 }}>
              {filter === 'all'
                ? 'Take something boring — a process, a lesson, an idea — and turn it into something extraordinary.'
                : `You don't have any ${filter} playbooks. ${filter === 'draft' ? 'Start creating!' : 'Publish one from the editor.'}`
              }
            </p>
            {filter === 'all' && (
              <Link href="/playbook/new" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '0.8rem 2rem',
                background: 'var(--color-accent)', color: 'white',
                borderRadius: 10, textDecoration: 'none',
                fontSize: '0.9rem', fontWeight: 700,
                boxShadow: '0 0 32px rgba(124,106,245,0.3)',
              }}>
                Create your first playbook
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
