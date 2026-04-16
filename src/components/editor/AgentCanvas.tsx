'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface AgentState {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'waiting' | 'running' | 'done' | 'error';
  message: string;
}

interface BlockSkeleton {
  id: string;
  type: string;
}

interface AgentCanvasProps {
  playbookId: string;
  title: string;
  description: string;
  goal: string;
  persona: string;
  vinyas: string;
  theme: string;
}

const BLOCK_COLORS: Record<string, string> = {
  text:         '#7c6af5',
  'data-visual':'#00d4ff',
  media:        '#ff6b20',
  'step-flow':  '#2d6e3e',
  quote:        '#f59e0b',
  nakshi:       '#e879f9',
};

const BLOCK_LABELS: Record<string, string> = {
  text:         'Text',
  'data-visual':'Data',
  media:        'Visual',
  'step-flow':  'Steps',
  quote:        'Quote',
  nakshi:       'Callout',
};

function BlockTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'text':
      return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h10"/></svg>;
    case 'data-visual':
      return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="12" width="4" height="9"/><rect x="10" y="7" width="4" height="14"/><rect x="17" y="3" width="4" height="18"/></svg>;
    case 'media':
      return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
    case 'step-flow':
      return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><path d="M6 8v8M9 6h11M9 18h11"/></svg>;
    case 'quote':
      return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21c3 0 7-1 7-8V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6c0 1.1.9 2 2 2h2c0 3-1 5-3 5m13 0c3 0 7-1 7-8V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6c0 1.1.9 2 2 2h2c0 3-1 5-3 5"/></svg>;
    case 'nakshi':
      return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>;
    default:
      return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>;
  }
}

function AgentCard({ agent }: { agent: AgentState }) {
  const statusColor = {
    waiting: '#4a4a5a',
    running: '#7c6af5',
    done:    '#22c55e',
    error:   '#ef4444',
  }[agent.status];

  const isRunning = agent.status === 'running';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: agent.status === 'running'
          ? 'rgba(124, 106, 245, 0.08)'
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${agent.status === 'running' ? 'rgba(124,106,245,0.4)' : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: isRunning ? '0 0 20px rgba(124,106,245,0.15)' : 'none',
      }}
    >
      {/* Animated glow bar when running */}
      {isRunning && (
        <motion.div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #7c6af5, transparent)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        {/* Status dot */}
        <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
          <div style={{
            width: 10, height: 10,
            borderRadius: '50%',
            background: statusColor,
          }} />
          {isRunning && (
            <motion.div
              style={{
                position: 'absolute',
                inset: -3,
                borderRadius: '50%',
                border: `1px solid ${statusColor}`,
                opacity: 0.5,
              }}
              animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>

        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.9)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          {agent.name}
        </span>

        {agent.status === 'done' && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ marginLeft: 'auto', color: '#22c55e', fontSize: '0.75rem' }}
          >
            ✓
          </motion.span>
        )}
        {agent.status === 'error' && (
          <span style={{ marginLeft: 'auto', color: '#ef4444', fontSize: '0.75rem' }}>✗</span>
        )}
      </div>

      <div style={{
        fontSize: '0.725rem',
        color: 'rgba(255,255,255,0.45)',
        lineHeight: 1.4,
        paddingLeft: '1.375rem',
      }}>
        {agent.icon}
        {agent.message || (agent.status === 'waiting' ? 'Queued...' : '')}
      </div>
    </motion.div>
  );
}

