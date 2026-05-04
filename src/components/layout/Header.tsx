import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Logo } from './Logo';
import { ReserveButton } from './ReserveButton';
import { useBookingStore } from '@/store/bookingStore';
import { useAutumnStore } from '@/store/autumnStore';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Turnos', href: '#turnos' },
  { label: 'Contacto', href: '#contacto' },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const openBooking = useBookingStore((s) => s.openBooking);
  const toggleAutumn = useAutumnStore((s) => s.toggle);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReserve = () => {
    toggleAutumn();
    openBooking();
  };

  const handleReserveFromDrawer = () => {
    setMobileOpen(false);
    handleReserve();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: scrolled ? 'rgba(250,250,247,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: (t) =>
            scrolled ? `1px solid ${t.palette.divider}` : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ py: { xs: 1.25, md: 1.5 }, gap: { xs: 1, md: 2 } }}>
            <Box sx={{ flex: '0 0 auto' }}>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Logo size="sm" />
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Logo />
              </Box>
            </Box>

            <Stack
              direction="row"
              spacing={0.5}
              sx={{ flex: 1, justifyContent: 'center', display: { xs: 'none', md: 'flex' } }}
            >
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    color: 'text.primary',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" spacing={{ xs: 0.5, md: 1 }} alignItems="center">
              <ReserveButton
                label="Reservar"
                size="small"
                monkeySize={16}
                onClick={handleReserve}
                sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              />
              <ReserveButton
                onClick={handleReserve}
                sx={{ display: { xs: 'none', md: 'inline-flex' } }}
              />
              <IconButton
                aria-label="Abrir menú"
                onClick={() => setMobileOpen(true)}
                sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'text.primary' }}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: { xs: '88%', sm: 360 }, p: { xs: 2.5, sm: 3 } } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Logo size="sm" />
          <IconButton aria-label="Cerrar menú" onClick={() => setMobileOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Stack spacing={0.5}>
          {NAV_ITEMS.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              onClick={() => handleNavClick(item.href)}
              sx={{
                justifyContent: 'flex-start',
                color: 'text.primary',
                fontSize: '1.05rem',
                py: 1.25,
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
        <ReserveButton
          size="large"
          showHearts={false}
          onClick={handleReserveFromDrawer}
          sx={{ mt: 4 }}
        />
      </Drawer>
    </>
  );
};
