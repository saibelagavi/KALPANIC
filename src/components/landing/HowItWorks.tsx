"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "INPUT YOUR KALPANA",
    body: "Paste your brief, upload a doc, or type your idea. Raw input is fine — even a bullet list works.",
    color: "#d63a1a",
    icon: "✍",
  },
  {
    num: "02",
    title: "PICK A VINYAS",
    body: "Choose from AI-suggested layout frameworks. Educational, Sales, Technical, or POC — each built for your goal.",
    color: "#e8890a",
    icon: "⊞",
  },
  {
    num: "03",
    title: "APPLY YOUR ALAUKIK",
    body: "Select from 5 extraordinary aesthetic themes. Scan your website URL and we'll match your brand soul automatically.",
    color: "#ff5c2a",
    icon: "◈",
  },
  {
    num: "04",
    title: "PUBLISH & CAPTIVATE",
    body: "Share a permanent link. Viewers experience Play Mode — a guided, animated story through your content.",
    color: "#d63a1a",
    icon: "→",
  },
];

export function HowItWorks() {
  return (
    <section style={{
      padding: '8rem 2rem',
      background: 'var(--color-bg-2)',
      borderTop: '1px solid var(--color-border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}
        >
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-text)',
            lineHeight: 0.95,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            FOUR STEPS TO<br />
            <span style={{ color: 'var(--color-accent)' }}>EXTRAORDINARY.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--color-text-2)',
            fontSize: '1rem',
            maxWidth: '280px',
            lineHeight: 1.65,
            margin: 0,
          }}>
            From raw idea to published playbook — in under 15 minutes.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: '2rem',
                padding: '2rem 2.5rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Big background number */}
              <div style={{
                position: 'absolute',
                right: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-display)',
                fontSize: '8rem',
                color: step.color,
                opacity: 0.04,
                lineHeight: 1,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>{step.num}</div>

              {/* Step number */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                color: step.color,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {step.num}
              </div>

              {/* Content */}
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                  color: 'var(--color-text)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  margin: '0 0 0.5rem 0',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--color-text-2)',
                  lineHeight: 1.65,
                  maxWidth: '560px',
                  margin: 0,
                }}>
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
