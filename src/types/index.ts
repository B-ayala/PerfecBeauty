export type ServiceCategory =
  | 'cabello'
  | 'color'
  | 'tratamientos'
  | 'unas'
  | 'estetica'
  | 'novias';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  priceFrom: number;
  durationMin: number;
  imageUrl: string;
  featured?: boolean;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  specialties: ServiceCategory[];
  yearsExperience: number;
}

export interface Testimonial {
  id: string;
  author: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  avatarUrl?: string;
}

export interface Benefit {
  id: string;
  icon: 'spa' | 'star' | 'leaf' | 'diamond' | 'heart' | 'clock';
  title: string;
  description: string;
}

export interface TimeSlot {
  value: string;
  label: string;
  available: boolean;
}

export interface BookingDraft {
  serviceId: string | null;
  professionalId: string | null;
  date: string | null;
  time: string | null;
  customer: {
    name: string;
    phone: string;
    email: string;
    notes?: string;
  };
}

export interface BookingConfirmation extends BookingDraft {
  id: string;
  createdAt: string;
}

export type BookingStep = 'service' | 'schedule' | 'details' | 'payment' | 'confirmation';

export interface NotificationItem {
  id: string;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  durationMs?: number;
}
