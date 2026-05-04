import type { Professional } from '@/types';
import yeniPhoto from '@/assets/estilista.png';

export const professionals: Professional[] = [
  {
    id: 'pro-sofia',
    name: 'Yeni Beatriz Flores',
    role: 'Directora creativa · Color',
    bio: 'Especialista en balayage y color de autor. 14 años transformando cabelleras con técnicas europeas.',
    photoUrl: yeniPhoto,
    specialties: ['color', 'cabello'],
    yearsExperience: 14,
  },
  {
    id: 'pro-lucas',
    name: 'Lucas Romero',
    role: 'Estilista senior',
    bio: 'Cortes de autor, texturas y styling editorial. Mirada contemporánea y precisión milimétrica.',
    photoUrl:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format&fit=crop',
    specialties: ['cabello', 'novias'],
    yearsExperience: 10,
  },
  {
    id: 'pro-valentina',
    name: 'Valentina Ruiz',
    role: 'Esteticista integral',
    bio: 'Rituales faciales, radiofrecuencia y cosmetología natural. Cada tratamiento es una pausa de bienestar.',
    photoUrl:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop',
    specialties: ['estetica', 'tratamientos'],
    yearsExperience: 8,
  },
  {
    id: 'pro-camila',
    name: 'Camila Torres',
    role: 'Nail designer',
    bio: 'Manicura spa, nail art minimalista y extensiones. Obsesionada con el detalle y la higiene impecable.',
    photoUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop',
    specialties: ['unas'],
    yearsExperience: 6,
  },
];

export const getProfessionalById = (id: string | null): Professional | undefined =>
  professionals.find((p) => p.id === id);
