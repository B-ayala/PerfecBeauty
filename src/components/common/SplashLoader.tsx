import { Box, CircularProgress } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '@/assets/perfec-beauty-logo.png';

interface SplashLoaderProps {
  visible: boolean;
}

export const SplashLoader = ({ visible }: SplashLoaderProps) => (
  <AnimatePresence>
    {visible && (
      <Box
        component={motion.div}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        role="status"
        aria-live="polite"
        aria-label="Cargando Perfec Beauty"
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: (theme) => theme.zIndex.modal + 100,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          background:
            'radial-gradient(circle at 50% 40%, #FAFAF7 0%, #F5F1EB 60%, #EDE5D8 100%)',
        }}
      >
        <Box
          component={motion.img}
          src={logo}
          alt="Perfec Beauty"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          sx={{
            width: { xs: 180, sm: 220 },
            height: { xs: 180, sm: 220 },
            objectFit: 'cover',
            borderRadius: '50%',
            clipPath: 'circle(46% at 50% 50%)',
            filter: 'drop-shadow(0 6px 24px rgba(26,26,26,0.18))',
          }}
        />
        <Box
          component={motion.div}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <CircularProgress
            size={28}
            thickness={3}
            sx={{ color: 'accent.main' }}
          />
        </Box>
      </Box>
    )}
  </AnimatePresence>
);
