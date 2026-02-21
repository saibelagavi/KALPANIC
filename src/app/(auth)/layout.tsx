export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-3) 100%)' }}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 50%, var(--color-accent-glow) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(124,106,245,0.1) 0%, transparent 50%)'
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <a href="/" className="inline-flex items-center gap-2">
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)' }}>
              Kalpanic
            </span>
          </a>
        </div>

        {/* Quote */}
        <div className="relative z-10 max-w-sm">
          <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', lineHeight: 1.3, fontStyle: 'italic', color: 'var(--color-text)' }}>
            "The boring brief<br />ends here."
          </blockquote>
          <p className="mt-4" style={{ color: 'var(--color-text-2)', fontSize: '0.95rem' }}>
            Where imagination meets extraordinary craft.
          </p>
        </div>

        {/* Theme dots */}
        <div className="relative z-10 flex items-center gap-3">
          {['#7c6af5', '#00d4ff', '#ff6b20', '#2d6e3e', '#2d1b69'].map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
          <span style={{ color: 'var(--color-text-3)', fontSize: '0.75rem', marginLeft: '0.5rem' }}>5 Alaukik themes</span>
        </div>
      </div>

      {/* Right panel - form */}
      <div
        className="flex-1 flex items-center justify-center p-8"
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8">
            <a href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', textDecoration: 'none' }}>
              Kalpanic
            </a>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
