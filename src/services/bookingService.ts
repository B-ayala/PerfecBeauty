import type { BookingConfirmation, BookingDraft, TimeSlot } from '@/types';
import { baseTimeSlots } from '@/data/timeSlots';
import { generateId } from '@/utils/format';
import { isNonEmpty, isValidEmail, isValidPhone } from '@/utils/validators';

export const emptyBookingDraft = (): BookingDraft => ({
  serviceId: null,
  professionalId: null,
  date: null,
  time: null,
  customer: { name: '', phone: '', email: '', notes: '' },
});

/**
 * Devuelve slots disponibles simulando reglas reales:
 * - Domingos cerrados
 * - Algunos horarios aleatorios ocupados según profesional / fecha
 */
export const getAvailableSlots = (
  date: string | null,
  professionalId: string | null,
): TimeSlot[] => {
  if (!date) return [];
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return [];
  if (d.getDay() === 0) return [];

  const seed = `${date}-${professionalId ?? 'any'}`
    .split('')
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  return baseTimeSlots.map((slot, idx) => {
    const pseudoRandom = (seed * 9301 + idx * 49297) % 233280;
    const occupied = pseudoRandom % 4 === 0;
    return { ...slot, available: !occupied };
  });
};

export interface DraftValidation {
  ok: boolean;
  errors: Partial<Record<keyof BookingDraft | 'name' | 'phone' | 'email', string>>;
}

export const validateScheduleStep = (draft: BookingDraft): DraftValidation => {
  const errors: DraftValidation['errors'] = {};
  if (!draft.date) errors.date = 'Elegí una fecha';
  if (!draft.time) errors.time = 'Elegí un horario';
  return { ok: Object.keys(errors).length === 0, errors };
};

export const validateDetailsStep = (draft: BookingDraft): DraftValidation => {
  const errors: DraftValidation['errors'] = {};
  if (!isNonEmpty(draft.customer.name)) errors.name = 'Ingresá tu nombre';
  if (!isValidPhone(draft.customer.phone)) errors.phone = 'Teléfono inválido';
  if (!isValidEmail(draft.customer.email)) errors.email = 'Email inválido';
  return { ok: Object.keys(errors).length === 0, errors };
};

export const confirmBooking = async (draft: BookingDraft): Promise<BookingConfirmation> => {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return {
    ...draft,
    id: generateId('booking'),
    createdAt: new Date().toISOString(),
  };
};

export const getMinBookingDate = (): string => {
  const today = new Date();
  return today.toISOString().slice(0, 10);
};

export const getMaxBookingDate = (): string => {
  const max = new Date();
  max.setMonth(max.getMonth() + 2);
  return max.toISOString().slice(0, 10);
};
