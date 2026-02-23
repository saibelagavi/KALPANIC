"use client";

import { motion } from "framer-motion";
import { FloatEl, SketchFigureWriter, SketchStar } from "./SketchElements";

const testimonials = [
  {
    num: "I",
    quote: "I shared my first Kalpanic playbook instead of slides for our Series A pitch. The lead investor asked if we had a design team. We don't.",
    name: "Priya Mehta",
    role: "Founder, Flowsync",
    initials: "PM",
    color: "#d63a1a",
  },
  {
    num: "II",
    quote: "My students actually read the module now. I've been teaching for 11 years and nothing has ever changed engagement like this did.",
    name: "Mr. Okonkwo",
    role: "Physics Teacher, Lekki Secondary",
    initials: "AO",
    color: "#e8890a",
  },
  {
    num: "III",
    quote: "We replaced our entire onboarding SOP library with Kalpanic playbooks. Support tickets dropped by 60%.",
    name: "Daria V.",
    role: "Head of Product, Tessera",
    initials: "DV",
    color: "#ff5c2a",
  },
];

export function Testimonials() {
  return (
    <section style={{ padding: '8rem 2rem', background: 'var(--color-bg)', borderTop: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}>
      <FloatEl x="-3%" y="18%" delay={0.5} amplitude={9} duration={6}>
        <SketchFigureWriter />
      </FloatEl>
      <FloatEl x="88%" y="65%" delay={1.4} amplitude={11} duration={7}>
        <SketchStar />
      </FloatEl>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '5rem' }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--color-text)', lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', margin: 0 }}>
            THEY STOPPED<br /><span style={{ color: 'var(--color-accent)' }}>EXPLAINING TOO.</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 180px',
                gap: '3rem',
                padding: '3rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                alignItems: 'center',
              }}
            >
              {/* Roman numeral */}
              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2rem', color: t.color, opacity: 0.5, lineHeight: 1 }}>
                {t.num}
              </div>

              {/* Quote */}
              <blockquote style={{ margin: 0 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', color: t.color, lineHeight: 0.7, marginBottom: '0.5rem', opacity: 0.3 }}>&ldquo;</div>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--color-text)', lineHeight: 1.75, margin: 0 }}>
                  {t.quote}
                </p>
              </blockquote>

              {/* Attribution */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '2px', background: `${t.color}20`, border: `1px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '0.75rem', color: t.color, flexShrink: 0, letterSpacing: '0.05em' }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.125rem' }}>{t.name}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-text-3)', lineHeight: 1.4 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
