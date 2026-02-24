-- ============================================================
-- 003_profiles_insert_policy.sql
-- Add missing INSERT policy on profiles table
--
-- Root cause:
--   profiles had only SELECT + UPDATE policies.
--   No INSERT policy → RLS blocks any upsert/insert from the browser
--   client, so profile rows are never created → playbooks FK fails.
-- ============================================================

-- Allow authenticated users to insert their own profile row
create policy "Users can insert own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);
