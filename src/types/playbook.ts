/**
 * Kalpanic domain types.
 *
 * Vocabulary:
 *   Kalpana     — raw user input (title, description, goal, intent)
 *   Vinyas      — layout framework (Educational / Sales / Technical / POC)
 *   Alaukik     — aesthetic theme bundle (colors, fonts, spacing, motion)
 *   Nakshi      — interactive callout / annotation on a playbook element
 *   Playbook    — the final output document
 *   Play Mode   — animated, guided story-like presentation of a Playbook
 */

export type PlaybookStatus = "draft" | "published" | "archived";

export type CollaboratorRole = "viewer" | "editor" | "admin";

export type PersonaType =
  | "founder"
  | "educator"
  | "pm"
  | "marketer"
  | "other";

export type AlaukikTheme =
  | "obsidian"
  | "aurora"
  | "ivory"
  | "ember"
  | "sage";

/** Raw user intent captured before layout / theme selection. */
export interface Kalpana {
  title: string;
  description?: string;
  goal?: string;
  persona?: PersonaType;
}

/** A single annotation / callout attached to a block in the playbook. */
export interface Nakshi {
  id: string;
  blockId: string;
  content: string;
  position?: { x: number; y: number };
  resolved?: boolean;
}

/** Structured block content for a playbook. */
export interface PlaybookBlock {
  id: string;
  type: string;
  data: Record<string, unknown>;
  order: number;
}

export interface PlaybookContent {
  blocks: PlaybookBlock[];
  version: number;
}

/** Play Mode configuration — how the guided presentation behaves. */
export interface PlayModeConfig {
  autoAdvance?: boolean;
  transitionDuration?: number;
  showProgress?: boolean;
}

/**
 * Core Playbook entity.
 * Maps directly to the `public.playbooks` Supabase table.
 */
export interface Playbook {
  id: string;
  owner_id: string;
  title: string;
  slug: string;
  kalpana: Kalpana;
  vinyas_id: string | null;
  theme_id: AlaukikTheme | null;
  content: PlaybookContent;
  nakshi: Nakshi[];
  status: PlaybookStatus;
  is_public: boolean;
  play_mode_config: PlayModeConfig;
  aesthetic_score: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
