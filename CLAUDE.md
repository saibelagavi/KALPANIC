```markdown
# CLAUDE.md — Kalpanic Project Intelligence

> "The world's first tool that makes boring stuff feel like walking cake."
> Kalpanic (कल्पनिक) — born from *Kalpana* (imagination) and *Alaukik* (extraordinary).
> Where a teacher's lecture becomes a gallery. Where a founder's idea becomes a movement.

---

## Project Philosophy

Kalpanic does not compete with Notion, Figma, or PowerPoint.
It renders them irrelevant for its specific purpose.

The mission: take anything dull — a product spec, a lesson plan, a proof of concept,
a usage guide — and transform it into something so beautiful people forget it was
documentation. We are building the first tool where **aesthetic intelligence is the
core feature**, not a skin on top.

The three-word brief: **Make boring extraordinary.**

---

## Build Phases — Read This First

### Phase 1 (NOW): Frontend + Landing Page
The agent's current job is to build and deploy the full frontend to Vercel.
This includes:
- The main marketing website / landing page (this is the most important deliverable of Phase 1)
- The editor shell and UI components (non-functional, but pixel-perfect)
- All routing, layouts, and design system
- Supabase auth integration (sign up / sign in)
- Vercel deployment with correct environment variable structure

**The backend and AI engine are NOT in scope for Phase 1.**
Stub AI responses where needed. The UI must look and feel real.

### Phase 2 (NEXT): Backend + Core Engine
- Supabase edge functions and database logic
- Cerebras AI integration for concept-to-visual engine
- Website scanner (palette + font extraction)
- Document ingestion pipeline
- Real-time collaboration via Supabase Realtime

Do not build Phase 2 during Phase 1. Do not mix concerns.

---

## Infrastructure — Vercel + Supabase Stack

### Deployment: Vercel
- Framework: **Next.js 14+ App Router** — this is the only framework that works
  seamlessly with Vercel's edge network. Do not deviate.
- All environment variables must be declared in `.env.example` with clear descriptions.
- `vercel.json` must exist at root with correct rewrites and headers config.
- Edge Runtime where possible for published playbook routes (latency-critical).
- ISR (Incremental Static Regeneration) for published playbook pages.
- Image optimization via `next/image` with Supabase Storage as the loader domain.

### Database + Auth + Storage + Realtime: Supabase
Supabase is the single source of truth for all persistence. No other database.

```
Supabase Services Used:
├── Auth          — User accounts, OAuth (Google, GitHub), magic link
├── Database      — PostgreSQL with RLS (Row Level Security) enabled on all tables
├── Storage       — Asset uploads, document references, generated thumbnails
├── Realtime      — Collaborative editing presence and comments
└── Edge Functions — AI orchestration, website scanning, document processing
```

**RLS is mandatory on every table. No table ships without a policy.**

### AI: Cerebras API
- Cerebras replaces Claude API for the Concept-to-Visual engine.
- Cerebras endpoint lives in Supabase Edge Functions — never called from the browser.
- API key: `CEREBRAS_API_KEY` — server-side only, never exposed to client bundle.
- All prompts live in `src/lib/ai/prompts/` with versioned filenames.
- Fallback: if Cerebras is unavailable, return curated static suggestions. Never show
  a broken state to the user.

### Website Scanner
- Endpoint: Supabase Edge Function `scan-website`
- Input: a URL provided by the user
- Extracts: dominant colors, font families, spacing rhythm, logo, tone keywords
- Output: a `BrandDNA` object that seeds the Alaukik theme selection
- Tool: Puppeteer (headless) on the edge function, or `colorthief` + `fetch` for
  lightweight extraction when full rendering isn't needed
- User flow: "Enter your website URL → we'll match your brand's soul"

---

## Database Schema + Migration Scripts

Migration files live in `supabase/migrations/`. Run via Supabase CLI.
All scripts are idempotent. Never write destructive migrations without
an explicit rollback file alongside.

### Core Tables

```sql
-- supabase/migrations/001_initial_schema.sql

