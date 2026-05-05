import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { GlobalStyles, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { FallingLeaves } from './FallingLeaves';
import { useAutumnStore } from '@/store/autumnStore';
import { useBookingStore } from '@/store/bookingStore';

interface Origin {
  x: number;
  y: number;
}

const BURST_GLYPHS = ['🍂', '🍁', '🌿', '🍃'];
const BURST_LIFETIME_MS = 1500;

type BurstParticleStyle = CSSProperties & {
  ['--burst-tx']: string;
  ['--burst-ty']: string;
  ['--burst-rot']: string;
};

const BurstEffect = ({ origin }: { origin: Origin }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, id) => {
        const angle = (id / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const distance = 90 + Math.random() * 70;
        return {
          id,
          glyph: BURST_GLYPHS[id % BURST_GLYPHS.length],
          tx: Math.cos(angle) * distance,
          ty: Math.sin(angle) * distance - 18,
          rotate: (Math.random() - 0.5) * 540,
          delay: Math.random() * 90,
          size: 16 + Math.random() * 10,
        };
      }),
    [],
  );

  return (
    <Box
      aria-hidden
      className="autumn-burst"
      sx={{
        position: 'fixed',
        top: origin.y,
        left: origin.x,
        zIndex: 1300,
        pointerEvents: 'none',
        width: 0,
        height: 0,
      }}
    >
      <Box
        className="autumn-burst-fx"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,210,140,0.75) 0%, rgba(217,147,71,0.45) 38%, rgba(140,63,26,0) 72%)',
          transform: 'translate(-50%, -50%)',
          animation: 'autumn-burst-ring 0.95s ease-out forwards',
          willChange: 'transform, opacity',
        }}
      />
      <Box
        className="autumn-burst-fx"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '2px solid rgba(217,147,71,0.9)',
          transform: 'translate(-50%, -50%)',
          animation: 'autumn-burst-outline 1.15s cubic-bezier(.2,.8,.2,1) forwards',
          willChange: 'transform, opacity',
        }}
      />
      {particles.map((p) => {
        const style: BurstParticleStyle = {
          position: 'absolute',
          top: 0,
          left: 0,
          fontSize: p.size,
          opacity: 0,
          willChange: 'transform, opacity',
          userSelect: 'none',
          filter: 'drop-shadow(0 2px 4px rgba(140,63,26,0.4))',
          animation: `autumn-burst-leaf 1.25s cubic-bezier(.2,.7,.2,1) ${p.delay}ms forwards`,
          ['--burst-tx']: `${p.tx}px`,
          ['--burst-ty']: `${p.ty}px`,
          ['--burst-rot']: `${p.rotate}deg`,
        };
        return (
          <span key={p.id} className="autumn-burst-fx" style={style}>
            {p.glyph}
          </span>
        );
      })}
    </Box>
  );
};

interface PromoCardProps {
  onBook: () => void;
  onClose: () => void;
}

