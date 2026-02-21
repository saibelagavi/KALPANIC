"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        backdropFilter: 'blur(16px)',
        background: scrolled ? 'rgba(14,10,6,0.92)' : 'transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 400,
          color: 'var(--color-text)',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          KALPANIC
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {['Features', 'Pricing'].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`} style={{
              color: 'var(--color-text-2)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 500,
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-2)')}
            >
              {item}
            </Link>
          ))}
          <Link href="/sign-in" style={{
            color: 'var(--color-text-2)',
            textDecoration: 'none',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
            transition: 'color 0.15s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-2)')}
          >
            Sign In
          </Link>
          <Link href="/sign-up" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            background: 'var(--color-accent)',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-accent)',
            transition: 'background 0.15s ease, transform 0.15s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Start Free →
          </Link>
        </div>
      </nav>

      <main style={{ paddingTop: '56px' }}>
        {children}
      </main>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--color-border)',
        padding: '4rem 2rem 2rem',
        background: 'var(--color-bg-2)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-text)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                KALPANIC
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-text-2)', fontSize: '0.9rem', maxWidth: '280px' }}>
                "Make boring extraordinary."
              </p>
            </div>
            <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
              {[
                { heading: 'Product', links: ['Features', 'Pricing', 'Changelog'] },
                { heading: 'Use Cases', links: ['Educators', 'Founders', 'Product Managers'] },
                { heading: 'Company', links: ['About', 'Privacy', 'Terms'] },
              ].map(col => (
                <div key={col.heading}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '1rem' }}>
                    {col.heading}
                  </div>
                  {col.links.map(link => (
                    <div key={link} style={{ marginBottom: '0.5rem' }}>
                      <a href="#" style={{ fontSize: '0.85rem', color: 'var(--color-text-3)', textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-3)')}
                      >{link}</a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-3)', letterSpacing: '0.05em' }}>
              © 2026 KALPANIC. ALL RIGHTS RESERVED.
            </p>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.8rem', color: 'var(--color-text-3)' }}>
              The boring brief ends here.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
