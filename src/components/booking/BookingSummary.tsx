import { Box, Divider, Stack, Typography } from '@mui/material';
import { formatDateLong, formatDuration, formatPrice } from '@/utils/format';
import { getServiceById } from '@/data/services';
import { getProfessionalById } from '@/data/professionals';
import type { BookingDraft } from '@/types';

interface BookingSummaryProps {
  draft: BookingDraft;
}

export const BookingSummary = ({ draft }: BookingSummaryProps) => {
  const service = getServiceById(draft.serviceId);
  const professional = draft.professionalId ? getProfessionalById(draft.professionalId) : null;

  if (!service) return null;

  return (
    <Box
      sx={{
        borderRadius: { xs: 2.5, md: 3 },
        p: { xs: 2, sm: 2.5, md: 3 },
        backgroundColor: 'secondary.light',
        border: '1px solid rgba(26,26,26,0.05)',
        height: '100%',
      }}
    >
      <Stack spacing={{ xs: 1.5, md: 2 }}>
        <Typography variant="eyebrow">Tu reserva</Typography>

        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            aspectRatio: { xs: '16 / 9', sm: '16 / 10' },
            backgroundColor: 'background.default',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Box
            component="img"
            src={service.imageUrl}
            alt={service.name}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Stack spacing={0.5}>
          <Typography variant="h4" component="h3">
            {service.name}
          </Typography>
          <Typography variant="body2">{formatDuration(service.durationMin)}</Typography>
        </Stack>

        <Divider />

        <Stack spacing={1.25}>
          <SummaryRow label="Profesional" value={professional?.name ?? 'Sin preferencia'} />
          <SummaryRow
            label="Fecha"
            value={draft.date ? formatDateLong(draft.date) : 'A elegir'}
          />
          <SummaryRow label="Hora" value={draft.time ?? 'A elegir'} />
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography variant="body2">Desde</Typography>
          <Typography variant="h4" sx={{ color: 'accent.dark' }}>
            {formatPrice(service.priceFrom)}
          </Typography>
        </Stack>
        <Typography variant="caption">
          El precio final puede variar según diagnóstico y largo.
        </Typography>

        <Divider />

        <Stack spacing={0.5}>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', letterSpacing: '0.08em', textTransform: 'uppercase' }}
          >
            Formas de pago
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
            Yape · Yasta
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <Stack direction="row" justifyContent="space-between" spacing={1}>
    <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, textAlign: 'right' }}>
      {value}
    </Typography>
  </Stack>
);
