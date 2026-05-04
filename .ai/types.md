# Tipos y Contratos Comunes

## Servicios

```typescript
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutos
  category: ServiceCategory;
  image?: string;
  active: boolean;
}

export type ServiceCategory = 
  | 'corte'
  | 'coloracion'
  | 'tratamiento'
  | 'peinado'
  | 'manicure'
  | 'pedicure'
  | 'otro';
```

## Citas

```typescript
export interface Appointment {
  id: string;
  clientId: string;
  serviceId: string;
  date: string; // ISO date
  time: string; // HH:mm
  status: AppointmentStatus;
  notes?: string;
}

export type AppointmentStatus = 
  | 'pendiente'
  | 'confirmada'
  | 'en-proceso'
  | 'completada'
  | 'cancelada';

export interface AppointmentFormData {
  serviceId: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
  notes?: string;
}
```

## Clientes

```typescript
export interface Client {
  id: string;
  name: string;
  email?: string;
  phone: string;
  createdAt: string;
}
```

## UI Común

```typescript
export interface LoadingState {
  loading: boolean;
  error?: Error | null;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
```

## API Response

```typescript
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
```