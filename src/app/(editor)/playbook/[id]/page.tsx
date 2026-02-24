'use client';

import { use, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useEditorStore } from '@/stores/editorStore';
import { BlockPicker } from '@/components/editor/BlockPicker';
import { Canvas } from '@/components/editor/Canvas';
import { ThemePanel } from '@/components/editor/ThemePanel';
import { PreviewOverlay } from '@/components/editor/PreviewOverlay';

export default function PlaybookEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const activeTheme = useEditorStore((s) => s.activeTheme);
  const [showPreview, setShowPreview] = useState(false);

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
