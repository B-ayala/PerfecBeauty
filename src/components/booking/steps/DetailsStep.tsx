import { Box, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useBookingStore } from '@/store/bookingStore';

interface DetailsStepProps {
  errors: Partial<Record<string, string>>;
}

export const DetailsStep = ({ errors }: DetailsStepProps) => {
  const customer = useBookingStore((s) => s.draft.customer);
  const setCustomer = useBookingStore((s) => s.setCustomer);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h3" component="h2" gutterBottom>
          Un último paso
        </Typography>
        <Typography variant="body2">
          Solo para enviarte la confirmación y recordatorios. No compartimos tus datos.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nombre y apellido"
            value={customer.name}
            onChange={(e) => setCustomer({ name: e.target.value })}
            error={Boolean(errors.name)}
            helperText={errors.name}
            autoFocus
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextField
            fullWidth
            label="Teléfono"
            type="tel"
            value={customer.phone}
            onChange={(e) => setCustomer({ phone: e.target.value })}
            error={Boolean(errors.phone)}
            helperText={errors.phone ?? 'Te mandamos el recordatorio por WhatsApp'}
            placeholder="+51 999 000 000"
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={customer.email}
            onChange={(e) => setCustomer({ email: e.target.value })}
            error={Boolean(errors.email)}
            helperText={errors.email}
            placeholder="nombre@email.com"
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            fullWidth
            label="Notas para el equipo (opcional)"
            multiline
            minRows={3}
            value={customer.notes ?? ''}
            onChange={(e) => setCustomer({ notes: e.target.value })}
            placeholder="Ej: busco un tono más cálido, tengo el cuero cabelludo sensible..."
          />
        </Grid>
      </Grid>
    </Stack>
  );
};
