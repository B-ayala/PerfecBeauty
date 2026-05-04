export const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const isValidPhone = (value: string): boolean =>
  /^[+()0-9\s-]{7,}$/.test(value.trim());

export const isNonEmpty = (value: string): boolean => value.trim().length >= 2;
