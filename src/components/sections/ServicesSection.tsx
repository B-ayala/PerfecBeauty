import { useMemo, useState } from 'react';
import { Box, Button, Chip, Container, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { motion } from 'framer-motion';
import { SectionHeading, ServiceCard } from '@/components/common';
import { services } from '@/data/services';
import { useBookingStore } from '@/store/bookingStore';
import type { Service, ServiceCategory } from '@/types';

const CATEGORY_LABELS: Record<'all' | ServiceCategory, string> = {
  all: 'Todos',
  cabello: 'Cabello',
  color: 'Color',
  tratamientos: 'Tratamientos',
  unas: 'Uñas',
  estetica: 'Estética',
  novias: 'Novias',
};

const CATEGORIES: Array<'all' | ServiceCategory> = [
  'all',
  'cabello',
  'color',
  'tratamientos',
  'unas',
  'estetica',
  'novias',
];

export const ServicesSection = () => {
  const [category, setCategory] = useState<'all' | ServiceCategory>('all');
  const openBooking = useBookingStore((s) => s.openBooking);

  const filtered = useMemo(
    () => (category === 'all' ? services : services.filter((s) => s.category === category)),
    [category],
  );

  const handleSelect = (service: Service) => openBooking(service.id);

  return (
    <Box
      id="servicios"
      component="section"
      sx={{ py: { xs: 8, sm: 10, md: 14 }, backgroundColor: 'background.default' }}
    >
      <Container>
        <Stack spacing={{ xs: 4, sm: 5, md: 7 }}>
          <SectionHeading
            eyebrow="Servicios"
            title="Rituales de belleza a medida"
            subtitle="Elegí la experiencia que buscás. Cada servicio incluye diagnóstico personalizado, productos premium y tiempo sin apuros."
          />

          <Stack
            direction="row"
            spacing={0.75}
            justifyContent={{ xs: 'flex-start', sm: 'center' }}
            flexWrap={{ xs: 'nowrap', sm: 'wrap' }}
            useFlexGap
            sx={{
              rowGap: 1,
              overflowX: { xs: 'auto', sm: 'visible' },
              mx: { xs: -3, sm: 0 },
              px: { xs: 3, sm: 0 },
              pb: { xs: 1, sm: 0 },
              '::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            {CATEGORIES.map((key) => (
              <Chip
                key={key}
                label={CATEGORY_LABELS[key]}
                onClick={() => setCategory(key)}
                variant={category === key ? 'filled' : 'outlined'}
                sx={{
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 2, sm: 2.25 },
                  fontSize: { xs: '0.78rem', sm: '0.82rem' },
                  flexShrink: 0,
                  borderColor: 'divider',
                  backgroundColor: category === key ? 'primary.main' : 'transparent',
                  color: category === key ? 'primary.contrastText' : 'text.primary',
                  '&:hover': {
                    backgroundColor:
                      category === key ? 'primary.main' : 'rgba(26,26,26,0.04)',
                  },
                }}
              />
            ))}
          </Stack>

          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3.5 }}>
            {filtered.map((service, idx) => (
              <Grid key={service.id} xs={12} sm={6} lg={4}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  style={{ height: '100%' }}
                >
                  <ServiceCard service={service} onSelect={handleSelect} />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Stack alignItems="center">
            <Button size="large" variant="outlined" color="primary" onClick={() => openBooking()}>
              Reservar tu turno
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
