/**
 * Paleta Perfec Beauty
 * Neutros cálidos (lino, crema, carbón) con acentos rosé & champagne.
 * Pensada para una estética de "lujo accesible" y bienestar.
 */
export const palette = {
  ivory: '#FAFAF7',
  linen: '#F5F1EB',
  sand: '#EDE5D8',
  mist: '#E8E3DC',
  charcoal: '#1A1A1A',
  graphite: '#2B2B2B',
  taupe: '#6B5F54',
  stone: '#8A8177',
  rose: '#D4A5A5',
  roseDeep: '#B9877C',
  champagne: '#C9A961',
  champagneDark: '#A68746',
  blush: '#F4E5E0',
  success: '#6B8E5E',
  warning: '#D9A441',
  error: '#B55C5C',
} as const;

export type PaletteToken = keyof typeof palette;
