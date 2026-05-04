import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'srv-corte-estilo',
    name: 'Corte & Estilismo',
    category: 'cabello',
    description:
      'Diagnóstico personalizado, corte de autor y peinado de terminación con productos premium.',
    priceFrom: 120,
    durationMin: 60,
    imageUrl:
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'srv-coloracion',
    name: 'Coloración de Autor',
    category: 'color',
    description:
      'Balayage, highlights y color global con técnicas libres de amoníaco y máxima luminosidad.',
    priceFrom: 280,
    durationMin: 150,
    imageUrl:
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'srv-botox-capilar',
    name: 'Botox & Nutrición',
    category: 'tratamientos',
    description:
      'Tratamiento reparador profundo para devolver brillo, suavidad y vitalidad desde la fibra.',
    priceFrom: 180,
    durationMin: 75,
    imageUrl:
      'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'srv-manicura-spa',
    name: 'Manicura Spa',
    category: 'unas',
    description:
      'Ritual de manos con exfoliación, hidratación y esmaltado semipermanente de larga duración.',
    priceFrom: 95,
    durationMin: 50,
    imageUrl:
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'srv-facial-premium',
    name: 'Facial Lumière',
    category: 'estetica',
    description:
      'Limpieza profunda + radiofrecuencia y sérum de activos botánicos para un glow instantáneo.',
    priceFrom: 220,
    durationMin: 70,
    imageUrl:
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'srv-novias',
    name: 'Experiencia Novias',
    category: 'novias',
    description:
      'Paquete integral con prueba, peinado, maquillaje y atención personalizada para tu gran día.',
    priceFrom: 850,
    durationMin: 180,
    imageUrl:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80&auto=format&fit=crop',
  },
];

export const getServiceById = (id: string | null): Service | undefined =>
  services.find((s) => s.id === id);

export const featuredServices = services.filter((s) => s.featured);
