import { Box, Button, Container, Divider, IconButton, Stack, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { Logo } from './Logo';
import { useBookingStore } from '@/store/bookingStore';

const FOOTER_LINKS = [
  {
    heading: 'Servicios',
    items: ['Cabello', 'Coloración', 'Tratamientos', 'Uñas', 'Estética', 'Novias'],
  },
  {
    heading: 'Maison',
    items: ['Nosotros', 'Profesionales', 'Testimonios', 'Gift cards'],
  },
  {
    heading: 'Horarios',
    items: ['Lun a Vie · 9 a 20 h', 'Sábados · 9 a 18 h', 'Domingos · cerrado'],
  },
];

export const Footer = () => {
  const openBooking = useBookingStore((s) => s.openBooking);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        pt: { xs: 6, sm: 8, md: 12 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 5, sm: 6, md: 4 }}
          justifyContent="space-between"
        >
          <Stack spacing={{ xs: 2.5, sm: 3 }} sx={{ maxWidth: 360 }}>
            <Logo variant="light" />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Un espacio pensado para pausar, cuidarte y salir sintiéndote la mejor versión de vos
              misma.
            </Typography>
            <Stack direction="row" spacing={1}>
              {[InstagramIcon, FacebookRoundedIcon, WhatsAppIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  aria-label="Red social"
                  sx={{
                    color: 'primary.contrastText',
                    border: '1px solid rgba(255,255,255,0.16)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
            <Button
              variant="contained"
              onClick={() => openBooking()}
              sx={{
                alignSelf: 'flex-start',
                backgroundColor: 'accent.main',
                color: 'primary.main',
                '&:hover': { backgroundColor: 'accent.light' },
              }}
            >
              Reservar turno
            </Button>
          </Stack>

          <Stack
            direction={{ xs: 'row', md: 'row' }}
            spacing={{ xs: 3, sm: 5, md: 6 }}
            flexWrap={{ xs: 'wrap', md: 'nowrap' }}
            useFlexGap
            sx={{ flex: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' }, rowGap: 3 }}
          >
            {FOOTER_LINKS.map((col) => (
              <Stack
                key={col.heading}
                spacing={1.25}
                sx={{ minWidth: { xs: '42%', sm: 140 }, flex: { xs: '1 1 42%', md: '0 0 auto' } }}
              >
                <Typography
                  variant="eyebrow"
                  sx={{ color: 'accent.light', fontSize: '0.68rem' }}
                >
                  {col.heading}
                </Typography>
                <Stack spacing={1}>
                  {col.items.map((item) => (
                    <Typography
                      key={item}
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.72)',
                        cursor: 'pointer',
                        '&:hover': { color: 'background.default' },
                      }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Divider sx={{ my: { xs: 4, sm: 5, md: 7 }, borderColor: 'rgba(255,255,255,0.12)' }} />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 2.5 }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 1.25, md: 3 }}
            sx={{ color: 'rgba(255,255,255,0.72)' }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <PlaceRoundedIcon fontSize="small" sx={{ color: 'accent.light' }} />
              <Typography variant="body2">
                Calle Juan Misael Saracho y Corrado · Tarija, Bolivia
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CallRoundedIcon fontSize="small" sx={{ color: 'accent.light' }} />
              <Typography
                component="a"
                href="tel:+59175144887"
                variant="body2"
                sx={{ color: 'inherit', textDecoration: 'none' }}
              >
                +591 75144887
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MailRoundedIcon fontSize="small" sx={{ color: 'accent.light' }} />
              <Typography
                component="a"
                href="mailto:yenibtrzaguirreflors@gmail.com"
                variant="body2"
                sx={{ color: 'inherit', textDecoration: 'none', wordBreak: 'break-word' }}
              >
                yenibtrzaguirreflors@gmail.com
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)' }}>
            © {new Date().getFullYear()} Perfec Beauty · Todos los derechos reservados
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};