const AutumnPromoCard = ({ onBook, onClose }: PromoCardProps) => (
  <Box
    sx={{
      position: 'relative',
      borderRadius: 4,
      overflow: 'hidden',
      background:
        'linear-gradient(135deg, rgba(255,247,235,0.98) 0%, rgba(255,232,200,0.98) 100%)',
      border: '1px solid rgba(168,84,28,0.3)',
      boxShadow: '0 24px 60px -22px rgba(140,63,26,0.5)',
      transform: 'translateZ(0)',
      pointerEvents: 'auto',
    }}
  >
    <Box
      component="button"
      onClick={onClose}
      aria-label="Cerrar promoción"
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(140,63,26,0.08)',
        color: '#8C3F1A',
        cursor: 'pointer',
        fontSize: 18,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s ease',
        zIndex: 1,
        '&:hover': { background: 'rgba(140,63,26,0.18)' },
      }}
    >
      ×
    </Box>

    <Box sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 2.25, sm: 2.5 }, pb: 1, textAlign: 'center' }}>
      <Box
        sx={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: 'italic',
          fontSize: '0.72rem',
          letterSpacing: '0.22em',
          color: '#A8541C',
          textTransform: 'uppercase',
        }}
      >
        ✨ Y ya que estamos en modo otoño…
      </Box>
      <Box
        sx={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: { xs: '1.1rem', sm: '1.3rem' },
          color: '#5A2B0F',
          mt: 0.5,
          lineHeight: 1.25,
        }}
      >
        Hay dos secretos que vale la pena descubrir
      </Box>
    </Box>

    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1.25, sm: 1.5 },
        p: { xs: 1.5, sm: 2 },
        pt: { xs: 1.5, sm: 1.5 },
      }}
    >
      <Box
        component="button"
        onClick={onBook}
        sx={{
          flex: 1,
          textAlign: 'left',
          border: '1px solid rgba(168,84,28,0.25)',
          borderRadius: 3,
          p: { xs: 1.75, sm: 2 },
          cursor: 'pointer',
          background:
            'linear-gradient(135deg, rgba(255,213,150,0.55) 0%, rgba(244,184,112,0.4) 100%)',
          fontFamily: 'inherit',
          color: '#5A2B0F',
          transform: 'translateZ(0)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px) translateZ(0)',
            boxShadow: '0 18px 32px -14px rgba(217,147,71,0.6)',
            borderColor: 'rgba(168,84,28,0.5)',
          },
        }}
      >
        <Box sx={{ fontSize: 28, lineHeight: 1, mb: 0.75 }}>🎤</Box>
        <Box
          sx={{
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#A8541C',
            fontWeight: 600,
            mb: 0.4,
          }}
        >
          Viernes por la noche
        </Box>
        <Box
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#5A2B0F',
            lineHeight: 1.2,
            mb: 0.75,
          }}
        >
          Cantar también es un look.
        </Box>
        <Box sx={{ fontSize: '0.85rem', color: '#6B3A1F', lineHeight: 1.4, mb: 1 }}>
          Luces bajas, micrófono abierto y tu clásico esperando. Vení con tus amigas y hacé del
          viernes una historia que vale la pena contar.
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: '#8C3F1A',
            fontWeight: 700,
            fontSize: '0.85rem',
          }}
        >
          Reservar mi viernes <span aria-hidden>→</span>
        </Box>
      </Box>

      <Box
        component="button"
        onClick={onBook}
        sx={{
          flex: 1,
          textAlign: 'left',
          border: '1px solid rgba(217,147,71,0.45)',
          borderRadius: 3,
          p: { xs: 1.75, sm: 2 },
          cursor: 'pointer',
          background:
            'linear-gradient(135deg, #4A1F1A 0%, #2A1208 100%)',
          fontFamily: 'inherit',
          color: '#FFF4E6',
          transform: 'translateZ(0)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            transform: 'translateY(-3px) translateZ(0)',
            boxShadow: '0 18px 32px -14px rgba(42,18,8,0.7)',
            borderColor: 'rgba(255,213,150,0.75)',
          },
        }}
      >
        <Box sx={{ fontSize: 28, lineHeight: 1, mb: 0.75 }}>🔮</Box>
        <Box
          sx={{
            fontSize: '0.65rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#FFD9A8',
            fontWeight: 600,
            mb: 0.4,
          }}
        >
          Entre velas y cartas
        </Box>
        <Box
          sx={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: '#FFF4E6',
            lineHeight: 1.2,
            mb: 0.75,
          }}
        >
          Hay una carta que ya gira para vos.
        </Box>
        <Box sx={{ fontSize: '0.85rem', color: 'rgba(255,244,230,0.88)', lineHeight: 1.4, mb: 1 }}>
          Una sesión íntima de tarot para leer lo que tu próxima decisión necesita escuchar. Solo
          falta que vengas a darla vuelta.
        </Box>
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            color: '#FFD9A8',
            fontWeight: 700,
            fontSize: '0.85rem',
          }}
        >
          Pedir mi lectura <span aria-hidden>→</span>
        </Box>
      </Box>
    </Box>
  </Box>
);

