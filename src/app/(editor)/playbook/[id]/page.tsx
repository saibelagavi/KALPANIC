'use client';

import { use, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useEditorStore } from '@/stores/editorStore';
import { BlockPicker } from '@/components/editor/BlockPicker';
import { Canvas } from '@/components/editor/Canvas';
import { ThemePanel } from '@/components/editor/ThemePanel';
import { PreviewOverlay } from '@/components/editor/PreviewOverlay';
import { createClient } from '@/lib/supabase/client';
import type { Block } from '@/stores/editorStore';

export default function PlaybookEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const activeTheme = useEditorStore((s) => s.activeTheme);
  const setBlocks = useEditorStore((s) => s.setBlocks);
  const [showPreview, setShowPreview] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load saved blocks from Supabase on first mount (handles AI-generated content)
  useEffect(() => {
    if (hydrated) return;
    const supabase = createClient();
    supabase
      .from('playbooks')
      .select('content, theme_id')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data?.content) {
          type ContentShape = { blocks?: Block[]; theme?: string };
          const content = data.content as ContentShape;
          if (Array.isArray(content.blocks) && content.blocks.length > 0) {
            setBlocks(content.blocks, content.theme ?? data.theme_id ?? undefined);
          }
        }
        setHydrated(true);
      });
  }, [id, hydrated, setBlocks]);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr 240px',
          height: 'calc(100vh - 56px)',
          overflow: 'hidden',
        }}
      >
        <BlockPicker />
        <Canvas playbookId={id} activeTheme={activeTheme} />
        <ThemePanel playbookId={id} onPreview={() => setShowPreview(true)} />
      </div>

      <AnimatePresence>
        {showPreview && <PreviewOverlay onClose={() => setShowPreview(false)} />}
      </AnimatePresence>
    </>
  );
}
