import { create } from 'zustand';

interface AutumnState {
  active: boolean;
  hovering: boolean;
  toggle: () => void;
  setActive: (value: boolean) => void;
  setHovering: (value: boolean) => void;
}

export const useAutumnStore = create<AutumnState>((set) => ({
  active: false,
  hovering: false,
  toggle: () => set((s) => ({ active: !s.active })),
  setActive: (value) => set({ active: value }),
  setHovering: (value) => set({ hovering: value }),
}));