export const AutumnOverlay = () => {
  const active = useAutumnStore((s) => s.active);
  const hovering = useAutumnStore((s) => s.hovering);
  const burstKey = useAutumnStore((s) => s.burstKey);
  const origin = useAutumnStore((s) => s.origin);
  const promoVisible = useAutumnStore((s) => s.promoVisible);
  const setPromoVisible = useAutumnStore((s) => s.setPromoVisible);
  const openBooking = useBookingStore((s) => s.openBooking);
  const showLeaves = active || hovering;

  const [burst, setBurst] = useState<{ key: number; origin: Origin } | null>(null);

  useEffect(() => {
    if (burstKey === 0 || !origin) return;
    setBurst({ key: burstKey, origin });
    const burstTimer = window.setTimeout(() => setBurst(null), BURST_LIFETIME_MS);
    return () => window.clearTimeout(burstTimer);
  }, [burstKey, origin]);

  const handlePromoBook = () => {
    setPromoVisible(false);
    openBooking();
  };

  const handlePromoClose = () => setPromoVisible(false);

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
          'body.autumn-mode .MuiAppBar-root[class*="MuiAppBar-positionFixed"]': {
            backgroundColor: 'rgba(255, 240, 220, 0.85) !important',
            transition: 'background-color 1.2s ease !important',
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
          '@keyframes autumn-burst-ring': {
            '0%': { transform: 'translate(-50%, -50%) scale(0.3)', opacity: 0.95 },
            '100%': { transform: 'translate(-50%, -50%) scale(7)', opacity: 0 },
          },
          '@keyframes autumn-burst-outline': {
            '0%': {
              transform: 'translate(-50%, -50%) scale(0.2)',
              opacity: 1,
              borderWidth: '2px',
            },
            '100%': {
              transform: 'translate(-50%, -50%) scale(5)',
              opacity: 0,
              borderWidth: '0.5px',
            },
          },
          '@keyframes autumn-burst-leaf': {
            '0%': {
              transform: 'translate(-50%, -50%) scale(0.4) rotate(0deg)',
              opacity: 0,
            },
            '15%': { opacity: 1 },
            '100%': {
              transform:
                'translate(calc(-50% + var(--burst-tx)), calc(-50% + var(--burst-ty))) scale(0.85) rotate(var(--burst-rot))',
              opacity: 0,
            },
          },
          '@keyframes autumn-banner-shimmer': {
            '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
            '100%': { transform: 'translateX(220%) skewX(-12deg)' },
          },
          '@media (prefers-reduced-motion: reduce)': {
            '.autumn-monkey-pulse': { animation: 'none' },
            '.autumn-burst': { display: 'none' },
            '.autumn-burst-fx': { animation: 'none' },
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
                'linear-gradient(135deg, rgba(180,110,50,0.16) 0%, rgba(160,90,30,0.10) 50%, rgba(110,55,20,0.18) 100%)',
              transform: 'translateZ(0)',
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && (
          <motion.div
            key={`autumn-banner-${burstKey}`}
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
                position: 'relative',
                overflow: 'hidden',
                px: { xs: 1.75, sm: 3 },
                py: { xs: 0.85, sm: 1.25 },
                borderRadius: { xs: 3, sm: 999 },
                backgroundColor: 'rgba(255, 244, 230, 0.97)',
                border: '1px solid rgba(168,84,28,0.25)',
                boxShadow: '0 12px 32px -16px rgba(140,63,26,0.4)',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: 'italic',
                fontSize: { xs: '0.78rem', sm: '0.95rem' },
                lineHeight: { xs: 1.3, sm: 1.4 },
                color: '#8C3F1A',
                whiteSpace: { xs: 'normal', sm: 'nowrap' },
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 0.75, sm: 1 },
                maxWidth: { xs: 'calc(100vw - 24px)', sm: '90vw' },
                transform: 'translateZ(0)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '45%',
                  height: '100%',
                  background:
                    'linear-gradient(110deg, transparent 0%, rgba(255,225,170,0.65) 50%, transparent 100%)',
                  transform: 'translateX(-120%) skewX(-12deg)',
                  animation: 'autumn-banner-shimmer 1.6s ease-out 0.9s 1 forwards',
                  pointerEvents: 'none',
                  willChange: 'transform',
                },
              }}
            >
              <span style={{ fontSize: '1.1em', flexShrink: 0, position: 'relative' }}>🍂</span>
              <span style={{ position: 'relative' }}>
                Bienvenida, Yeni — un otoño hecho para vos
              </span>
              <span style={{ fontSize: '1.1em', flexShrink: 0, position: 'relative' }}>🤎</span>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {promoVisible && (
          <motion.div
            key="autumn-promo"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: 'calc(env(safe-area-inset-top, 0px) + 132px)',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: 'min(640px, calc(100% - 24px))',
              zIndex: 1200,
              pointerEvents: 'none',
            }}
          >
            <AutumnPromoCard onBook={handlePromoBook} onClose={handlePromoClose} />
          </motion.div>
        )}
      </AnimatePresence>

      {burst && <BurstEffect key={burst.key} origin={burst.origin} />}
    </>
  );
};
