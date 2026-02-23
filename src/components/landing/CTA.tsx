"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FloatEl, SketchFlame, SketchCrown } from "./SketchElements";

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

      {/* Roman profile — decorative right accent */}
      <div style={{
        position: 'absolute',
        right: '-60px',
        bottom: '-20px',
        width: '380px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.12,
      }}>
        <img
          src="/roman-empire/rm324-element-baifernn-02.jpg"
          alt=""
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      <FloatEl x="-2%" y="15%" delay={0.9} amplitude={8} duration={6.5}>
        <SketchFlame />
      </FloatEl>
      <FloatEl x="-3%" y="60%" delay={1.7} amplitude={10} duration={5.5}>
        <SketchCrown />
      </FloatEl>

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            color: 'var(--color-text)',
            opacity: 0.4,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.25rem',
          }}>
            OLD DOCUMENTATION
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            color: 'var(--color-text)',
          }}>
            EXPLAINS.
          </h2>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            marginBottom: '0',
            color: 'var(--color-accent)',
          }}>
            KALPANIC
          </h2>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 9vw, 7rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            marginBottom: '0',
            color: 'var(--color-accent)',
          }}>
            DEMONSTRATES.
          </h2>
        </motion.div>

        {/* 3-column manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1px',
            background: 'var(--color-border)',
            border: '1px solid var(--color-border)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '3.5rem',
          }}
        >
          {[
            { old: 'Old procedures instruct.', new: 'KALPANIC visualizes.' },
            { old: 'Old lessons inform.', new: 'KALPANIC transforms.' },
            { old: 'Old docs collect dust.', new: 'KALPANIC converts.' },
          ].map((item, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', textAlign: 'left' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.875rem', color: 'var(--color-text-3)', margin: '0 0 0.5rem', lineHeight: 1.5 }}>{item.old}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>{item.new}</p>
            </div>
          ))}
        </motion.div>

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
            Build Your First Playbook
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>

          <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--color-text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Free to start · No credit card · No boring allowed
          </p>
        </motion.div>
      </div>
    </section>
  );
}
