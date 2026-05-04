const priceNumberFormatter = new Intl.NumberFormat('es-BO', {
  maximumFractionDigits: 0,
});

export const formatPrice = (value: number): string => `Bs ${priceNumberFormatter.format(value)}`;

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m} m`;
};

export const formatDateLong = (iso: string): string => {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
};

export const generateId = (prefix = 'id'): string =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
