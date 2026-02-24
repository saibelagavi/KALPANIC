import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { PublishedView } from '@/components/playbook/PublishedView';
import type { Block } from '@/stores/editorStore';

export default async function PublishedPlaybookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: playbook, error } = await supabase
    .from('playbooks')
    .select('id, title, slug, content, theme_id, status, is_public')
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('is_public', true)
    .single();

  if (error || !playbook) {
    notFound();
  }

  const blocks: Block[] = (playbook.content as { blocks?: Block[] })?.blocks ?? [];
  const theme: string = playbook.theme_id ?? 'Obsidian';

  return <PublishedView title={playbook.title} blocks={blocks} theme={theme} slug={slug} />;
}
