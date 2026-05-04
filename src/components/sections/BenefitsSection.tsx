import { Box, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import EnergySavingsLeafRoundedIcon from '@mui/icons-material/EnergySavingsLeafRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/common';
import { benefits } from '@/data/benefits';
import type { Benefit } from '@/types';

const ICON_MAP: Record<Benefit['icon'], typeof SpaRoundedIcon> = {
  spa: SpaRoundedIcon,
  star: StarBorderRoundedIcon,
  leaf: EnergySavingsLeafRoundedIcon,
  diamond: DiamondRoundedIcon,
  heart: FavoriteBorderRoundedIcon,
  clock: ScheduleRoundedIcon,
};

export const BenefitsSection = () => (
  <Box
    component="section"
    sx={{ py: { xs: 8, sm: 10, md: 14 }, backgroundColor: 'background.default' }}
  >
    <Container>
      <Stack spacing={{ xs: 4, sm: 5, md: 7 }}>
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="Cuidado integral, detalles que enamoran"
          subtitle="No vendemos servicios. Creamos experiencias memorables que te devuelven en cada visita."
        />

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {benefits.map((benefit, idx) => {
            const Icon = ICON_MAP[benefit.icon];
            return (
              <Grid key={benefit.id} xs={12} sm={6} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                >
                  <Stack
                    spacing={{ xs: 1.5, md: 2 }}
                    sx={{
                      p: { xs: 2.5, sm: 3, md: 3.5 },
                      height: '100%',
                      borderRadius: 3,
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.35s cubic-bezier(.2,.8,.2,1)',
                      '&:hover': {
                        borderColor: 'accent.main',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 18px 36px -22px rgba(201,169,97,0.35)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 44, md: 52 },
                        height: { xs: 44, md: 52 },
                        borderRadius: 2,
                        display: 'grid',
                        placeItems: 'center',
                        backgroundColor: 'secondary.light',
                        color: 'accent.dark',
                      }}
                    >
                      <Icon fontSize="medium" />
                    </Box>
                    <Typography variant="h4" component="h3">
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2">{benefit.description}</Typography>
                  </Stack>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Container>
  </Box>
);
