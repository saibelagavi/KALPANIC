"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const personas = [
  {
    num: "02",
    icon: "🎓",
    role: "THE EDUCATOR",
    headline: "Your lessons deserve to be experienced, not just read.",
    body: "Turn photosynthesis into a visual journey your students actually remember. Engagement up. Zone-outs eliminated.",
    tag: "Lesson Plans → Visual Stories",
    color: "#e8890a",
    href: "/use-cases/educators",
  },
  {
    num: "03",
    icon: "⚡",
    role: "THE FOUNDER",
    headline: "Your investor pitch deserves better than a Google Doc.",
    body: "Your POC, your product spec, your vision — make it impossible to ignore. First impressions are everything.",
    tag: "Product Docs → Compelling Narratives",
    color: "#d63a1a",
    href: "/use-cases/founders",
  },
  {
    num: "04",
    icon: "📐",
    role: "THE PM",
    headline: "SOPs your team will actually read.",
    body: "Onboarding flows they'll follow. Procedures that feel like guided experiences, not instruction manuals.",
    tag: "SOPs → Guided Systems",
    color: "#ff5c2a",
    href: "/use-cases/product-managers",
  },
  {
    num: "05",
    icon: "📣",
    role: "THE MARKETER",
    headline: "Product guides that feel like brand campaigns.",
    body: "Explainers that convert. Content your audience forwards instead of files they archive and forget.",
    tag: "Guides → Brand Experiences",
    color: "#e8890a",
    href: "/use-cases/marketers",
  },
];

export function PersonaShowcase() {
  return (
    <section style={{
      padding: '8rem 2rem',
      background: 'var(--color-bg)',
      borderTop: '1px solid var(--color-border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '5rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>
            03 / WHO IT&apos;S FOR
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-text)',
            lineHeight: 0.95,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            margin: '0 0 1rem',
          }}>
            BUILT FOR THE PEOPLE<br />
            <span style={{ color: 'var(--color-accent)' }}>
              WHO MAKE THINGS CLEAR.
            </span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--color-text-2)',
            margin: 0,
          }}>
            Built for the people who spend their lives trying to make things understood.
          </p>
        </motion.div>

        {/* Cards — horizontal editorial layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {personas.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={p.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr auto',
                  alignItems: 'center',
                  gap: '3rem',
                  padding: '2.5rem 3rem',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderLeft: `4px solid ${p.color}`,
                  transition: 'background 0.2s ease, border-left-color 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-2)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-surface)'; }}
                >
                  {/* Number */}
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      color: p.color,
                      lineHeight: 1,
                      opacity: 0.4,
                      letterSpacing: '-0.02em',
                    }}>{p.num}</div>
                  </div>

                  {/* Content */}
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: p.color,
                      marginBottom: '0.625rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                    }}>
                      <span>{p.icon} {p.role}</span>
                      <span style={{ padding: '0.15rem 0.5rem', border: `1px solid ${p.color}40`, borderRadius: '2px', fontSize: '0.6rem', color: p.color, opacity: 0.8 }}>{p.tag}</span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                      color: 'var(--color-text)',
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      lineHeight: 1.1,
                      margin: '0 0 0.75rem 0',
                    }}>
                      {p.headline.toUpperCase()}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '0.95rem',
                      color: 'var(--color-text-2)',
                      lineHeight: 1.6,
                      maxWidth: '500px',
                      margin: 0,
                    }}>
                      {p.body}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div style={{ color: p.color, opacity: 0.6 }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
