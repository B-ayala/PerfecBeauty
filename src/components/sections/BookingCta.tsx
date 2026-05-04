import { Box, Button, Container, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';

const CTA_IMAGE =
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&q=80&auto=format&fit=crop';

export const BookingCta = () => {
  const openBooking = useBookingStore((s) => s.openBooking);

  return (
    <Box
      id="turnos"
      component="section"
      sx={{ py: { xs: 8, sm: 10, md: 14 }, backgroundColor: 'background.default' }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Box
            sx={{
              position: 'relative',
              borderRadius: { xs: 3, md: 4 },
              overflow: 'hidden',
              minHeight: { xs: 440, sm: 460, md: 420 },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={CTA_IMAGE}
              alt="Ambiente del salón"
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(100deg, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.55) 55%, rgba(26,26,26,0.25) 100%)',
              }}
            />
            <Container sx={{ position: 'relative', zIndex: 1, py: { xs: 5, sm: 6, md: 8 } }}>
              <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: 560 }}>
                <Typography variant="eyebrow" sx={{ color: 'accent.light' }}>
                  Reserva online
                </Typography>
                <Typography variant="h2" sx={{ color: 'background.default' }}>
                  Tu próximo <Box component="em" sx={{ color: 'accent.light', fontStyle: 'italic' }}>ritual</Box> empieza acá.
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.82)' }}>
                  Elegí servicio, profesional y horario en 3 pasos. Recibís la confirmación al
                  instante y un recordatorio 24 h antes.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.25}
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => openBooking()}
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={{
                      width: { xs: '100%', sm: 'auto' },
                      backgroundColor: 'accent.main',
                      color: 'primary.main',
                      '&:hover': { backgroundColor: 'accent.light' },
                    }}
                  >
                    Reservar turno
                  </Button>
                  <Button
                    size="large"
                    variant="outlined"
                    href="#contacto"
                    sx={{
                      width: { xs: '100%', sm: 'auto' },
                      color: 'background.default',
                      borderColor: 'rgba(255,255,255,0.4)',
                      '&:hover': {
                        borderColor: 'background.default',
                        backgroundColor: 'rgba(255,255,255,0.06)',
                      },
                    }}
                  >
                    Hablar por WhatsApp
                  </Button>
                </Stack>
              </Stack>
            </Container>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};
