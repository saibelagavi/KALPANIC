import { createClient } from '@supabase/supabase-js';
import { generatePlaybookContent, type AIBlock } from '@/lib/ai/openrouter';
import { generateImages } from '@/lib/ai/gemini';

export const runtime = 'nodejs';
export const maxDuration = 120;

// Admin Supabase client — uses service role key, bypasses RLS
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

interface GenerateRequest {
  playbookId: string;
  title: string;
  description: string;
  goal: string;
  persona: string;
  vinyas: string;
  theme: string;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateRequest;
  const { playbookId, title, description, goal, persona, vinyas, theme } = body;

  if (!playbookId || !title) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;

      const emit = (event: string, data: unknown) => {
        if (closed) return;
        try {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        } catch {
          closed = true;
        }
      };

      // Heartbeat — keeps the SSE connection alive during long AI calls
      const heartbeat = setInterval(() => emit('ping', { ts: Date.now() }), 8000);

      try {
        // ── Agent 1: Strategist + Writer (OpenRouter) ────────────────────
        emit('agent', {
          id: 'strategist',
          name: 'Strategist',
          status: 'running',
          message: 'Analyzing your vision and planning the structure...',
        });

        let rawBlocks: AIBlock[];
        try {
          rawBlocks = await generatePlaybookContent({ title, description, goal, persona, vinyas, theme });
        } catch (err) {
          emit('agent', { id: 'strategist', name: 'Strategist', status: 'error', message: String(err) });
          emit('error', { message: 'Content generation failed. Check your OPENROUTER_API_KEY.' });
          closed = true;
          try { controller.close(); } catch { /* already closed */ }
          return;
        }

        emit('agent', {
          id: 'strategist',
          name: 'Strategist',
          status: 'done',
          message: `${rawBlocks.length} blocks planned`,
        });

        // Assign stable IDs to all blocks
        const blocksWithIds = rawBlocks.map((b) => ({ ...b, id: uid() }));

        // Emit block plan immediately so the UI can show the skeleton
        emit('blocks', { blocks: blocksWithIds.map((b) => ({ id: b.id, type: b.type })) });

        // ── Agent 2: Visual Director (Gemini, parallel) ──────────────────
        const mediaBlocks = blocksWithIds.filter(
          (b) => b.type === 'media' && b.content.imagePrompt
        );

        emit('agent', {
          id: 'images',
          name: 'Visual Director',
          status: mediaBlocks.length > 0 ? 'running' : 'done',
          message: mediaBlocks.length > 0
            ? `Generating ${mediaBlocks.length} image${mediaBlocks.length > 1 ? 's' : ''}...`
            : 'No images needed',
          count: mediaBlocks.length,
        });

        const imageResults = await generateImages(
          mediaBlocks.map((b) => b.content.imagePrompt!)
        );

        // Merge images back into blocks
        let imageIdx = 0;
        const finalBlocks = blocksWithIds.map((b) => {
          if (b.type === 'media' && b.content.imagePrompt) {
            const imageUrl = imageResults[imageIdx++] ?? undefined;
            // Strip imagePrompt from final content — it's an internal hint only
            const { imagePrompt: _removed, ...rest } = b.content;
            return { id: b.id, type: b.type, content: { ...rest, ...(imageUrl ? { imageUrl } : {}) } };
          }
          return { id: b.id, type: b.type, content: b.content };
        });

        if (mediaBlocks.length > 0) {
          emit('agent', {
            id: 'images',
            name: 'Visual Director',
            status: 'done',
            message: `${imageResults.filter(Boolean).length}/${mediaBlocks.length} images generated`,
          });
        }

        // ── Agent 3: Assembler (Supabase save) ───────────────────────────
        emit('agent', {
          id: 'assembler',
          name: 'Assembler',
          status: 'running',
          message: 'Saving your playbook...',
        });

        const supabase = getAdminClient();
        const { error: saveError } = await supabase
          .from('playbooks')
          .update({
            content: { blocks: finalBlocks, theme },
            theme_id: theme,
          })
          .eq('id', playbookId);

        if (saveError) {
          emit('agent', { id: 'assembler', name: 'Assembler', status: 'error', message: saveError.message });
          emit('error', { message: 'Failed to save playbook: ' + saveError.message });
          closed = true;
          try { controller.close(); } catch { /* already closed */ }
          return;
        }

        emit('agent', {
          id: 'assembler',
          name: 'Assembler',
          status: 'done',
          message: 'Playbook ready',
        });

        emit('complete', { playbookId });
      } catch (err) {
        emit('error', { message: err instanceof Error ? err.message : 'Unexpected error' });
      } finally {
        clearInterval(heartbeat);
        if (!closed) {
          closed = true;
          try { controller.close(); } catch { /* already closed by client disconnect */ }
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