export function AgentCanvas({
  playbookId, title, description, goal, persona, vinyas, theme,
}: AgentCanvasProps) {
  const router = useRouter();
  const abortRef = useRef<AbortController | null>(null);

  const [agents, setAgents] = useState<AgentState[]>([
    { id: 'strategist', name: 'Strategist', icon: null, status: 'waiting', message: 'Queued' },
    { id: 'images',     name: 'Visual Director', icon: null, status: 'waiting', message: 'Queued' },
    { id: 'assembler',  name: 'Assembler', icon: null, status: 'waiting', message: 'Queued' },
  ]);
  const [blocks, setBlocks] = useState<BlockSkeleton[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  function updateAgent(id: string, patch: Partial<AgentState>) {
    setAgents((prev) => prev.map((a) => a.id === id ? { ...a, ...patch } : a));
  }

  useEffect(() => {
    const abort = new AbortController();
    abortRef.current = abort;

    async function run() {
      try {
        setProgress(5);
        const response = await fetch('/api/generate-playbook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ playbookId, title, description, goal, persona, vinyas, theme }),
          signal: abort.signal,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done: streamDone, value } = await reader.read();
          if (streamDone) break;

          buffer += decoder.decode(value, { stream: true });

          // Parse complete SSE messages (separated by \n\n)
          const messages = buffer.split('\n\n');
          buffer = messages.pop() ?? '';

          for (const message of messages) {
            const eventMatch = message.match(/^event: (.+)/m);
            const dataMatch = message.match(/^data: (.+)/m);
            if (!dataMatch) continue;

            const event = eventMatch?.[1]?.trim() ?? 'message';
            let data: Record<string, unknown>;
            try {
              data = JSON.parse(dataMatch[1]);
            } catch {
              continue;
            }

            switch (event) {
              case 'ping': break; // keep-alive, ignore
              case 'agent': {
                const { id, status, message: msg } = data as {
                  id: string; status: string; message: string;
                };
                updateAgent(id, {
                  status: status as AgentState['status'],
                  message: msg,
                });
                if (id === 'strategist' && status === 'running') setProgress(15);
                if (id === 'strategist' && status === 'done') setProgress(45);
                if (id === 'images' && status === 'running') setProgress(55);
                if (id === 'images' && status === 'done') setProgress(80);
                if (id === 'assembler' && status === 'running') setProgress(85);
                if (id === 'assembler' && status === 'done') setProgress(98);
                break;
              }
              case 'blocks': {
                const { blocks: b } = data as { blocks: BlockSkeleton[] };
                setBlocks(b);
                break;
              }
              case 'complete': {
                setProgress(100);
                setDone(true);
                break;
              }
              case 'error': {
                const { message: msg } = data as { message: string };
                setError(msg);
                break;
              }
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Something went wrong');
      }
    }

    run();
    return () => abort.abort();
  }, [playbookId, title, description, goal, persona, vinyas, theme]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#070710',
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'var(--font-body, system-ui)',
    }}>
      {/* Background shimmer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124,106,245,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '680px', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#7c6af5',
            background: 'rgba(124,106,245,0.1)',
            border: '1px solid rgba(124,106,245,0.25)',
            borderRadius: '99px',
            padding: '0.25rem 0.875rem',
            marginBottom: '1rem',
          }}>
            Kalpanic AI
          </div>
          <h1 style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 800,
            color: 'rgba(255,255,255,0.92)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-display, serif)',
          }}>
            {done ? 'Your playbook is ready ✦' : 'Conjuring your playbook...'}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.35)' }}>
            {done
              ? 'All agents completed. Open the editor to review and refine.'
              : 'AI agents are working in parallel to craft your content and visuals.'}
          </p>
        </motion.div>

        {/* Progress bar */}
        <div style={{
          height: '3px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '99px',
          overflow: 'hidden',
          marginBottom: '2rem',
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #7c6af5, #00d4ff)',
              borderRadius: '99px',
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Agent cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}>
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Block preview strip */}
        <AnimatePresence>
          {blocks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              style={{ marginBottom: '2rem' }}
            >
              <div style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: '0.75rem',
              }}>
                {blocks.length} blocks generated
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {blocks.map((block, i) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      padding: '0.35rem 0.75rem',
                      background: `${BLOCK_COLORS[block.type] ?? '#7c6af5'}18`,
                      border: `1px solid ${BLOCK_COLORS[block.type] ?? '#7c6af5'}33`,
                      borderRadius: '99px',
                      color: BLOCK_COLORS[block.type] ?? '#7c6af5',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                    }}
                  >
                    <BlockTypeIcon type={block.type} />
                    {BLOCK_LABELS[block.type] ?? block.type}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error state */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '1rem 1.25rem',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: '10px',
                color: '#fca5a5',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
              }}
            >
              <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Generation failed</strong>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <AnimatePresence>
            {done && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => router.push(`/playbook/${playbookId}`)}
                style={{
                  padding: '0.875rem 2.5rem',
                  background: 'linear-gradient(135deg, #7c6af5, #a78bfa)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 0 30px rgba(124,106,245,0.4)',
                  letterSpacing: '-0.01em',
                }}
              >
                Open in Editor →
              </motion.button>
            )}
          </AnimatePresence>

          {error && (
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.875rem 1.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px',
                color: 'rgba(255,255,255,0.7)',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Try again
            </button>
          )}

          {!done && !error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '0.8rem',
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                style={{ width: 14, height: 14 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </motion.div>
              Agents working...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
