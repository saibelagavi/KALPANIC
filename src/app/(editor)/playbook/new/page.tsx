"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const vinyasOptions = [
  {
    id: "educational",
    name: "Educational",
    description: "Step-by-step concept progression. Perfect for teaching and training.",
    icon: "🎓",
    color: "#2d6e3e",
  },
  {
    id: "sales",
    name: "Sales / Pitch",
    description: "Problem → Solution → Proof → CTA. Built for investor decks and client proposals.",
    icon: "⚡",
    color: "#ff6b20",
  },
  {
    id: "technical",
    name: "Technical",
    description: "Architecture, specs, and implementation guides with deep structure.",
    icon: "⚙️",
    color: "#60a5fa",
  },
  {
    id: "poc",
    name: "POC / Concept",
    description: "Explore an idea from insight to vision. Great for early-stage narratives.",
    icon: "💡",
    color: "#7c6af5",
  },
];

const themeOptions = [
  { id: "obsidian", name: "Obsidian", color: "#7c6af5", bg: "#0a0a0f", tagline: "Dark · Editorial · Luxury" },
  { id: "aurora", name: "Aurora", color: "#00d4ff", bg: "#050a12", tagline: "Sci-fi · Vivid · Electric" },
  { id: "ivory", name: "Ivory", color: "#2d1b69", bg: "#faf9f6", tagline: "Light · Print · Refined" },
  { id: "ember", name: "Ember", color: "#ff6b20", bg: "#0f0a08", tagline: "Warm · Bold · Founder" },
  { id: "sage", name: "Sage", color: "#2d6e3e", bg: "#f4f6f4", tagline: "Natural · Calm · Focused" },
];

export default function NewPlaybookPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [persona, setPersona] = useState("");
  const [selectedVinyas, setSelectedVinyas] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("obsidian");

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'var(--font-body)',
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem' }}>
      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
        {[1, 2, 3].map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: s <= step ? 'var(--color-accent)' : 'var(--color-surface)',
              border: `1px solid ${s <= step ? 'var(--color-accent)' : 'var(--color-border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: s <= step ? 'white' : 'var(--color-text-3)',
            }}>
              {s < step ? '✓' : s}
            </div>
            {s < 3 && (
              <div style={{
                width: '4rem',
                height: '2px',
                background: s < step ? 'var(--color-accent)' : 'var(--color-border)',
              }} />
            )}
          </div>
        ))}
        <span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'var(--color-text-3)' }}>
          {step === 1 && 'Your Kalpana'}
          {step === 2 && 'Choose Vinyas'}
          {step === 3 && 'Pick Theme'}
        </span>
      </div>

      {/* Step 1: Kalpana */}
      {step === 1 && (
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            What are you creating?
          </h1>
          <p style={{ color: 'var(--color-text-2)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Your Kalpana — the raw imagination that becomes a playbook.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-2)', fontWeight: 500 }}>
                Title *
              </label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Q4 Product Onboarding Guide"
                style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--color-accent)'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--color-border)'; }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-2)', fontWeight: 500 }}>
                What is this about?
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe your content in a few sentences. Paste text, bullet points — anything works."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
                onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--color-accent)'; }}
                onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'var(--color-border)'; }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-2)', fontWeight: 500 }}>
                Goal — what should the viewer do or feel after?
              </label>
              <input
                value={goal}
                onChange={e => setGoal(e.target.value)}
                placeholder="e.g. Understand our onboarding process and feel confident on Day 1"
                style={inputStyle}
                onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--color-accent)'; }}
                onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'var(--color-border)'; }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-2)', fontWeight: 500 }}>
                I am a...
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['founder', 'educator', 'pm', 'marketer', 'other'].map(p => (
                  <button key={p} onClick={() => setPersona(p)} style={{
                    padding: '0.5rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    border: `1px solid ${persona === p ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    background: persona === p ? 'rgba(124,106,245,0.15)' : 'var(--color-surface)',
                    color: persona === p ? 'var(--color-accent)' : 'var(--color-text-2)',
                    fontSize: '0.825rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}>
                    {p === 'pm' ? 'Product Manager' : p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Suppress unused variable warnings for Phase 1 */}
          <input type="hidden" value={description} readOnly />
          <input type="hidden" value={goal} readOnly />

          <div style={{ marginTop: '2.5rem' }}>
            <button
              onClick={() => setStep(2)}
              disabled={!title}
              style={{
                padding: '0.875rem 2rem',
                background: 'var(--color-accent)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: title ? 'pointer' : 'not-allowed',
                opacity: title ? 1 : 0.5,
              }}
            >
              Continue to layout →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Vinyas */}
      {step === 2 && (
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Choose your Vinyas
          </h1>
          <p style={{ color: 'var(--color-text-2)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            A Vinyas is a layout framework — the structural DNA of your playbook.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {vinyasOptions.map(v => (
              <button key={v.id} onClick={() => setSelectedVinyas(v.id)} style={{
                padding: '1.5rem',
                background: selectedVinyas === v.id ? `${v.color}12` : 'var(--color-surface)',
                border: `1px solid ${selectedVinyas === v.id ? v.color : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
                opacity: selectedVinyas && selectedVinyas !== v.id ? 0.6 : 1,
              }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{v.icon}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.375rem' }}>{v.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-2)', lineHeight: 1.5 }}>{v.description}</div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
            <button onClick={() => setStep(1)} style={{
              padding: '0.875rem 1.5rem',
              background: 'var(--color-surface)',
              color: 'var(--color-text-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}>
              ← Back
            </button>
            <button onClick={() => setStep(3)} disabled={!selectedVinyas} style={{
              padding: '0.875rem 2rem',
              background: 'var(--color-accent)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: selectedVinyas ? 'pointer' : 'not-allowed',
              opacity: selectedVinyas ? 1 : 0.5,
            }}>
              Continue to theme →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Theme */}
      {step === 3 && (
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Pick your Alaukik theme
          </h1>
          <p style={{ color: 'var(--color-text-2)', marginBottom: '2rem', fontSize: '0.95rem' }}>
            Each theme is a complete aesthetic universe.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {themeOptions.map(t => (
              <button key={t.id} onClick={() => setSelectedTheme(t.id)} style={{
                padding: '1rem 1.25rem',
                background: selectedTheme === t.id ? `${t.color}12` : 'var(--color-surface)',
                border: `1px solid ${selectedTheme === t.id ? t.color : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textAlign: 'left',
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--radius-md)',
                  background: t.bg,
                  border: `2px solid ${t.color}`,
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--color-text-3)' }}>{t.tagline}</div>
                </div>
                {selectedTheme === t.id && (
                  <div style={{ marginLeft: 'auto', color: t.color }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
            <button onClick={() => setStep(2)} style={{
              padding: '0.875rem 1.5rem',
              background: 'var(--color-surface)',
              color: 'var(--color-text-2)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}>
              ← Back
            </button>
            <button onClick={() => router.push('/dashboard')} style={{
              padding: '0.875rem 2rem',
              background: 'var(--color-accent)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 30px rgba(124,106,245,0.3)',
            }}>
              Create Playbook ✦
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
