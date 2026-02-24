import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function EditorLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const displayName = user?.email?.split('@')[0] ?? 'U';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-bg)' }}>
      <header style={{
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text)', textDecoration: 'none' }}>
            Kalpanic
          </Link>
          <div style={{ width: '1px', height: '20px', background: 'var(--color-border)' }} />
          <Link href="/dashboard" style={{ fontSize: '0.875rem', color: 'var(--color-text-2)', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user && (
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-2)' }}>
              {user.email}
            </span>
          )}
          <div style={{
            width: 32, height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-accent) 0%, #c084fc 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 700, color: 'white',
            cursor: 'pointer', flexShrink: 0,
          }}>
            {initials}
          </div>
        </div>
      </header>

      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
