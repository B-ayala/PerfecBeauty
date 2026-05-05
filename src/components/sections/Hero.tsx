import { useEffect, useRef, useState } from 'react';
import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { AnimatePresence, motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import heroImage from '@/assets/estilista.png';
import heroVideo from '@/assets/videos/hero-1.mp4';
import perfectBeautyHomeVideo from '@/assets/videos/perfec_beauty-home.mp4';
import brandLogo from '@/assets/perfec-beauty-logo.png';

type HeroSlide =
  | { type: 'image'; src: string; alt: string; duration: number }
  | { type: 'video'; src: string; duration: number };

const HERO_SLIDES: HeroSlide[] = [
  {
    type: 'image',
    src: heroImage,
    alt: 'Clienta recibiendo atención en el salón',
    duration: 5000,
  },
  {
    type: 'video',
    src: perfectBeautyHomeVideo,
    duration: 8000,
  },
  {
    type: 'video',
    src: heroVideo,
    duration: 8000,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay },
  }),
};

export const Hero = () => {
  const openBooking = useBookingStore((s) => s.openBooking);
  const [slideIndex, setSlideIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentSlide = HERO_SLIDES[slideIndex];

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, currentSlide.duration);
    return () => window.clearTimeout(timeout);
  }, [slideIndex, currentSlide.duration]);

  useEffect(() => {
    if (currentSlide.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play().catch(() => undefined);
    }
  }, [slideIndex, currentSlide.type]);

  return (
    <Box
      id="inicio"
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: 'auto', md: '92vh' },
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 11, sm: 12, md: 14 },
        pb: { xs: 7, sm: 8, md: 10 },
        overflow: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 10%, rgba(212,165,165,0.18), transparent 55%), radial-gradient(circle at 80% 90%, rgba(201,169,97,0.12), transparent 50%)',
          zIndex: 0,
        }}
      />

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={{ xs: 5, sm: 6, lg: 8 }}
          alignItems="center"
        >
          <Stack spacing={{ xs: 2.5, sm: 3, md: 3.5 }} sx={{ flex: 1, maxWidth: 620, width: '100%' }}>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ width: 32, height: 1, backgroundColor: 'accent.main' }} />
                <Typography variant="eyebrow">Salón · Estética · Bienestar</Typography>
              </Stack>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
              <Typography variant="display" component="h1">
                Belleza que se <Box component="em" sx={{ color: 'accent.dark', fontStyle: 'italic' }}>respira</Box>.
              </Typography>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
              <Typography
                variant="subtitle1"
                sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, maxWidth: 520 }}
              >
                Un espacio íntimo donde el cuidado es un ritual. Reservá tu próxima experiencia en
                menos de 60 segundos.
              </Typography>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.25}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => openBooking()}
                  endIcon={<ArrowForwardRoundedIcon />}
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Reservar ahora
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  href="#servicios"
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                  Ver servicios
                </Button>
              </Stack>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.45}>
              <Stack
                direction="row"
                spacing={{ xs: 2, sm: 3 }}
                flexWrap="wrap"
                useFlexGap
                sx={{ pt: { xs: 2, md: 3 }, rowGap: 2 }}
              >
                <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <StarRateRoundedIcon
                        key={i}
                        sx={{ color: 'accent.main', fontSize: { xs: 16, sm: 18 } }}
                      />
                    ))}
                  </Stack>
                  <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                    4.9 · 1.2k reseñas
                  </Typography>
                </Stack>
                <Box sx={{ width: '1px', backgroundColor: 'divider' }} />
                <Stack spacing={0.25}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'Playfair Display',
                      fontSize: { xs: '1.15rem', sm: '1.35rem' },
                    }}
                  >
                    +12k
                  </Typography>
                  <Typography variant="caption">Clientes felices</Typography>
                </Stack>
                <Box sx={{ width: '1px', backgroundColor: 'divider' }} />
                <Stack spacing={0.25}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'Playfair Display',
                      fontSize: { xs: '1.15rem', sm: '1.35rem' },
                    }}
                  >
                    10 años
                  </Typography>
                  <Typography variant="caption">De trayectoria</Typography>
                </Stack>
              </Stack>
            </motion.div>
          </Stack>

          <Box sx={{ flex: 1, width: '100%', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Box
                sx={{
                  position: 'relative',
                  aspectRatio: { xs: '4 / 3', sm: '3 / 2', lg: '4 / 5' },
                  width: '100%',
                  maxWidth: { xs: '100%', sm: 520 },
                  mx: { xs: 'auto', lg: 0 },
                  ml: { lg: 'auto' },
                  borderRadius: { xs: 3, md: 4 },
                  overflow: 'hidden',
                  boxShadow: '0 40px 80px -40px rgba(26,26,26,0.45)',
                }}
              >
                <Box
                  aria-hidden
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2.5,
                    background:
                      'radial-gradient(circle at 50% 40%, #FAFAF7 0%, #F5F1EB 60%, #EDE5D8 100%)',
                  }}
                >
                  <Box
                    component="img"
                    src={brandLogo}
                    alt=""
                    sx={{
                      width: { xs: 110, sm: 140 },
                      height: { xs: 110, sm: 140 },
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
                    <CircularProgress size={22} thickness={3} sx={{ color: 'accent.main' }} />
                  </Box>
                </Box>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slideIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                    style={{ position: 'absolute', inset: 0 }}
                  >
                    {currentSlide.type === 'image' ? (
                      <Box
                        component="img"
                        src={currentSlide.src}
                        alt={currentSlide.alt}
                        loading="eager"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <video
                        ref={videoRef}
                        src={currentSlide.src}
                        autoPlay
                        muted
                        playsInline
                        preload="auto"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(26,26,26,0) 60%, rgba(26,26,26,0.3) 100%)',
                    pointerEvents: 'none',
                  }}
                />
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 2,
                  }}
                >
                  {HERO_SLIDES.map((_, i) => (
                    <Box
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      sx={{
                        width: i === slideIndex ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor:
                          i === slideIndex ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
                        cursor: 'pointer',
                        transition: 'all 0.4s ease',
                      }}
                    />
                  ))}
                </Stack>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  style={{
                    position: 'absolute',
                    left: 16,
                    bottom: 16,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: { xs: 1.5, sm: 2 },
                      px: { xs: 1, sm: 1.5 },
                      py: { xs: 0.6, sm: 1 },
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: { xs: 0.75, sm: 1.25 },
                      maxWidth: { xs: 200, sm: 260 },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 24, sm: 32 },
                        height: { xs: 24, sm: 32 },
                        borderRadius: '50%',
                        backgroundColor: 'accent.main',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'primary.main',
                        fontFamily: 'Playfair Display',
                        fontStyle: 'italic',
                        fontSize: { xs: '0.75rem', sm: '0.95rem' },
                        flexShrink: 0,
                      }}
                    >
                      S
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: 'text.primary',
                          display: 'block',
                          lineHeight: 1.15,
                          fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        }}
                      >
                        Yeni · DIRECTORA
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          fontSize: { xs: '0.6rem', sm: '0.7rem' },
                          lineHeight: 1.2,
                        }}
                      >
                        “El balayage que te va a enamorar.”
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
