import { OpenRouter } from '@openrouter/sdk';
import type { BlockType } from '@/stores/editorStore';

export interface AIBlock {
  type: BlockType;
  content: {
    // text
    text?: string;
    fontSize?: 'sm' | 'md' | 'lg';
    // data-visual
    title?: string;
    rows?: { id: string; label: string; value: number }[];
    // media
    caption?: string;
    imageUrl?: string;
    imagePrompt?: string; // stripped before saving to store
    // step-flow
    steps?: string[];
    // quote
    quote?: string;
    attribution?: string;
    // nakshi
    calloutType?: 'info' | 'insight' | 'warning' | 'highlight';
  };
}

export interface GeneratePlaybookInput {
  title: string;
  description: string;
  goal: string;
  persona: string;
  vinyas: string;
  theme: string;
}

// Vinyas-specific block sequences
const VINYAS_SEQUENCES: Record<string, BlockType[]> = {
  educational: ['text', 'step-flow', 'media', 'data-visual', 'text', 'nakshi'],
  sales:       ['text', 'nakshi', 'media', 'step-flow', 'data-visual', 'quote'],
  technical:   ['text', 'step-flow', 'data-visual', 'text', 'nakshi', 'text'],
  poc:         ['text', 'media', 'text', 'step-flow', 'quote', 'nakshi'],
};

const THEME_AESTHETIC: Record<string, string> = {
  obsidian: 'dark editorial luxury — deep shadows, metallic accents, cinematic lighting',
  aurora:   'sci-fi neon electric — cyan/purple glows, deep space background, futuristic',
  ivory:    'clean minimal print — bright airy composition, refined typography, editorial photography',
  ember:    'warm bold founder — rich oranges/reds, high contrast, energetic and bold',
  sage:     'natural calm focused — organic greens, soft natural light, serene and grounded',
};

function buildPrompt(input: GeneratePlaybookInput): string {
  const sequence = VINYAS_SEQUENCES[input.vinyas.toLowerCase()] ?? VINYAS_SEQUENCES.educational;
  const themeDesc = THEME_AESTHETIC[input.theme.toLowerCase()] ?? 'modern professional';

  const blockSchemas = sequence.map((type, i) => {
    switch (type) {
      case 'text':
        return `{"type":"text","content":{"text":"<specific content for block ${i+1}>","fontSize":"${i === 0 ? 'lg' : 'md'}"}}`;
      case 'data-visual':
        return `{"type":"data-visual","content":{"title":"<chart title>","rows":[{"id":"r1","label":"<label>","value":<10-100>},{"id":"r2","label":"<label>","value":<10-100>},{"id":"r3","label":"<label>","value":<10-100>},{"id":"r4","label":"<label>","value":<10-100>}]}}`;
      case 'media':
        return `{"type":"media","content":{"caption":"<descriptive caption>","imagePrompt":"<detailed Gemini image generation prompt — cinematic, specific to content, ${themeDesc} aesthetic>"}}`;
      case 'step-flow':
        return `{"type":"step-flow","content":{"steps":["<step 1>","<step 2>","<step 3>","<step 4>"]}}`;
      case 'quote':
        return `{"type":"quote","content":{"quote":"<inspiring relevant quote>","attribution":"<real or contextual source>"}}`;
      case 'nakshi':
        return `{"type":"nakshi","content":{"text":"<key insight or callout>","calloutType":"insight"}}`;
      default:
        return `{"type":"${type}","content":{}}`;
    }
  }).join(',\n    ');

  return `You are Kalpanic's AI engine. Transform raw user input into a complete, stunning playbook.

PLAYBOOK BRIEF:
- Title: "${input.title}"
- Description: "${input.description}"
- Goal: "${input.goal}"
- Creator persona: ${input.persona}
- Layout (Vinyas): ${input.vinyas}
- Visual theme: ${input.theme} (${themeDesc})

Generate exactly ${sequence.length} blocks in this order: [${sequence.join(', ')}]

Return ONLY this JSON object — no markdown, no code fences, no explanation:
{
  "blocks": [
    ${blockSchemas}
  ]
}

RULES:
1. ALL content must be specific to the title/description/goal — never generic filler
2. For media imagePrompt: write 2-3 sentences describing a stunning visual. Include: subject, lighting, composition, mood, and reference the ${themeDesc} aesthetic
3. data-visual rows: use realistic metrics (values 10-100) relevant to the content
4. step-flow: 4 clear, actionable, numbered steps specific to the goal
5. Opening text block: use fontSize "lg" and write a compelling hook (2-3 sentences)
6. nakshi calloutType options: "info" | "insight" | "warning" | "highlight"
7. Every piece of text must sound like it was written by a world-class copywriter`;
}

let _client: OpenRouter | null = null;
function getClient(): OpenRouter {
  if (!_client) {
    if (!process.env.OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is not configured');
    _client = new OpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  }
  return _client;
}

export async function generatePlaybookContent(input: GeneratePlaybookInput): Promise<AIBlock[]> {
  const client = getClient();

  const result = await client.chat.send({
    chatGenerationParams: {
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'user', content: buildPrompt(input) },
      ],
      max_tokens: 32768,
      temperature: 1,
      top_p: 1,
    },
  });

  const content = result.choices[0]?.message?.content;
  const raw = typeof content === 'string' ? content : '';

  // Robustly extract JSON — handle markdown fences or extra text
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('OpenRouter returned unparseable response');

  let parsed: { blocks: AIBlock[] };
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    throw new Error('OpenRouter JSON parse failed');
  }

  if (!Array.isArray(parsed.blocks) || parsed.blocks.length === 0) {
    throw new Error('OpenRouter returned no blocks');
  }

  return parsed.blocks;
}
