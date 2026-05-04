import type { TimeSlot } from '@/types';

/**
 * Slots base que el servicio luego filtra / marca como no-disponibles.
 * Representan la grilla horaria estándar del salón.
 */
const HOURS: Array<[number, number]> = [
  [9, 0], [9, 30],
  [10, 0], [10, 30],
  [11, 0], [11, 30],
  [12, 0], [12, 30],
  [14, 0], [14, 30],
  [15, 0], [15, 30],
  [16, 0], [16, 30],
  [17, 0], [17, 30],
  [18, 0], [18, 30],
  [19, 0], [19, 30],
];

export const baseTimeSlots: TimeSlot[] = HOURS.map(([h, m]) => {
  const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  return { value, label: value, available: true };
});
