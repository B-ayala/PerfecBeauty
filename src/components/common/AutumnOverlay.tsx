import { GlobalStyles, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { FallingLeaves } from './FallingLeaves';
import { useAutumnStore } from '@/store/autumnStore';

export const AutumnOverlay = () => {
  const active = useAutumnStore((s) => s.active);
  const hovering = useAutumnStore((s) => s.hovering);
  const showLeaves = active || hovering;

  return (
    <>
      <GlobalStyles
        styles={{
          'html, body': {
            transition: 'background-color 1.2s ease',
          },
          'body.autumn-mode': {
            backgroundColor: '#FFF4E6 !important',
          },
          'body.autumn-mode *': {
            transition:
              'background-color 1.2s ease, color 1.2s ease, border-color 1.2s ease, box-shadow 1.2s ease !important',
          },
          'body.autumn-mode .MuiAppBar-root[class*="MuiAppBar-positionFixed"]': {
            backgroundColor: 'rgba(255, 240, 220, 0.85) !important',
          },
          'body.autumn-hover .autumn-trigger': {
            transform: 'translateY(-1px) scale(1.02)',
          },
          '@keyframes autumn-pulse': {
            '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
            '50%': { transform: 'scale(1.12) rotate(-6deg)' },
          },
          '.autumn-monkey-pulse': {
            display: 'inline-flex',
            transformOrigin: 'center',
            animation: 'autumn-pulse 2.6s ease-in-out infinite',
          },
          '@keyframes autumn-heart-float': {
            '0%': { opacity: 0, transform: 'translate(-50%, 0) scale(0.6)' },
            '20%': { opacity: 1, transform: 'translate(-50%, -8px) scale(1)' },
            '100%': { opacity: 0, transform: 'translate(-50%, -36px) scale(0.8)' },
          },
          '@keyframes leaf-fall': {
            '0%': {
              transform:
                'translate3d(0, -12vh, 0) rotate(var(--leaf-rs, 0deg))',
              opacity: 0,
            },
            '10%, 90%': {
              opacity: 'var(--leaf-op, 0.8)',
            },
            '100%': {
              transform:
                'translate3d(var(--leaf-drift, 0px), 112vh, 0) rotate(var(--leaf-re, 360deg))',
              opacity: 0,
            },
          },
          '@media (prefers-reduced-motion: reduce)': {
            '.autumn-monkey-pulse': { animation: 'none' },
          },
        }}
      />

      <FallingLeaves visible={showLeaves} count={active ? 32 : 14} />

      <AnimatePresence>
        {active && (
          <motion.div
            key="autumn-vignette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 1,
              background:
                'linear-gradient(135deg, rgba(217,147,71,0.22) 0%, rgba(201,114,44,0.14) 50%, rgba(140,63,26,0.22) 100%)',
              mixBlendMode: 'multiply',
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            key="autumn-banner"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: 'calc(env(safe-area-inset-top, 0px) + 76px)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1200,
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 1, sm: 1.25 },
                borderRadius: 999,
                backgroundColor: 'rgba(255, 244, 230, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(168,84,28,0.25)',
                boxShadow: '0 12px 32px -16px rgba(140,63,26,0.4)',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                color: '#8C3F1A',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                maxWidth: '90vw',
              }}
            >
              <span style={{ fontSize: '1.1em' }}>🍂</span>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Bienvenida, Yeni — un otoño hecho para vos
              </span>
              <span style={{ fontSize: '1.1em' }}>🤎</span>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
