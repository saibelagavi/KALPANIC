'use client';

import { use } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { BlockPicker } from '@/components/editor/BlockPicker';
import { Canvas } from '@/components/editor/Canvas';
import { ThemePanel } from '@/components/editor/ThemePanel';

export default function PlaybookEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const activeTheme = useEditorStore((s) => s.activeTheme);

  return (
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
      <ThemePanel />
    </div>
  );
}
