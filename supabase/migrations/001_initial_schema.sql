-- supabase/migrations/001_initial_schema.sql

-- Users extend Supabase auth.users
create table public.profiles (
  id            uuid references auth.users(id) on delete cascade primary key,
  display_name  text,
  avatar_url    text,
  plan          text not null default 'free' check (plan in ('free', 'pro', 'team')),
  persona       text check (persona in ('founder', 'educator', 'pm', 'marketer', 'other')),
  brand_dna     jsonb,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table public.playbooks (
  id            uuid default gen_random_uuid() primary key,
  owner_id      uuid references public.profiles(id) on delete cascade not null,
  title         text not null,
  slug          text unique not null,
  kalpana       jsonb not null default '{}',
  vinyas_id     text,
  theme_id      text,
  content       jsonb not null default '{}',
  nakshi        jsonb not null default '[]',
  status        text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_public     boolean default false,
  play_mode_config jsonb default '{}',
  aesthetic_score  numeric(3,2),
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

create table public.reference_documents (
  id            uuid default gen_random_uuid() primary key,
  owner_id      uuid references public.profiles(id) on delete cascade not null,
  playbook_id   uuid references public.playbooks(id) on delete set null,
  filename      text not null,
  storage_path  text not null,
  mime_type     text not null,
  size_bytes    bigint,
  extracted_text text,
  processing_status text default 'pending' check (
    processing_status in ('pending', 'processing', 'ready', 'failed')
  ),
  created_at    timestamptz default now()
);

create table public.playbook_collaborators (
  id            uuid default gen_random_uuid() primary key,
  playbook_id   uuid references public.playbooks(id) on delete cascade not null,
  user_id       uuid references public.profiles(id) on delete cascade not null,
  role          text not null default 'viewer' check (role in ('viewer', 'editor', 'admin')),
  invited_at    timestamptz default now(),
  unique(playbook_id, user_id)
);

create table public.playbook_comments (
  id            uuid default gen_random_uuid() primary key,
  playbook_id   uuid references public.playbooks(id) on delete cascade not null,
  author_id     uuid references public.profiles(id) on delete cascade not null,
  block_id      text,
  content       text not null,
  resolved      boolean default false,
  created_at    timestamptz default now()
);

create table public.playbook_views (
  id            uuid default gen_random_uuid() primary key,
  playbook_id   uuid references public.playbooks(id) on delete cascade not null,
  viewer_fingerprint text,
  time_spent_seconds integer,
  completed_play_mode boolean default false,
  referrer      text,
  viewed_at     timestamptz default now()
);

-- RLS
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
