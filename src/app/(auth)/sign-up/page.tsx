"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persona, setPersona] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const personas = [
    { value: "founder", label: "Founder / Entrepreneur" },
    { value: "educator", label: "Educator / Teacher" },
    { value: "pm", label: "Product Manager" },
    { value: "marketer", label: "Marketer" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name, persona: persona || "other" },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // If email confirmation is disabled, user is immediately active
    if (data.user && data.session) {
      // Upsert profile row
      await supabase.from("profiles").upsert({
        id: data.user.id,
        display_name: name,
        persona: (persona || "other") as "founder" | "educator" | "pm" | "marketer" | "other",
      });
      router.push("/dashboard");
      return;
    }

    // Email confirmation required
    setSuccess(true);
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.15s ease',
  };

  const labelStyle = {
    display: 'block' as const,
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    color: 'var(--color-text-2)',
    fontWeight: 500,
  };

  if (success) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <div style={{
          width: 64, height: 64, borderRadius: '50%',
          background: 'rgba(214,58,26,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-text)', marginBottom: '0.75rem' }}>
          Check your inbox
        </h2>
        <p style={{ color: 'var(--color-text-2)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 320, margin: '0 auto 1.5rem' }}>
          We sent a confirmation link to <strong style={{ color: 'var(--color-text)' }}>{email}</strong>.
          Click it to activate your account and start creating.
        </p>
        <p style={{ color: 'var(--color-text-3)', fontSize: '0.8rem' }}>
          Didn&apos;t get it? Check spam or{' '}
          <button onClick={() => setSuccess(false)} style={{ background: 'none', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', padding: 0, fontSize: 'inherit' }}>
            try again
          </button>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          lineHeight: 1.2,
          marginBottom: '0.5rem'
        }}>
          Start for free
        </h1>
        <p style={{ color: 'var(--color-text-2)', fontSize: '0.95rem' }}>
          No credit card required. Your first playbook is on us.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" style={labelStyle}>Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'} />
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'} />
        </div>

        <div>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required minLength={8} style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'} />
        </div>

        <div>
          <label htmlFor="persona" style={labelStyle}>I am a...</label>
          <select
            id="persona"
            value={persona}
            onChange={(e) => setPersona(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer' }}
            onFocus={(e) => (e.target as HTMLSelectElement).style.borderColor = 'var(--color-accent)'}
            onBlur={(e) => (e.target as HTMLSelectElement).style.borderColor = 'var(--color-border)'}
          >
            <option value="" disabled>Select your role</option>
            {personas.map(p => (
              <option key={p.value} value={p.value} style={{ background: 'var(--color-surface)', color: 'var(--color-text)' }}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p style={{ color: 'var(--color-error)', fontSize: '0.875rem', padding: '0.75rem', background: 'rgba(245,66,66,0.1)', borderRadius: 'var(--radius-md)' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.875rem',
            background: 'var(--color-accent)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.95rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.15s ease',
            boxShadow: 'var(--shadow-accent)',
          }}
        >
          {loading ? "Creating account..." : "Create free account"}
        </button>
      </form>

      <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--color-text-2)', fontSize: '0.875rem' }}>
        Already have an account?{" "}
        <Link href="/sign-in" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 500 }}>
          Sign in
        </Link>
      </p>

      <p style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--color-text-3)', fontSize: '0.75rem', lineHeight: 1.5 }}>
        By creating an account, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
