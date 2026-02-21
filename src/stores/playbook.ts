import { create } from "zustand";
import type { Playbook } from "@/types/playbook";

interface PlaybookStore {
  currentPlaybook: Playbook | null;
  isDirty: boolean;
  setPlaybook: (playbook: Playbook) => void;
  updateContent: (content: Playbook["content"]) => void;
  setTheme: (themeId: string) => void;
  setVinyas: (vinyasId: string) => void;
  markClean: () => void;
}

export const usePlaybookStore = create<PlaybookStore>((set) => ({
  currentPlaybook: null,
  isDirty: false,

  setPlaybook: (playbook) => set({ currentPlaybook: playbook, isDirty: false }),

  updateContent: (content) =>
    set((state) => ({
      currentPlaybook: state.currentPlaybook
        ? { ...state.currentPlaybook, content }
        : null,
      isDirty: true,
    })),

  setTheme: (themeId) =>
    set((state) => ({
      currentPlaybook: state.currentPlaybook
        ? { ...state.currentPlaybook, theme_id: themeId as Playbook["theme_id"] }
        : null,
      isDirty: true,
    })),

  setVinyas: (vinyasId) =>
    set((state) => ({
      currentPlaybook: state.currentPlaybook
        ? { ...state.currentPlaybook, vinyas_id: vinyasId }
        : null,
      isDirty: true,
    })),

  markClean: () => set({ isDirty: false }),
}));