-- Users extend Supabase auth.users
create table public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  display_name  text,
  avatar_url    text,
  plan          text not null default 'free' check (plan in ('free', 'pro', 'team')),
  persona       text check (persona in ('founder', 'educator', 'pm', 'marketer', 'other')),
  brand_dna     jsonb,                        -- extracted from website scanner
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Playbooks (the core document unit)
create table public.playbooks (
  id            uuid default gen_random_uuid() primary key,
  owner_id      uuid references public.profiles(id) on delete cascade not null,
  title         text not null,
  slug          text unique not null,         -- used for the public URL
  kalpana       jsonb not null default '{}',  -- raw user input + intent
  vinyas_id     text,                         -- selected layout framework
  theme_id      text,                         -- selected Alaukik theme
  content       jsonb not null default '{}',  -- structured block content
  nakshi        jsonb not null default '[]',  -- callout annotations array
  status        text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_public     boolean default false,
  play_mode_config jsonb default '{}',
  aesthetic_score  numeric(3,2),              -- user self-rating
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Reference documents uploaded by user
create table public.reference_documents (
  id            uuid default gen_random_uuid() primary key,
  owner_id      uuid references public.profiles(id) on delete cascade not null,
  playbook_id   uuid references public.playbooks(id) on delete set null,
  filename      text not null,
  storage_path  text not null,               -- Supabase Storage path
  mime_type     text not null,
  size_bytes    bigint,
  extracted_text text,                       -- processed text for AI context
  processing_status text default 'pending' check (
    processing_status in ('pending', 'processing', 'ready', 'failed')
  ),
  created_at    timestamptz default now()
);

-- Collaboration: team members on a playbook
create table public.playbook_collaborators (
  id            uuid default gen_random_uuid() primary key,
  playbook_id   uuid references public.playbooks(id) on delete cascade not null,
  user_id       uuid references public.profiles(id) on delete cascade not null,
  role          text not null default 'viewer' check (role in ('viewer', 'editor', 'admin')),
  invited_at    timestamptz default now(),
  unique(playbook_id, user_id)
);

-- Comments on playbooks (Nakshi collaboration)
create table public.playbook_comments (
  id            uuid default gen_random_uuid() primary key,
  playbook_id   uuid references public.playbooks(id) on delete cascade not null,
  author_id     uuid references public.profiles(id) on delete cascade not null,
  block_id      text,                         -- optional: tied to a specific block
  content       text not null,
  resolved      boolean default false,
  created_at    timestamptz default now()
);

-- Analytics: playbook view events (no PII, just engagement)
create table public.playbook_views (
  id            uuid default gen_random_uuid() primary key,
  playbook_id   uuid references public.playbooks(id) on delete cascade not null,
  viewer_fingerprint text,                   -- anonymous hash
  time_spent_seconds integer,
  completed_play_mode boolean default false,
  referrer      text,
  viewed_at     timestamptz default now()
);

-- RLS Policies

alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

alter table public.playbooks enable row level security;
create policy "Owners have full access" on public.playbooks
  for all using (auth.uid() = owner_id);
create policy "Public playbooks are readable by all" on public.playbooks
  for select using (is_public = true and status = 'published');
create policy "Collaborators can read" on public.playbooks
  for select using (
    exists (
      select 1 from public.playbook_collaborators
      where playbook_id = id and user_id = auth.uid()
    )
  );

alter table public.reference_documents enable row level security;
create policy "Owners can manage their documents" on public.reference_documents
  for all using (auth.uid() = owner_id);

alter table public.playbook_collaborators enable row level security;
create policy "Playbook owners manage collaborators" on public.playbook_collaborators
  for all using (
    exists (
      select 1 from public.playbooks
      where id = playbook_id and owner_id = auth.uid()
    )
  );

alter table public.playbook_comments enable row level security;
create policy "Collaborators can comment" on public.playbook_comments
  for all using (
    exists (
      select 1 from public.playbook_collaborators
      where playbook_id = playbook_comments.playbook_id and user_id = auth.uid()
    )
    or exists (
      select 1 from public.playbooks
      where id = playbook_id and owner_id = auth.uid()
    )
  );

alter table public.playbook_views enable row level security;
create policy "Anyone can insert a view" on public.playbook_views
  for insert with check (true);
create policy "Owners can read their view data" on public.playbook_views
  for select using (
    exists (
      select 1 from public.playbooks
      where id = playbook_id and owner_id = auth.uid()
    )
  );

-- Indexes
create index idx_playbooks_owner on public.playbooks(owner_id);
create index idx_playbooks_slug on public.playbooks(slug);
create index idx_playbooks_status on public.playbooks(status, is_public);
create index idx_reference_documents_owner on public.reference_documents(owner_id);
create index idx_playbook_views_playbook on public.playbook_views(playbook_id, viewed_at);

-- Updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger playbooks_updated_at before update on public.playbooks
  for each row execute function public.handle_updated_at();
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();
```

---

## File Structure

```
kalpanic/
├── .claude/
│   ├── CLAUDE.md                    # This file
│   ├── skills/                      # Agent skill references
│   │   ├── landing-page.md          # How to build the Kalpanic landing page
│   │   ├── design-system.md         # Alaukik token system rules
│   │   ├── supabase-patterns.md     # RLS, edge functions, realtime patterns
│   │   └── ai-prompts.md            # Cerebras prompt engineering guide
│   └── references/                  # Visual inspiration for the agent
│       ├── landing-inspiration/     # Screenshots of reference landing pages
│       ├── color-palettes/          # Sample Alaukik theme references
│       └── layout-frameworks/       # Vinyas layout visual references
│
├── supabase/
│   ├── migrations/                  # SQL migration files (run in order)
│   │   └── 001_initial_schema.sql
│   ├── functions/                   # Edge Functions
│   │   ├── scan-website/            # Color/font extraction from URL
│   │   ├── process-document/        # PDF/DOCX text extraction for AI context
│   │   ├── generate-vinyas/         # Cerebras: layout suggestion
│   │   ├── generate-content/        # Cerebras: content transformation
│   │   └── export-playbook/         # PDF/image export generation
│   └── seed.sql                     # Demo data for development
│
├── src/
│   ├── app/
│   │   ├── (marketing)/             # Public marketing site
│   │   │   ├── page.tsx             # Landing page — THE priority
│   │   │   ├── features/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   └── use-cases/
│   │   │       ├── educators/page.tsx
│   │   │       ├── founders/page.tsx
│   │   │       └── product-managers/page.tsx
│   │   ├── (auth)/
│   │   │   ├── sign-in/page.tsx
│   │   │   └── sign-up/page.tsx
│   │   ├── (editor)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── playbook/
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx     # Editor canvas
│   │   │   │       └── settings/page.tsx
│   │   │   └── layout.tsx
│   │   └── p/
│   │       └── [slug]/page.tsx      # Published playbook — public, edge rendered
│   │
│   ├── components/
│   │   ├── landing/                 # Landing page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── BeforeAfter.tsx      # Side-by-side boring vs beautiful demo
│   │   │   ├── PersonaShowcase.tsx  # Teacher / Founder / PM use cases
│   │   │   ├── ThemeGallery.tsx     # Animated theme carousel
│   │   │   ├── PlayModeDemo.tsx     # Interactive demo embedded in landing
│   │   │   ├── HowItWorks.tsx       # 4-step flow visualization
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   ├── editor/
│   │   │   ├── Canvas.tsx
│   │   │   ├── Toolbar.tsx
│   │   │   ├── BlockPicker.tsx
│   │   │   ├── ThemePanel.tsx
│   │   │   ├── VinyasSelector.tsx   # AI layout suggestions UI
│   │   │   ├── NakshiEditor.tsx     # Callout annotation editor
│   │   │   ├── WebsiteScanner.tsx   # "Enter your URL" input + results
│   │   │   └── DocumentUpload.tsx   # Reference document drag-and-drop
│   │   ├── playbook/                # Published view renderers
│   │   │   ├── PlaybookRenderer.tsx
│   │   │   ├── PlayMode.tsx
│   │   │   └── NakshiOverlay.tsx
│   │   └── ui/                      # Primitives
│   │
│   ├── engine/
│   │   ├── kalpana/                 # Input parsing
│   │   ├── vinyas/                  # Layout framework logic
│   │   ├── saundaryikaran/          # Theme application
│   │   └── aakrutibandh/            # Composition rules
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts            # Browser client
│   │   │   ├── server.ts            # Server component client
│   │   │   └── middleware.ts        # Auth middleware
│   │   ├── ai/
│   │   │   ├── cerebras.ts          # Cerebras client wrapper
│   │   │   └── prompts/             # Versioned prompt templates
│   │   └── scanner/
│   │       └── brand-dna.ts         # BrandDNA type and helpers
│   │
│   ├── styles/
│   │   ├── themes/                  # Alaukik theme token files
│   │   └── globals.css
│   │
│   └── types/
│       ├── playbook.ts
│       ├── kalpana.ts
│       ├── brand-dna.ts
│       └── supabase.ts              # Generated from Supabase CLI
│
├── .env.example                     # All required env vars documented
├── vercel.json
├── next.config.ts
└── package.json
```

---

## Environment Variables

Every variable must exist in `.env.example`. No undocumented secrets.

```bash
# .env.example

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server only, never expose

# Cerebras AI — server only
CEREBRAS_API_KEY=your-cerebras-key

# App
NEXT_PUBLIC_APP_URL=https://kalpanic.com
NEXT_PUBLIC_APP_NAME=Kalpanic

# Website Scanner
SCANNER_TIMEOUT_MS=10000
```

---

## The Landing Page — Phase 1 Priority #1

The landing page is not a nice-to-have. It IS the product face.
It must communicate the following without the user reading a single word of body text:

> "This tool will make whatever boring thing you're trying to explain look
>  like it was designed by a world-class studio."

### Landing Page Sections (in order)

**1. Hero**
- Headline: Bold, kinetic, unforgettable. Not "Create beautiful documents."
  Something like: *"Stop explaining. Start captivating."* or
  *"The boring brief ends here."*
- Sub-headline: One line. What it does. Who it's for. Why now.
- Hero visual: An animated transformation — raw text input morphing into a
  stunning playbook in real-time. This must be built with Framer Motion.
- CTA: "Start for free" — no credit card language needed, just confidence.

**2. Before / After**
- Split screen. Left: a sad, grey Word doc or Notion page.
  Right: the same content, Kalpanic-ized into something extraordinary.
- This section closes the sale for skeptics. It must be visceral.

**3. Persona Showcase — "Who is Kalpanic for?"**
Three cards with distinct visual identities per persona:
- **The Teacher** — "Explain photosynthesis without losing them at slide 3."
- **The Founder** — "Your investor pitch deserves better than a Google Doc."
- **The Product Manager** — "SOPs your team will actually read."
Each card clicks through to a full use-case page.

**4. How It Works — 4 Steps**
Input your Kalpana → Pick a Vinyas → Apply your Alaukik theme → Publish
Animate each step sequentially on scroll. Keep it minimal and elegant.

**5. Theme Gallery**
An animated carousel of Alaukik themes rotating through a sample playbook.
This is the "wow" moment. Spend design time here.

**6. Interactive Demo (embedded Play Mode)**
A locked, non-editable demo playbook embedded directly in the landing page.
Users can navigate through Play Mode without signing up.
This is the most important conversion tool we have.

**7. Social Proof**
Quotes. Real or placeholder-real. From the three personas.

**8. Final CTA**
Full-width. High contrast. One button. Make it feel inevitable.

### Landing Page Design Constraints
- Font: Use a high-quality variable font pairing. Suggest: `Fraunces` (display)
  + `DM Sans` (body) — both on Google Fonts, both free.
- Color: The landing page itself uses the darkest Alaukik theme as its base.
  The product sells the aesthetic by being aesthetic.
- Animation: Scroll-triggered reveals via Framer Motion `whileInView`.
  No autoplay video. Motion must be purposeful, not decorative.
- Mobile: The landing page must be flawless on 375px. Non-negotiable.
- Performance: Lighthouse score > 90 on all metrics before Phase 1 ships.

---

## User Personas — Build With These Humans in Mind

Every feature must serve at least one of these people:

| Persona         | Their Pain                              | Their Win with Kalpanic               |
|-----------------|-----------------------------------------|---------------------------------------|
| **Educator**    | Slides are boring. Students zone out.   | Concepts become visual stories         |
| **Founder**     | Ideas get lost in poorly formatted docs | POC becomes a compelling narrative     |
| **PM**          | SOPs nobody reads. Onboarding chaos.    | Steps feel like a guided experience    |
| **Marketer**    | Product guides look like manuals        | Explainers feel like brand campaigns   |
| **Consultant**  | Decks take days to design               | Playbooks ship in 15 minutes           |

---

## Domain Vocabulary

Use these terms in all code, comments, API routes, and database columns.

| Term              | Meaning                                                    |
|-------------------|------------------------------------------------------------|
| `Kalpana`         | User's raw input — title, description, goal, intent        |
| `Vinyas`          | A layout framework (Educational / Sales / Technical / POC) |
| `Aakrutibandh`    | Composition ruleset — grid, flow direction, hierarchy      |
| `Alaukik` theme   | A full design token bundle (colors, fonts, spacing, motion)|
| `Saundaryikaran`  | The act of applying aesthetics to raw content              |
| `Nakshi`          | An interactive callout/annotation on a playbook element    |
| `Playbook`        | The final output — one Kalpana becomes one Playbook        |
| `Play Mode`       | Animated, guided, story-like presentation of a Playbook    |
| `BrandDNA`        | Extracted brand signals from a user's website URL          |
| `Modular Element` | A drag-and-drop block (flow diagram, table, 3D object)     |

---

## Feature Specs

### Website Scanner
User provides their website URL in the editor onboarding step.
The `scan-website` edge function:
1. Fetches the page HTML + computed styles
2. Extracts: primary colors (top 5), background color, font families, logo URL
3. Infers: brand tone (e.g., "corporate", "playful", "technical") from color temperature
4. Returns a `BrandDNA` object
5. This seeds the Alaukik theme selector — the closest matching theme is pre-selected

```typescript
interface BrandDNA {
  url: string;
  colors: {
    primary: string;    // hex
    secondary: string;
    background: string;
    text: string;
    accents: string[];
  };
  fonts: {
    headings: string | null;
    body: string | null;
  };
  tone: 'corporate' | 'playful' | 'editorial' | 'technical' | 'cultural';
  logoUrl: string | null;
  extractedAt: string;  // ISO timestamp
}
```

### Document Upload (Reference Ingestion)
Users upload PDFs, DOCX, or images as reference material.
The `process-document` edge function:
1. Receives file from Supabase Storage trigger
2. Extracts raw text (PDF: pdf-parse, DOCX: mammoth)
3. Chunks text into segments (max 2000 tokens each)
4. Stores extracted text back on the `reference_documents` row
5. When user generates a Vinyas, all attached documents are passed as context
   to the Cerebras prompt as `[REFERENCE DOCUMENT: {filename}] {extracted_text}`

Accepted formats: `.pdf`, `.docx`, `.txt`, `.png`, `.jpg`, `.webp`
Max file size: 10MB per file, 50MB per playbook total

### AI Vinyas Generation (Cerebras)
Trigger: user has entered their Kalpana and clicks "Suggest Layouts"
Input to edge function:
- `kalpana`: title + description + goal
- `brandDNA`: optional, if website was scanned
- `referenceContext`: optional, extracted text from uploaded documents
- `persona`: user's selected persona (educator, founder, pm, etc.)

Output: array of 3 Vinyas suggestions, each with:
- Layout name and description
- Recommended Alaukik theme
- Suggested Modular Elements for each section
- Confidence score

---

## Core Invariants — These Never Change

1. **Every table has RLS.** No exceptions. A table without RLS is a security hole.

2. **The Alaukik aesthetic is the product.** Every UI component — including error
   states, loading states, and empty states — must be beautiful. An ugly spinner
   is a product failure.

3. **Published playbook links are permanent.** Once published at `/p/[slug]`,
   that URL must always resolve. Versioning is additive, never destructive.

4. **The AI layer is advisory.** Users can ignore every suggestion. The tool
   must be fully usable without AI assistance.

5. **BrandDNA is opt-in.** Never scan a user's website without explicit action.
   Never store scan results beyond the session without consent.

6. **Reference documents are private by default.** They are never shared with
   other users, never used to train any model, never surfaced in public views.

7. **Cerebras API key never touches the browser.** All AI calls go through
   Supabase Edge Functions. Period.

8. **Theme tokens are never hardcoded in components.** Always `var(--token-name)`.
   A hardcoded color hex in a component is a bug to be fixed immediately.

---

## Performance Contracts

| Surface                         | Target   | Hard Limit |
|--------------------------------|----------|------------|
| Landing page LCP                | < 1.2s   | < 2s       |
| Landing page Lighthouse score   | > 90     | > 85       |
| Editor initial load             | < 2s     | < 3s       |
| Published playbook (edge) FCP   | < 800ms  | < 1.5s     |
| Theme switch repaint            | < 100ms  | < 200ms    |
| Cerebras suggestion response    | < 4s     | < 6s       |
| Website scan completion         | < 8s     | < 12s      |
| Document processing (per file)  | < 30s    | < 60s      |

---

## Vercel Configuration

```json
// vercel.json
{
  "framework": "nextjs",
  "regions": ["sin1", "iad1"],
  "headers": [
    {
      "source": "/p/:slug*",
      "headers": [
        { "key": "Cache-Control", "value": "s-maxage=60, stale-while-revalidate=300" },
        { "key": "X-Robots-Tag", "value": "index, follow" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

## What Claude Should Know About Working in This Repo

- `engine/` is pure logic. No React. No HTTP. No side effects. Data in, data out.
- `supabase/functions/` are the only place AI and external HTTP calls live.
- Every Supabase client call in server components uses `src/lib/supabase/server.ts`.
  Never use the browser client in a server component.
- The landing page at `src/app/(marketing)/page.tsx` is the most important file
  in Phase 1. It gets the most effort, the most polish, the most iteration.
- Zustand stores live in `src/stores/`. No editor state in React context.
- Every Modular Element needs four things before it can ship: schema, renderer,
  editor form, thumbnail preview. Missing any one → not done.
- `src/types/supabase.ts` is generated via `supabase gen types typescript`.
  Never hand-edit it. Run the generator after schema changes.
- Empty states, loading states, and error states are designed, not coded last-minute.
  They are part of the Alaukik promise.

---

## Success Metrics

| Metric                     | Target         | How Measured                          |
|---------------------------|----------------|---------------------------------------|
| Aesthetic Score            | > 4.2 / 5     | In-app rating after publish           |
| Creation Time              | < 15 minutes  | `created_at` → `published_at` delta   |
| Play Mode Completion Rate  | > 70%         | `completed_play_mode` in view events  |
| Vinyas Acceptance Rate     | > 60%         | AI suggestion used vs. dismissed      |
| Viewer Engagement          | 3x vs PDF     | `time_spent_seconds` vs. baseline     |

---

## The Standard

Kalpanic's purpose is to make boring things extraordinary.

Its codebase must reflect that same standard.

Clean architecture. Purposeful decisions. Zero tolerance for ugly states.
If someone reads this code, they should feel the same thing a viewer feels
when they open a Kalpanic playbook for the first time:

**"This was made by people who cared."**

That is the only acceptable output.
```