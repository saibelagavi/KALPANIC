export default async function PlaybookSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>
        Playbook Settings
      </h1>
      <p style={{ color: 'var(--color-text-2)' }}>Settings for playbook {id} — Phase 2</p>
    </div>
  );
}
