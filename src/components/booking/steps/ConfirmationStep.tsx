import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { motion } from 'framer-motion';
import type { BookingConfirmation } from '@/types';
import { formatDateLong, formatPrice } from '@/utils/format';
import { getServiceById } from '@/data/services';
import { getProfessionalById } from '@/data/professionals';

interface ConfirmationStepProps {
  confirmation: BookingConfirmation;
  onClose: () => void;
}

export const ConfirmationStep = ({ confirmation, onClose }: ConfirmationStepProps) => {
  const service = getServiceById(confirmation.serviceId);
  const professional = confirmation.professionalId
    ? getProfessionalById(confirmation.professionalId)
    : null;

  return (
    <Stack spacing={4} alignItems="center" textAlign="center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'secondary.light',
            color: 'accent.dark',
          }}
        >
          <CheckCircleRoundedIcon sx={{ fontSize: 48 }} />
        </Box>
      </motion.div>

      <Stack spacing={1.25}>
        <Typography variant="h2" component="h2">
          ¡Tu turno está reservado!
        </Typography>
        <Typography variant="subtitle1">
          Te enviamos la confirmación a <strong>{confirmation.customer.email}</strong>.
          Nos vemos pronto, {confirmation.customer.name.split(' ')[0]}.
        </Typography>
      </Stack>

      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'secondary.light',
          p: 3,
          textAlign: 'left',
        }}
      >
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="caption" sx={{ color: 'accent.dark', letterSpacing: '0.16em' }}>
              CÓDIGO DE RESERVA
            </Typography>
            <Typography variant="h5" sx={{ fontFamily: 'monospace', letterSpacing: '0.08em' }}>
              {confirmation.id.toUpperCase()}
            </Typography>
          </Stack>
          <Divider />
          {service && (
            <DetailRow
              label="Servicio"
              value={service.name}
              extra={formatPrice(service.priceFrom)}
            />
          )}
          <DetailRow
            icon={<CalendarMonthRoundedIcon fontSize="small" />}
            label="Fecha"
            value={confirmation.date ? formatDateLong(confirmation.date) : '-'}
          />
          <DetailRow
            icon={<AccessTimeRoundedIcon fontSize="small" />}
            label="Hora"
            value={confirmation.time ?? '-'}
          />
          <DetailRow
            icon={<PersonRoundedIcon fontSize="small" />}
            label="Profesional"
            value={professional ? professional.name : 'Sin preferencia (te asignamos al mejor)'}
          />
        </Stack>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Listo
        </Button>
        <Button variant="outlined" color="primary" href="#contacto">
          Hablar por WhatsApp
        </Button>
      </Stack>
    </Stack>
  );
};

interface DetailRowProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
  extra?: string;
}

const DetailRow = ({ icon, label, value, extra }: DetailRowProps) => (
  <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ color: 'text.secondary' }}>
      {icon}
      <Typography variant="caption" sx={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {label}
      </Typography>
    </Stack>
    <Stack direction="row" spacing={1.25} alignItems="baseline">
      <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
        {value}
      </Typography>
      {extra && (
        <Typography variant="body2" sx={{ color: 'accent.dark', fontWeight: 600 }}>
          {extra}
        </Typography>
      )}
    </Stack>
  </Stack>
);
