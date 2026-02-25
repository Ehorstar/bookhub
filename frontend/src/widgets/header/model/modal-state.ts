import { create } from "zustand";

export type Panel = "cart" | "profile";

type UiState = {
  activePanel: Panel | null;
  open: (panel: Panel) => void;
  toggle: (panel: Panel) => void;
  close: (panel?: Panel) => void;
  isOpen: (panel: Panel) => boolean;
};

export const useUiState = create<UiState>((set, get) => ({
  activePanel: null,
  open: (panel) => set({ activePanel: panel }),
  toggle: (panel) =>
    set((s) => ({ activePanel: s.activePanel === panel ? null : panel })),
  close: (panel) =>
    set((s) => ({
      activePanel: !panel
        ? null
        : s.activePanel === panel
          ? null
          : s.activePanel,
    })),
  isOpen: (panel) => get().activePanel === panel,
}));
