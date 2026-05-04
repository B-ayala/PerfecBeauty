# Estructura de Componentes

## Patrón Container/Presentational

```typescript
// Presentational: solo UI, recibe props
const ServiceCard = ({ title, price, image }) => (
  <Card>...</Card>
);

// Container: maneja estado y lógica
const ServiceCardContainer = (props) => {
  const { data } = useService(props.id);
  return <ServiceCard {...data} />;
};
```

## Componente típico

```typescript
// filepath: components/ServiceCard.tsx
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ServiceCardProps {
  title: string;
  price: number;
  duration?: number;
  image?: string;
  onClick?: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

export const ServiceCard = ({ 
  title, 
  price, 
  duration, 
  image, 
  onClick 
}: ServiceCardProps) => {
  return (
    <StyledCard onClick={onClick}>
      {image && <CardMedia component="img" height="140" image={image} />}
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          S/ {price.toFixed(2)}
        </Typography>
        {duration && (
          <Typography variant="caption">
            {duration} min
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};
```

## Hook personalizado típico

```typescript
// filepath: hooks/useService.ts
import { useState, useEffect } from 'react';
import { serviceService } from '../services/serviceService';
import type { Service } from '../types';

export const useService = (id: string) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const data = await serviceService.getById(id);
        setService(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  return { service, loading, error };
};
```

## Store Zustand típico

```typescript
// filepath: store/useNotificationStore.ts
import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface NotificationState {
  notifications: Notification[];
  add: (notification: Omit<Notification, 'id'>) => void;
  remove: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  add: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: crypto.randomUUID() },
      ],
    })),
  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
```