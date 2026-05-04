import { Box, Card, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/common';
import { professionals } from '@/data/professionals';

export const ProfessionalsSection = () => (
  <Box
    id="nosotros"
    component="section"
    sx={{ py: { xs: 8, sm: 10, md: 14 }, backgroundColor: 'secondary.light' }}
  >
    <Container>
      <Stack spacing={{ xs: 4, sm: 5, md: 7 }}>
        <SectionHeading
          eyebrow="Equipo"
          title="Las manos detrás de tu experiencia"
          subtitle="Profesionales apasionados que eligieron la belleza como forma de cuidar. Cercanía, escucha y técnica impecable."
        />

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {professionals.map((pro, idx) => (
            <Grid key={pro.id} xs={12} sm={6} md={3}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                style={{ height: '100%' }}
              >
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    backgroundColor: 'background.paper',
                    border: '1px solid rgba(26,26,26,0.05)',
                    transition: 'all 0.35s cubic-bezier(.2,.8,.2,1)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 28px 56px -32px rgba(26,26,26,0.3)',
                    },
                    '&:hover img': { transform: 'scale(1.04)' },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      aspectRatio: { xs: '4 / 5', sm: '3 / 4' },
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      src={pro.photoUrl}
                      alt={pro.name}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(.2,.8,.2,1)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        left: 12,
                        px: 1.25,
                        py: 0.5,
                        borderRadius: 999,
                        backgroundColor: 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(6px)',
                      }}
                    >
                      <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
                        {pro.yearsExperience} años
                      </Typography>
                    </Box>
                  </Box>
                  <Stack spacing={0.75} sx={{ p: { xs: 2, md: 2.5 } }}>
                    <Typography variant="h4" component="h3">
                      {pro.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'accent.dark', fontWeight: 600, letterSpacing: '0.1em' }}
                    >
                      {pro.role.toUpperCase()}
                    </Typography>
                    <Typography variant="body2">{pro.bio}</Typography>
                  </Stack>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  </Box>
);
