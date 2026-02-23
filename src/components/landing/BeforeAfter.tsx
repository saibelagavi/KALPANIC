"use client";

import { motion } from "framer-motion";
import { FloatEl, SketchStar, SketchCrown } from "./SketchElements";

export function BeforeAfter() {
  return (
    <section style={{
      padding: '8rem 2rem',
      background: 'var(--color-bg-2)',
      borderTop: '1px solid var(--color-border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <FloatEl x="-3%" y="20%" delay={0.7} amplitude={9} duration={6.5}>
        <SketchStar />
      </FloatEl>
      <FloatEl x="90%" y="60%" delay={1.2} amplitude={11} duration={5.5}>
        <SketchCrown />
      </FloatEl>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1rem' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 10vw, 7rem)',
              color: 'var(--color-border-2)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              userSelect: 'none',
            }}>02</span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: 'var(--color-accent)',
              lineHeight: 1,
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              THE TRANSFORMATION
            </h2>
          </div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: 'var(--color-text-2)',
            maxWidth: '480px',
            marginLeft: 'calc(clamp(4rem, 10vw, 7rem) + 1.5rem)',
          }}>
            From static files to dynamic playbooks. Same content — completely different impact.
          </p>
        </motion.div>

        {/* Split screen */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3px',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid var(--color-border)',
        }}>
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#1c1c1c',
              padding: '3rem 2.5rem',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255,255,255,0.06)',
              padding: '0.3rem 0.875rem',
              borderRadius: '2px',
            }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase' }}>Before</span>
            </div>

            <div style={{ marginTop: '2.5rem', fontFamily: 'Arial, sans-serif', position: 'relative' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#aaa', marginBottom: '1rem' }}>
                product_onboarding_v3_FINAL(2).docx
              </div>
              <div style={{ borderLeft: '3px solid #444', paddingLeft: '1rem', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', color: '#777', lineHeight: 1.85 }}>
                  Step 1: The employee must complete the mandatory compliance training module which is available at the following internal URL: https://internal.company.com/hr/training/compliance/2024/mandatory-all-staff...
                </p>
              </div>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ height: '0.65rem', background: '#2a2a2a', borderRadius: '2px', marginBottom: '0.5rem', width: `${75 - i * 8}%` }} />
              ))}
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#242424', border: '1px solid #333' }}>
                <p style={{ fontSize: '0.7rem', color: '#666', lineHeight: 1.7 }}>
                  NOTE: Please see attachment B for the system access form. Also refer to slide 23 of the presentation from the Q2 all-hands for context on the broader strategy.
                </p>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '0.5rem',
                right: '0.5rem',
                fontSize: '1.25rem',
                opacity: 0.4,
                userSelect: 'none',
              }}>
                😴
              </div>
            </div>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: 'linear-gradient(135deg, #110900 0%, #1a0e05 100%)',
              padding: '3rem 2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0, right: 0,
              width: '200px', height: '200px',
              background: 'radial-gradient(circle, rgba(214,58,26,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(214,58,26,0.15)',
              border: '1px solid rgba(214,58,26,0.4)',
              padding: '0.3rem 0.875rem',
              borderRadius: '2px',
              whiteSpace: 'nowrap',
            }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--color-accent)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase' }}>After — Kalpanic</span>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, var(--color-accent), var(--color-amber))', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--color-text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Aurora Launch — Product Playbook</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.75rem', color: 'var(--color-text-2)' }}>Go-to-market strategy</div>
                </div>
              </div>

              {[
                { num: '01', title: 'Market Research', color: '#d63a1a', done: true },
                { num: '02', title: 'Launch Strategy', color: '#e8890a', done: true },
                { num: '03', title: 'Distribution', color: '#ff5c2a', done: false },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${step.done ? step.color + '40' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '2px',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.7rem', color: step.color, letterSpacing: '0.05em', flexShrink: 0 }}>{step.num}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: step.done ? 'var(--color-text)' : 'var(--color-text-3)', flex: 1 }}>{step.title}</span>
                  {step.done ? (
                    <svg style={{ flexShrink: 0, color: step.color }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: step.color, letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>In progress</span>
                  )}
                </motion.div>
              ))}

              <div style={{ marginTop: '1rem', height: '2px', background: `linear-gradient(90deg, var(--color-accent), var(--color-amber), var(--color-accent-2))`, borderRadius: '1px' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
