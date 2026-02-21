"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTA() {
  return (
    <section style={{
      padding: '8rem 2rem',
      background: 'var(--color-bg)',
      borderTop: '1px solid var(--color-border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(214,58,26,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(214,58,26,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Bottom glow */}
      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(214,58,26,0.18) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <span style={{ display: 'block', width: '40px', height: '1px', background: 'var(--color-accent)' }} />
          The Manifesto
          <span style={{ display: 'block', width: '40px', height: '1px', background: 'var(--color-accent)' }} />
        </motion.div>

        {/* Headline line 1 */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            color: 'var(--color-text)',
          }}
        >
          THE BORING
        </motion.h2>

        {/* Headline line 2 (red) */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            marginBottom: '3rem',
            color: 'var(--color-accent)',
            WebkitTextStroke: '1px var(--color-accent)',
          }}
        >
          ENDS HERE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.15rem',
            color: 'var(--color-text-2)',
            maxWidth: '500px',
            margin: '0 auto 3.5rem',
            lineHeight: 1.65,
          }}
        >
          Join the early access cohort. First three playbooks free.
          No credit card. No friction. Just extraordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <Link href="/sign-up" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1.125rem 3rem',
            background: 'var(--color-accent)',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            borderRadius: '2px',
            boxShadow: '5px 5px 0px rgba(214,58,26,0.4)',
            transition: 'transform 0.1s ease, box-shadow 0.1s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translate(-2px,-2px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '7px 7px 0px rgba(214,58,26,0.4)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)';
            (e.currentTarget as HTMLElement).style.boxShadow = '5px 5px 0px rgba(214,58,26,0.4)';
          }}
          >
            Start for Free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--color-text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            No credit card · 3 free playbooks · Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
