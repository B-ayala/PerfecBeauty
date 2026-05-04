import { create } from 'zustand';
import type { BookingDraft, BookingStep } from '@/types';
import { emptyBookingDraft } from '@/services/bookingService';

interface BookingState {
  open: boolean;
  step: BookingStep;
  draft: BookingDraft;
  isSubmitting: boolean;
  openBooking: (initialServiceId?: string) => void;
  closeBooking: () => void;
  setStep: (step: BookingStep) => void;
  setService: (serviceId: string) => void;
  setProfessional: (professionalId: string | null) => void;
  setDateTime: (date: string | null, time: string | null) => void;
  setCustomer: (customer: Partial<BookingDraft['customer']>) => void;
  setSubmitting: (value: boolean) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  open: false,
  step: 'service',
  draft: emptyBookingDraft(),
  isSubmitting: false,
  openBooking: (initialServiceId) =>
    set(() => ({
      open: true,
      step: initialServiceId ? 'schedule' : 'service',
      draft: { ...emptyBookingDraft(), serviceId: initialServiceId ?? null },
    })),
  closeBooking: () => set({ open: false }),
  setStep: (step) => set({ step }),
  setService: (serviceId) =>
    set((state) => ({ draft: { ...state.draft, serviceId } })),
  setProfessional: (professionalId) =>
    set((state) => ({ draft: { ...state.draft, professionalId } })),
  setDateTime: (date, time) =>
    set((state) => ({ draft: { ...state.draft, date, time } })),
  setCustomer: (customer) =>
    set((state) => ({
      draft: { ...state.draft, customer: { ...state.draft.customer, ...customer } },
    })),
  setSubmitting: (value) => set({ isSubmitting: value }),
  reset: () =>
    set({
      open: false,
      step: 'service',
      draft: emptyBookingDraft(),
      isSubmitting: false,
    }),
}));
