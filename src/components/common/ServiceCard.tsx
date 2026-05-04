import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { motion } from 'framer-motion';
import type { Service } from '@/types';
import { formatDuration, formatPrice } from '@/utils/format';

interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
  selected?: boolean;
  compact?: boolean;
}

const MotionCard = motion(Card);

export const ServiceCard = ({
  service,
  onSelect,
  selected = false,
  compact = false,
}: ServiceCardProps) => {
  const content = (
    <Box sx={{ position: 'relative', height: '100%' }}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: compact ? '16 / 10' : { xs: '16 / 10', sm: '4 / 3' },
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={service.imageUrl}
          alt={service.name}
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
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(26,26,26,0) 55%, rgba(26,26,26,0.35) 100%)',
          }}
        />
        {service.featured && (
          <Chip
            label="Destacado"
            size="small"
            sx={{
              position: 'absolute',
              top: 14,
              left: 14,
              backgroundColor: 'rgba(255,255,255,0.92)',
              color: 'text.primary',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          />
        )}
      </Box>

      <Stack spacing={{ xs: 1, md: 1.25 }} sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          flexWrap="wrap"
          gap={1}
        >
          <Typography
            variant="h4"
            component="h3"
            sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}
          >
            {service.name}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'accent.dark',
              whiteSpace: 'nowrap',
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
            }}
          >
            {formatPrice(service.priceFrom)}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          sx={{ minHeight: compact ? 0 : { xs: 0, sm: 44 } }}
        >
          {service.description}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" pt={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.75} sx={{ color: 'text.secondary' }}>
            <AccessTimeRoundedIcon fontSize="small" />
            <Typography variant="caption">{formatDuration(service.durationMin)}</Typography>
          </Stack>
          {onSelect && (
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: 'text.primary' }}>
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em' }}
              >
                {selected ? 'Seleccionado' : 'Reservar'}
              </Typography>
              <ArrowForwardRoundedIcon fontSize="small" />
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );

  return (
    <MotionCard
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      sx={{
        height: '100%',
        borderRadius: 3,
        overflow: 'hidden',
        cursor: onSelect ? 'pointer' : 'default',
        borderColor: selected ? 'accent.main' : undefined,
        borderWidth: selected ? 2 : 1,
        boxShadow: selected
          ? '0 18px 40px -24px rgba(201,169,97,0.55)'
          : '0 1px 2px rgba(26,26,26,0.02)',
        '&:hover img': { transform: 'scale(1.05)' },
        '&:hover': {
          boxShadow: '0 22px 48px -28px rgba(26,26,26,0.25)',
        },
      }}
    >
      {onSelect ? (
        <CardActionArea
          onClick={() => onSelect(service)}
          sx={{ height: '100%', alignItems: 'stretch' }}
        >
          {content}
        </CardActionArea>
      ) : (
        content
      )}
    </MotionCard>
  );
};
