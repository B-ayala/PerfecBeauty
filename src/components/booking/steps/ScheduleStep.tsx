import { useEffect, useMemo } from 'react';
import {
  Box,
  Card,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Grid from '@mui/material/Unstable_Grid2';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import { professionals } from '@/data/professionals';
import {
  getAvailableSlots,
  getMaxBookingDate,
  getMinBookingDate,
} from '@/services/bookingService';
import { EmptyState } from '@/components/common';
import { getServiceById } from '@/data/services';

export const ScheduleStep = () => {
  const draft = useBookingStore((s) => s.draft);
  const setProfessional = useBookingStore((s) => s.setProfessional);
  const setDateTime = useBookingStore((s) => s.setDateTime);

  const service = getServiceById(draft.serviceId);

  const relevantPros = useMemo(() => {
    if (!service) return professionals;
    const match = professionals.filter((p) => p.specialties.includes(service.category));
    return match.length ? match : professionals;
  }, [service]);

  useEffect(() => {
    if (!draft.date) {
      const min = getMinBookingDate();
      setDateTime(min, null);
    }
  }, [draft.date, setDateTime]);

  const slots = useMemo(
    () => getAvailableSlots(draft.date, draft.professionalId),
    [draft.date, draft.professionalId],
  );

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h3" component="h2" gutterBottom>
          Elegí día, hora y profesional
        </Typography>
        <Typography variant="body2">
          Tu experiencia es flexible. Si no tenés preferencia, asignamos al mejor disponible.
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        <Typography variant="h6" sx={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: 'text.secondary' }}>
          Profesional
        </Typography>
        <Grid container spacing={1.5}>
          <Grid xs={12} sm={6} md={4}>
            <ProChoice
              selected={draft.professionalId === null}
              onClick={() => setProfessional(null)}
              label="Sin preferencia"
              caption="Asignamos al mejor disponible"
            />
          </Grid>
          {relevantPros.map((pro) => (
            <Grid key={pro.id} xs={12} sm={6} md={4}>
              <ProChoice
                selected={draft.professionalId === pro.id}
                onClick={() => setProfessional(pro.id)}
                photoUrl={pro.photoUrl}
                label={pro.name}
                caption={pro.role}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="h6" sx={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: 'text.secondary' }}>
          Fecha
        </Typography>
        <TextField
          type="date"
          value={draft.date ?? ''}
          inputProps={{
            min: getMinBookingDate(),
            max: getMaxBookingDate(),
          }}
          onChange={(e) => setDateTime(e.target.value, null)}
          sx={{ maxWidth: { sm: 280 } }}
        />
      </Stack>

      <Stack spacing={1.5}>
        <Typography variant="h6" sx={{ letterSpacing: '0.1em', textTransform: 'uppercase', color: 'text.secondary' }}>
          Horario
        </Typography>
        {slots.length === 0 ? (
          <EmptyState
            title="Sin disponibilidad"
            description="Ese día no tenemos horarios. Probá con otra fecha."
          />
        ) : (
          <Grid container spacing={1}>
            {slots.map((slot) => {
              const selected = draft.time === slot.value;
              return (
                <Grid key={slot.value} xs={4} sm={3} md={2}>
                  <motion.div whileTap={{ scale: slot.available ? 0.96 : 1 }}>
                    <Box
                      onClick={() =>
                        slot.available && setDateTime(draft.date, slot.value)
                      }
                      role="button"
                      aria-disabled={!slot.available}
                      aria-pressed={selected}
                      sx={{
                        py: { xs: 1, sm: 1.25 },
                        textAlign: 'center',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: selected ? 'primary.main' : 'divider',
                        backgroundColor: selected
                          ? 'primary.main'
                          : slot.available
                            ? 'background.paper'
                            : 'rgba(26,26,26,0.03)',
                        color: selected
                          ? 'primary.contrastText'
                          : slot.available
                            ? 'text.primary'
                            : 'text.disabled',
                        fontWeight: 600,
                        fontSize: { xs: '0.82rem', sm: '0.9rem' },
                        letterSpacing: '0.02em',
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease',
                        opacity: slot.available ? 1 : 0.55,
                        textDecoration: slot.available ? 'none' : 'line-through',
                        '&:hover': slot.available && !selected
                          ? { borderColor: 'primary.main', backgroundColor: 'secondary.light' }
                          : undefined,
                      }}
                    >
                      {slot.label}
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Stack>
    </Stack>
  );
};

interface ProChoiceProps {
  selected: boolean;
  onClick: () => void;
  photoUrl?: string;
  label: string;
  caption: string;
}

const ProChoice = ({ selected, onClick, photoUrl, label, caption }: ProChoiceProps) => (
  <Card
    onClick={onClick}
    sx={{
      p: 1.25,
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      cursor: 'pointer',
      borderColor: selected ? 'primary.main' : 'divider',
      borderWidth: selected ? 2 : 1,
      backgroundColor: selected ? 'secondary.light' : 'background.paper',
      transition: 'all 0.25s ease',
      '&:hover': { borderColor: 'primary.main' },
    }}
  >
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: 'secondary.light',
        display: 'grid',
        placeItems: 'center',
        color: 'accent.dark',
      }}
    >
      {photoUrl ? (
        <Box
          component="img"
          src={photoUrl}
          alt={label}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <PersonRoundedIcon />
      )}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.2 }} noWrap>
        {label}
      </Typography>
      <Typography variant="caption" noWrap sx={{ display: 'block', color: 'text.secondary' }}>
        {caption}
      </Typography>
    </Box>
  </Card>
);
