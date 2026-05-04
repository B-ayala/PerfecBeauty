import { Box, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ServiceCard } from '@/components/common';
import { services } from '@/data/services';
import { useBookingStore } from '@/store/bookingStore';
import type { Service } from '@/types';

interface ServiceStepProps {
  onNext: () => void;
}

export const ServiceStep = ({ onNext }: ServiceStepProps) => {
  const selectedId = useBookingStore((s) => s.draft.serviceId);
  const setService = useBookingStore((s) => s.setService);

  const handleSelect = (service: Service) => {
    setService(service.id);
    setTimeout(onNext, 220);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" component="h2" gutterBottom>
          ¿Qué querés hacerte hoy?
        </Typography>
        <Typography variant="body2">
          Elegí el servicio con el que vas a empezar tu experiencia. Después sumás extras si querés.
        </Typography>
      </Box>

      <Grid container spacing={2.5}>
        {services.map((service) => (
          <Grid key={service.id} xs={12} sm={6}>
            <ServiceCard
              service={service}
              onSelect={handleSelect}
              selected={service.id === selectedId}
              compact
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
