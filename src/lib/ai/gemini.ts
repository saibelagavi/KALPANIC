import { GoogleGenAI } from '@google/genai';

let _client: GoogleGenAI | null = null;
function getClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!_client) _client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  return _client;
}

/**
 * Derive a stable numeric seed from a string (for consistent Picsum images).
 */
function promptSeed(prompt: string): number {
  let hash = 0;
  for (let i = 0; i < prompt.length; i++) {
    hash = ((hash << 5) - hash + prompt.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % 1000;
}

/**
 * Fallback: beautiful stock photo from Picsum (free, no API key).
 * Uses a deterministic seed so the same prompt always returns the same image.
 */
function picsumFallback(prompt: string): string {
  const seed = promptSeed(prompt);
  return `https://picsum.photos/seed/${seed}/1200/800`;
}

/**
 * Generates an image from a text prompt using Gemini.
 * Falls back to a Picsum stock photo if Gemini is unavailable or over quota.
 */
export async function generateImage(prompt: string): Promise<string | null> {
  const ai = getClient();

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseModalities: ['IMAGE', 'TEXT'],
        } as Record<string, unknown>,
      });

      const part = response.candidates?.[0]?.content?.parts?.find(
        (p: { inlineData?: { mimeType?: string; data?: string } }) => p.inlineData
      ) as { inlineData?: { mimeType?: string; data?: string } } | undefined;

      if (part?.inlineData?.data) {
        return `data:${part.inlineData.mimeType ?? 'image/png'};base64,${part.inlineData.data}`;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn('[Gemini] Image generation unavailable, using stock photo fallback:', msg.slice(0, 120));
    }
  }

  // Fallback: deterministic stock photo from Picsum
  return picsumFallback(prompt);
}

/**
 * Generate multiple images in parallel for efficiency.
 * Returns an array matching the input prompts (null entries where generation failed).
 */
export async function generateImages(prompts: string[]): Promise<(string | null)[]> {
  if (prompts.length === 0) return [];
  return Promise.all(prompts.map(generateImage));
}
