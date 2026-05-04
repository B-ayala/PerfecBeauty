import { useState } from 'react';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from '@/components/common';
import { testimonials } from '@/data/testimonials';

export const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, sm: 10, md: 14 },
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
      }}
    >
      <Container>
        <Stack spacing={{ xs: 4, sm: 5, md: 6 }} alignItems="center" textAlign="center">
          <Stack spacing={1.5} alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <Box sx={{ width: 24, height: 1, backgroundColor: 'accent.main' }} />
              <Typography variant="eyebrow" sx={{ color: 'accent.light' }}>
                Testimonios
              </Typography>
              <Box sx={{ width: 24, height: 1, backgroundColor: 'accent.main' }} />
            </Box>
            <Typography variant="h2" component="h2">
              Lo que cuentan <Box component="em" sx={{ color: 'accent.light', fontStyle: 'italic' }}>quienes nos visitan</Box>
            </Typography>
          </Stack>

          <Box
            sx={{
              maxWidth: 820,
              width: '100%',
              minHeight: { xs: 220, md: 260 },
              position: 'relative',
              px: { xs: 1, sm: 2 },
            }}
          >
            <FormatQuoteRoundedIcon
              sx={{
                position: 'absolute',
                top: { xs: -12, md: -20 },
                left: '50%',
                transform: 'translateX(-50%) rotate(180deg)',
                fontSize: { xs: 48, md: 64 },
                color: 'accent.main',
                opacity: 0.3,
              }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <Stack spacing={3} alignItems="center" sx={{ pt: 3 }}>
                  <Stack direction="row" spacing={0.5}>
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <StarRateRoundedIcon key={i} sx={{ color: 'accent.main', fontSize: 22 }} />
                    ))}
                  </Stack>
                  <Typography
                    variant="h3"
                    component="blockquote"
                    sx={{
                      fontStyle: 'italic',
                      color: 'rgba(255,255,255,0.92)',
                      fontWeight: 400,
                      fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.75rem' },
                      lineHeight: 1.4,
                      m: 0,
                    }}
                  >
                    “{current.quote}”
                  </Typography>
                  <Stack spacing={0.25} alignItems="center">
                    <Typography variant="h5" sx={{ color: 'background.default' }}>
                      {current.author}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'accent.light', letterSpacing: '0.14em' }}
                    >
                      {current.service.toUpperCase()}
                    </Typography>
                  </Stack>
                </Stack>
              </motion.div>
            </AnimatePresence>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              aria-label="Anterior"
              onClick={prev}
              sx={{
                color: 'primary.contrastText',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ArrowBackRoundedIcon />
            </IconButton>
            <Stack direction="row" spacing={0.75}>
              {testimonials.map((t, i) => (
                <Box
                  key={t.id}
                  onClick={() => setIndex(i)}
                  sx={{
                    width: i === index ? 24 : 8,
                    height: 8,
                    borderRadius: 999,
                    cursor: 'pointer',
                    backgroundColor: i === index ? 'accent.main' : 'rgba(255,255,255,0.25)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Stack>
            <IconButton
              aria-label="Siguiente"
              onClick={next}
              sx={{
                color: 'primary.contrastText',
                border: '1px solid rgba(255,255,255,0.2)',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' },
              }}
            >
              <ArrowForwardRoundedIcon />
            </IconButton>
          </Stack>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)' }}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={{ xs: 2, sm: 3, md: 8 }}
          justifyContent="center"
          sx={{ pt: { xs: 5, sm: 6, md: 8 }, rowGap: 3 }}
          flexWrap="wrap"
          useFlexGap
        >
          {[
            { n: '4.9★', l: 'Rating promedio' },
            { n: '+12k', l: 'Clientas felices' },
            { n: '95%', l: 'Vuelve por un 2° turno' },
            { n: '10 años', l: 'De trayectoria' },
          ].map((s) => (
            <Stack key={s.l} spacing={0.25} alignItems="center">
              <Typography
                variant="h3"
                sx={{
                  fontFamily: 'Playfair Display',
                  color: 'accent.light',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                }}
              >
                {s.n}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                {s.l}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};
