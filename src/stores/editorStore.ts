import { create } from 'zustand';

export type BlockType = 'text' | 'data-visual' | 'media' | 'step-flow' | 'quote' | 'nakshi';

export interface DataRow {
  id: string;
  label: string;
  value: number;
}

export interface Block {
  id: string;
  type: BlockType;
  content: {
    // text
    text?: string;
    fontSize?: 'sm' | 'md' | 'lg';
    // data-visual
    title?: string;
    rows?: DataRow[];
    // media
    caption?: string;
    imageUrl?: string;
    // step-flow
    steps?: string[];
    // quote
    quote?: string;
    attribution?: string;
    // nakshi
    calloutType?: 'info' | 'insight' | 'warning' | 'highlight';
  };
}

interface EditorStore {
  blocks: Block[];
  selectedBlockId: string | null;
  activeTheme: string;
  addBlock: (type: BlockType) => void;
  removeBlock: (id: string) => void;
  updateBlock: (id: string, content: Partial<Block['content']>) => void;
  selectBlock: (id: string | null) => void;
  moveBlock: (id: string, direction: 'up' | 'down') => void;
  duplicateBlock: (id: string) => void;
  setTheme: (theme: string) => void;
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function defaultContent(type: BlockType): Block['content'] {
  switch (type) {
    case 'text':
      return { text: 'Click to edit this text block. Add your key ideas, explanations, or any content that tells your story.', fontSize: 'md' };
    case 'data-visual':
      return {
        title: 'Performance Overview',
        rows: [
          { id: uid(), label: 'Q1', value: 42 },
          { id: uid(), label: 'Q2', value: 78 },
          { id: uid(), label: 'Q3', value: 55 },
          { id: uid(), label: 'Q4', value: 91 },
        ],
      };
    case 'media':
      return { caption: 'Add a descriptive caption...' };
    case 'step-flow':
      return { steps: ['Define your goal clearly', 'Identify the key actions needed', 'Execute and measure results'] };
    case 'quote':
      return {
        quote: 'The best time to plant a tree was 20 years ago. The second best time is now.',
        attribution: 'Chinese Proverb',
      };
    case 'nakshi':
      return {
        text: 'Key insight: Highlight something important your audience needs to remember.',
        calloutType: 'insight',
      };
    default:
      return {};
  }
}

export const useEditorStore = create<EditorStore>((set) => ({
  blocks: [],
  selectedBlockId: null,
  activeTheme: 'Obsidian',

  addBlock: (type) =>
    set((state) => ({
      blocks: [
        ...state.blocks,
        { id: uid(), type, content: defaultContent(type) },
      ],
    })),

  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
      selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    })),

  updateBlock: (id, content) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id ? { ...b, content: { ...b.content, ...content } } : b
      ),
    })),

  selectBlock: (id) => set({ selectedBlockId: id }),

  moveBlock: (id, direction) =>
    set((state) => {
      const idx = state.blocks.findIndex((b) => b.id === id);
      if (idx === -1) return state;
      const newBlocks = [...state.blocks];
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= newBlocks.length) return state;
      [newBlocks[idx], newBlocks[targetIdx]] = [newBlocks[targetIdx], newBlocks[idx]];
      return { blocks: newBlocks };
    }),

  duplicateBlock: (id) =>
    set((state) => {
      const idx = state.blocks.findIndex((b) => b.id === id);
      if (idx === -1) return state;
      const original = state.blocks[idx];
      const duplicate: Block = {
        ...original,
        id: uid(),
        content: JSON.parse(JSON.stringify(original.content)),
      };
      const newBlocks = [...state.blocks];
      newBlocks.splice(idx + 1, 0, duplicate);
      return { blocks: newBlocks };
    }),

  setTheme: (theme) => set({ activeTheme: theme }),
}));
