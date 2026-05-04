import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Footer, Header } from '@/components/layout';
import { BookingFlow } from '@/components/booking';
import { AutumnOverlay, NotificationToast, SplashLoader } from '@/components/common';
import { LandingPage } from '@/pages/LandingPage';
import { useAutumnStore } from '@/store/autumnStore';

const SPLASH_MIN_DURATION_MS = 1400;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const autumnActive = useAutumnStore((s) => s.active);
  const autumnHovering = useAutumnStore((s) => s.hovering);

  useEffect(() => {
    const start = performance.now();
    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, SPLASH_MIN_DURATION_MS - elapsed);
      window.setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === 'complete') {
      finish();
      return;
    }

    window.addEventListener('load', finish, { once: true });
    return () => window.removeEventListener('load', finish);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('autumn-mode', autumnActive);
    return () => {
      document.body.classList.remove('autumn-mode');
    };
  }, [autumnActive]);

  useEffect(() => {
    document.body.classList.toggle('autumn-hover', autumnHovering && !autumnActive);
    return () => {
      document.body.classList.remove('autumn-hover');
    };
  }, [autumnHovering, autumnActive]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <SplashLoader visible={isLoading} />
      <Header />
      <LandingPage />
      <Footer />
      <BookingFlow />
      <NotificationToast />
      <AutumnOverlay />
    </Box>
  );
};

export default App;
