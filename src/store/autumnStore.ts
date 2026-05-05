import { create } from 'zustand';

interface Origin {
  x: number;
  y: number;
}

interface AutumnState {
  active: boolean;
  hovering: boolean;
  burstKey: number;
  origin: Origin | null;
  promoVisible: boolean;
  toggle: (origin?: Origin) => void;
  setActive: (value: boolean) => void;
  setHovering: (value: boolean) => void;
  togglePromo: () => void;
  setPromoVisible: (value: boolean) => void;
}

export const useAutumnStore = create<AutumnState>((set) => ({
  active: false,
  hovering: false,
  burstKey: 0,
  origin: null,
  promoVisible: false,
  toggle: (origin) =>
    set((s) => {
      const next = !s.active;
      if (next && origin) {
        return { active: true, origin, burstKey: s.burstKey + 1 };
      }
      return { active: next };
    }),
  setActive: (value) => set({ active: value }),
  setHovering: (value) => set({ hovering: value }),
  togglePromo: () => set((s) => ({ promoVisible: !s.promoVisible })),
  setPromoVisible: (value) => set({ promoVisible: value }),
}));
