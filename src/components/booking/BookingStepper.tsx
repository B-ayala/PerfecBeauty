import { Box, Stack, Typography } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import type { BookingStep } from '@/types';

interface StepDef {
  key: BookingStep;
  label: string;
}

interface BookingStepperProps {
  current: BookingStep;
}

const STEPS: StepDef[] = [
  { key: 'service', label: 'Servicio' },
  { key: 'schedule', label: 'Horario' },
  { key: 'details', label: 'Datos' },
  { key: 'payment', label: 'Pago' },
  { key: 'confirmation', label: 'Listo' },
];

const orderOf = (step: BookingStep): number => STEPS.findIndex((s) => s.key === step);

export const BookingStepper = ({ current }: BookingStepperProps) => {
  const currentIdx = orderOf(current);

  return (
    <Stack direction="row" spacing={0} alignItems="center" justifyContent="center" sx={{ px: 2 }}>
      {STEPS.map((step, idx) => {
        const isDone = idx < currentIdx;
        const isActive = idx === currentIdx;
        const isLast = idx === STEPS.length - 1;

        return (
          <Stack
            key={step.key}
            direction="row"
            alignItems="center"
            sx={{ flex: isLast ? '0 0 auto' : 1 }}
          >
            <Stack direction="column" alignItems="center" spacing={0.75} sx={{ flex: '0 0 auto' }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  backgroundColor: isDone || isActive ? 'primary.main' : 'transparent',
                  border: '1.5px solid',
                  borderColor: isDone || isActive ? 'primary.main' : 'divider',
                  color: isDone || isActive ? 'primary.contrastText' : 'text.disabled',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                }}
              >
                {isDone ? <CheckRoundedIcon sx={{ fontSize: 16 }} /> : idx + 1}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: isActive ? 'text.primary' : 'text.secondary',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.06em',
                  display: { xs: idx === currentIdx ? 'block' : 'none', sm: 'block' },
                }}
              >
                {step.label}
              </Typography>
            </Stack>
            {!isLast && (
              <Box
                sx={{
                  flex: 1,
                  height: 1,
                  mx: 1,
                  backgroundColor: isDone ? 'primary.main' : 'divider',
                  transition: 'background-color 0.3s ease',
                }}
              />
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};
