export default function PlaybookEditorPage({ params }: { params: { id: string } }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '260px 1fr 280px',
      height: 'calc(100vh - 56px)',
      overflow: 'hidden',
    }}>
      {/* Left sidebar: blocks */}
      <aside style={{
        borderRight: '1px solid var(--color-border)',
        padding: '1.5rem 1rem',
        overflowY: 'auto',
        background: 'var(--color-surface)',
      }}>
        <h3 style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Elements
        </h3>
        {[
          { icon: '📝', label: 'Text Block' },
          { icon: '📊', label: 'Data Visual' },
          { icon: '🖼️', label: 'Media' },
          { icon: '📋', label: 'Step Flow' },
          { icon: '💬', label: 'Quote' },
          { icon: '📌', label: 'Nakshi' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              padding: '0.625rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              cursor: 'grab',
              color: 'var(--color-text-2)',
              fontSize: '0.85rem',
              marginBottom: '0.25rem',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'var(--color-surface-2)';
              (e.currentTarget as HTMLDivElement).style.color = 'var(--color-text)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'transparent';
              (e.currentTarget as HTMLDivElement).style.color = 'var(--color-text-2)';
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </aside>

      {/* Canvas */}
      <main style={{
        overflowY: 'auto',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '720px',
          minHeight: '600px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <div style={{
            width: 56,
            height: 56,
            background: 'rgba(124,106,245,0.1)',
            border: '1px solid rgba(124,106,245,0.2)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <p style={{ color: 'var(--color-text-3)', fontSize: '0.9rem' }}>
            Drag elements here or click to add
          </p>
          <p style={{ color: 'var(--color-text-3)', fontSize: '0.75rem' }}>
            Playbook ID: {params.id}
          </p>
        </div>
      </main>

      {/* Right sidebar: theme/settings */}
      <aside style={{
        borderLeft: '1px solid var(--color-border)',
        padding: '1.5rem 1rem',
        overflowY: 'auto',
        background: 'var(--color-surface)',
      }}>
        <h3 style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Alaukik Theme
        </h3>
        {['Obsidian', 'Aurora', 'Ivory', 'Ember', 'Sage'].map((theme, i) => (
          <div key={i} style={{
            padding: '0.625rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            color: i === 0 ? 'var(--color-accent)' : 'var(--color-text-2)',
            background: i === 0 ? 'rgba(124,106,245,0.1)' : 'transparent',
            marginBottom: '0.25rem',
            border: `1px solid ${i === 0 ? 'rgba(124,106,245,0.3)' : 'transparent'}`,
          }}>
            {theme}
          </div>
        ))}

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
          <h3 style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Publish
          </h3>
          <button style={{
            width: '100%',
            padding: '0.75rem',
            background: 'var(--color-accent)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Publish Playbook
          </button>
        </div>
      </aside>
    </div>
  );
}
