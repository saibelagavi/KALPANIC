-- ============================================================
-- 002_fix_rls_recursion.sql
-- Fix infinite recursion in playbooks RLS policies
--
-- Root cause:
--   "Collaborators can read" on playbooks queries playbook_collaborators
--   "Playbook owners manage collaborators" on playbook_collaborators queries playbooks
--   → circular dependency → infinite recursion on any SELECT with RETURNING
--
-- Fix:
--   Wrap the collaborator check in a SECURITY DEFINER function.
--   SECURITY DEFINER runs as the function owner (postgres/superuser),
--   bypassing RLS on the inner table query and breaking the cycle.
-- ============================================================

-- Step 1: Drop the recursive policies
drop policy if exists "Collaborators can read" on public.playbooks;

-- Step 2: Create a SECURITY DEFINER helper that queries
--         playbook_collaborators WITHOUT triggering its RLS policies.
create or replace function public.check_playbook_collaborator(pb_id uuid, uid uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.playbook_collaborators
    where playbook_id = pb_id
      and user_id = uid
  );
$$;

-- Step 3: Recreate the collaborator read policy using the helper
create policy "Collaborators can read"
  on public.playbooks
  for select
  using (
    public.check_playbook_collaborator(id, auth.uid())
  );
