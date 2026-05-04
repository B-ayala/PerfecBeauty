import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DirectionsRoundedIcon from '@mui/icons-material/DirectionsRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/common';

const PHONE_DISPLAY = '+591 75144887';
const PHONE_DIGITS = '59175144887';
const EMAIL = 'yenibtrzaguirreflors@gmail.com';
const ADDRESS_FULL =
  'Calle Juan Misael Saracho entre Corrado y Fray Manuel Mingo, al lado del colegio San Roque · Tarija, Bolivia';
const ADDRESS_SHORT = 'Calle Juan Misael Saracho y Corrado, al lado del colegio San Roque';
const MAPS_QUERY = encodeURIComponent(
  'Calle Juan Misael Saracho y Corrado, Tarija, Bolivia',
);
const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
const WHATSAPP_URL = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
  'Hola, quisiera reservar un turno.',
)}`;

const CONTACT_ITEMS = [
  {
    icon: PlaceRoundedIcon,
    label: 'Dirección',
    value: ADDRESS_FULL,
    href: MAPS_DIRECTIONS,
  },
  {
    icon: CallRoundedIcon,
    label: 'Teléfono',
    value: PHONE_DISPLAY,
    href: `tel:+${PHONE_DIGITS}`,
  },
  {
    icon: MailRoundedIcon,
    label: 'Correo',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: ScheduleRoundedIcon,
    label: 'Horarios',
    value: 'Lun a Vie · 9 a 20 h · Sábados · 9 a 18 h',
    href: undefined,
  },
] as const;

export const ContactSection = () => (
  <Box
    id="contacto"
    component="section"
    sx={{ py: { xs: 8, sm: 10, md: 14 }, backgroundColor: 'background.paper' }}
  >
    <Container>
      <Stack spacing={{ xs: 4, sm: 5, md: 7 }}>
        <SectionHeading
          eyebrow="Contacto"
          title="Visitanos en Tarija"
          subtitle={`Te esperamos en ${ADDRESS_SHORT}. Escribinos por WhatsApp o llamanos para reservar tu turno.`}
        />

        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
          <Grid xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              style={{ height: '100%' }}
            >
              <Stack
                spacing={{ xs: 2, md: 2.5 }}
                sx={{
                  height: '100%',
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  backgroundColor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <Stack key={label} direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        flexShrink: 0,
                        borderRadius: 2,
                        display: 'grid',
                        placeItems: 'center',
                        backgroundColor: 'secondary.light',
                        color: 'accent.dark',
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                    <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                      <Typography variant="eyebrow" sx={{ fontSize: '0.68rem' }}>
                        {label}
                      </Typography>
                      {href ? (
                        <Typography
                          component="a"
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          variant="body2"
                          sx={{
                            color: 'text.primary',
                            fontWeight: 500,
                            textDecoration: 'none',
                            wordBreak: 'break-word',
                            '&:hover': { color: 'accent.dark' },
                          }}
                        >
                          {value}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.primary', fontWeight: 500 }}
                        >
                          {value}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                ))}

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.25}
                  sx={{ pt: { xs: 1, md: 1.5 } }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<WhatsAppIcon />}
                    sx={{ flex: 1 }}
                  >
                    WhatsApp
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={MAPS_DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<DirectionsRoundedIcon />}
                    sx={{ flex: 1 }}
                  >
                    Cómo llegar
                  </Button>
                </Stack>
              </Stack>
            </motion.div>
          </Grid>

          <Grid xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ height: '100%' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  minHeight: { xs: 320, sm: 380, md: 460 },
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 30px 60px -30px rgba(26,26,26,0.25)',
                }}
              >
                <Box
                  component="iframe"
                  title="Ubicación del salón en Tarija"
                  src={MAPS_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  sx={{
                    border: 0,
                    width: '100%',
                    height: '100%',
                    display: 'block',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  </Box>
);
