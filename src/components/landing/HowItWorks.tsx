"use client";

import { motion } from "framer-motion";
import { FloatEl, SketchFigureThinking, SketchLightbulb } from "./SketchElements";

const steps = [
  {
    num: "01",
    title: "UPLOAD YOUR RAW CONTENT",
    body: "Paste your SOP, notes, lesson plan, or product spec. Rough is fine — that's the point.",
    tag: "txt / pdf / docx / paste",
    color: "#d63a1a",
  },
  {
    num: "02",
    title: "STRUCTURE YOUR FLOW",
    body: "Pick a Vinyas — a layout framework built for your content type. Educational, Sales, Technical, or POC.",
    tag: "AI-suggested layouts",
    color: "#e8890a",
  },
  {
    num: "03",
    title: "STYLE YOUR BRAND",
    body: "Apply an Alaukik theme. Or scan your website URL and we'll match your brand's soul automatically.",
    tag: "5 theme bundles",
    color: "#ff5c2a",
  },
  {
    num: "04",
    title: "PUBLISH YOUR PLAYBOOK",
    body: "Share a link. Your audience gets a guided, visual experience. You get engagement data.",
    tag: "< 15 minutes total",
    color: "#d63a1a",
  },
];

export function HowItWorks() {
  return (
    <section style={{
      padding: '8rem 2rem',
      background: 'var(--color-bg-2)',
      borderTop: '1px solid var(--color-border)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Watercolor facade — decorative right accent */}
      <div style={{
        position: 'absolute',
        right: '-20px',
        top: '10%',
        width: '200px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.15,
      }}>
        <img
          src="/roman-empire/6807.jpg"
          alt=""
          style={{ width: '100%', display: 'block' }}
        />
      </div>
      <FloatEl x="-3%" y="12%" delay={0.8} amplitude={9} duration={7}>
        <SketchFigureThinking />
      </FloatEl>
      <FloatEl x="-2%" y="68%" delay={1.6} amplitude={8} duration={5.5}>
        <SketchLightbulb />
      </FloatEl>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: '5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 700, marginBottom: '1rem' }}>
              05 / THE PROCESS
            </p>
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
          </div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--color-text-2)',
            fontSize: '1rem',
            maxWidth: '280px',
            lineHeight: 1.65,
            margin: 0,
          }}>
            Four steps from raw idea to extraordinary playbook. Under 15 minutes.
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
                  margin: '0 0 0.75rem',
                }}>
                  {step.body}
                </p>
                <span style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: step.color,
                  border: `1px solid ${step.color}40`,
                  borderRadius: '2px',
                  padding: '0.2rem 0.6rem',
                }}>
                  {step.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
