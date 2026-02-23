"use client";

import { motion } from "framer-motion";

const problems = [
  {
    num: "01",
    title: "TOO LONG",
    sub: "Your 47-page SOP makes people's eyes glaze over before page 2.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6" />
        <path d="M6 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="14" x2="13" y2="14" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "TOO COMPLEX",
    sub: "Dense paragraphs hide the actual insight. Complexity kills comprehension.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="4" cy="4" r="1.5" />
        <circle cx="20" cy="4" r="1.5" />
        <circle cx="4" cy="20" r="1.5" />
        <circle cx="20" cy="20" r="1.5" />
        <circle cx="12" cy="12" r="1.5" />
        <path d="M4 4 Q14 7 20 4" />
        <path d="M4 4 Q6 14 4 20" />
        <path d="M20 4 Q17 14 20 20" />
        <path d="M4 20 Q14 17 20 20" />
        <path d="M4 4 Q8 11 12 12" />
        <path d="M20 4 Q16 10 12 12" />
        <path d="M20 20 Q15 15 12 12" />
        <path d="M20 4 Q11 11 4 20" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "NO VISUAL FLOW",
    sub: "Without visual hierarchy, there's no journey. Just walls of text.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="4" cy="12" r="2" />
        <circle cx="12" cy="5" r="2" />
        <circle cx="20" cy="15" r="2" />
        <circle cx="8" cy="19" r="2" />
        <circle cx="17" cy="4" r="2" />
        <path d="M6 12 L9 12" strokeDasharray="2 2" />
        <path d="M12 7 L13 10" strokeDasharray="2 2" />
        <path d="M10 18 L14 17" strokeDasharray="2 2" />
        <path d="M19 19 L21 21" />
        <path d="M21 19 L19 21" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "NO EMOTIONAL ENGAGEMENT",
    sub: "Nobody acts on what doesn't move them. Dry content creates passive readers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <line x1="8" y1="10" x2="10.5" y2="10" />
        <line x1="13.5" y1="10" x2="16" y2="10" />
        <path d="M9 15 Q12 14 15 15" />
        <path d="M16.5 6 L18 6 L16.5 4.5 L18 4.5" strokeWidth="1" />
      </svg>
    ),
  },
];

export function Problem() {
  return (
    <section style={{
      padding: "6rem 2rem",
      background: "var(--color-bg)",
      borderTop: "1px solid var(--color-border)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ornate corbel — decorative left accent */}
      <div style={{
        position: 'absolute',
        left: '-30px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '180px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.13,
      }}>
        <img
          src="/roman-empire/pd109-pdobj00129-image.jpg"
          alt=""
          style={{ width: '100%', display: 'block' }}
        />
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "3.5rem" }}
        >
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.7rem",
            color: "var(--color-accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            marginBottom: "1rem",
          }}>
            THE PROBLEM
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "var(--color-text)",
            textTransform: "uppercase" as const,
            lineHeight: 1.05,
            letterSpacing: "0.01em",
            margin: 0,
          }}>
            WHY YOUR DOCUMENTATION{" "}
            <span style={{ color: "var(--color-accent)" }}>FAILS.</span>
          </h2>
        </motion.div>

        {/* 2x2 Problem grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1px",
          background: "var(--color-border)",
          border: "1px solid var(--color-border)",
          borderRadius: "4px",
          overflow: "hidden",
        }}>
          {problems.map((problem, i) => (
            <ProblemCard key={problem.num} problem={problem} index={i} />
          ))}
        </div>

        {/* Bridge text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "var(--color-text-2)",
            textAlign: "center" as const,
            maxWidth: "500px",
            margin: "3rem auto 0",
            lineHeight: 1.6,
          }}
        >
          The solution isn&apos;t better writing. It&apos;s better thinking &mdash; visually.
        </motion.p>
      </div>
    </section>
  );
}

function ProblemCard({
  problem,
  index,
}: {
  problem: (typeof problems)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ backgroundColor: "rgba(255,255,255,0.035)" }}
      style={{
        background: "rgba(255,255,255,0.02)",
        borderTop: "3px solid var(--color-accent)",
        padding: "2rem",
        position: "relative" as const,
        cursor: "default",
      }}
    >
      {/* Card number — top right corner */}
      <span style={{
        position: "absolute" as const,
        top: "1.25rem",
        right: "1.25rem",
        fontFamily: "var(--font-display)",
        fontSize: "1.75rem",
        color: "var(--color-text)",
        opacity: 0.15,
        lineHeight: 1,
        userSelect: "none" as const,
      }}>
        {problem.num}
      </span>

      {/* Icon container */}
      <div style={{
        width: "48px",
        height: "48px",
        border: "1px solid var(--color-border)",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1.25rem",
        color: "var(--color-text-2)",
      }}>
        {problem.icon}
      </div>

      {/* Card title */}
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.25rem",
        color: "var(--color-text)",
        textTransform: "uppercase" as const,
        letterSpacing: "0.05em",
        marginBottom: "0.5rem",
        lineHeight: 1.15,
      }}>
        {problem.title}
      </div>

      {/* Card subtitle */}
      <p style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
        color: "var(--color-text-2)",
        lineHeight: 1.65,
        margin: 0,
      }}>
        {problem.sub}
      </p>
    </motion.div>
  );
}
