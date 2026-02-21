export default function PublishedPlaybookPage({ params }: { params: { slug: string } }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '1.5rem',
      padding: '2rem',
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
          Kalpanic
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          {params.slug.replace(/-/g, ' ')}
        </h1>
        <p style={{ color: 'var(--color-text-2)', marginBottom: '2rem' }}>
          This playbook is coming soon.
        </p>
        <a href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          background: 'var(--color-accent)',
          color: 'white',
          borderRadius: 'var(--radius-md)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600,
        }}>
          Create your own
        </a>
      </div>
    </div>
  );
}
