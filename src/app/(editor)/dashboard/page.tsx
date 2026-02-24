import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export default async function DashboardPage() {
  const supabase = await createClient();

  // Auth guard
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in');

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, avatar_url, plan, persona')
    .eq('id', user.id)
    .single();

  // Fetch playbooks
  const { data: playbooks } = await supabase
    .from('playbooks')
    .select('id, title, slug, status, theme_id, content, created_at, updated_at')
    .eq('owner_id', user.id)
    .order('updated_at', { ascending: false });

  const safe = playbooks ?? [];

  // Total views across all user's playbooks
  const { count: totalViews } = safe.length > 0
    ? await supabase
        .from('playbook_views')
        .select('*', { count: 'exact', head: true })
        .in('playbook_id', safe.map(p => p.id))
    : { count: 0 };

  const stats = {
    total:     safe.length,
    published: safe.filter(p => p.status === 'published').length,
    views:     totalViews ?? 0,
  };

  return (
    <DashboardClient
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      playbooks={safe as any}
      stats={stats}
      profile={profile}
      userEmail={user.email ?? ''}
    />
  );
}
