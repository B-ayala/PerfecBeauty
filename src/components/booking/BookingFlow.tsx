import { useMemo, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalWrapper, LoadingSpinner } from '@/components/common';
import { BookingStepper } from './BookingStepper';
import { BookingSummary } from './BookingSummary';
import { ServiceStep } from './steps/ServiceStep';
import { ScheduleStep } from './steps/ScheduleStep';
import { DetailsStep } from './steps/DetailsStep';
import { PaymentStep } from './steps/PaymentStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { useBookingStore } from '@/store/bookingStore';
import { useNotificationStore } from '@/store/notificationStore';
import {
  confirmBooking,
  validateDetailsStep,
  validateScheduleStep,
} from '@/services/bookingService';
import type { BookingConfirmation, BookingStep } from '@/types';

const STEP_ORDER: BookingStep[] = ['service', 'schedule', 'details', 'payment', 'confirmation'];

const slideVariants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

export const BookingFlow = () => {
  const open = useBookingStore((s) => s.open);
  const step = useBookingStore((s) => s.step);
  const draft = useBookingStore((s) => s.draft);
  const isSubmitting = useBookingStore((s) => s.isSubmitting);
  const closeBooking = useBookingStore((s) => s.closeBooking);
  const setStep = useBookingStore((s) => s.setStep);
  const setSubmitting = useBookingStore((s) => s.setSubmitting);
  const reset = useBookingStore((s) => s.reset);
  const pushNotification = useNotificationStore((s) => s.push);

  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<File | null>(null);
  const [qrExpired, setQrExpired] = useState(false);

  const idx = STEP_ORDER.indexOf(step);
  const showSummary = useMemo(
    () =>
      step !== 'service' &&
      step !== 'confirmation' &&
      step !== 'payment' &&
      Boolean(draft.serviceId),
    [step, draft.serviceId],
  );

  const handleClose = () => {
    closeBooking();
    if (step === 'confirmation') {
      setTimeout(() => {
        reset();
        setConfirmation(null);
        setReceipt(null);
        setQrExpired(false);
      }, 300);
    }
  };

  const goBack = () => {
    setErrors({});
    if (idx > 0) setStep(STEP_ORDER[idx - 1]);
  };

  const goNext = async () => {
    setErrors({});
    if (step === 'service') {
      if (!draft.serviceId) {
        pushNotification({ message: 'Elegí un servicio para continuar', severity: 'warning' });
        return;
      }
      setStep('schedule');
      return;
    }
    if (step === 'schedule') {
      const v = validateScheduleStep(draft);
      if (!v.ok) {
        setErrors(v.errors as Record<string, string>);
        pushNotification({ message: 'Elegí fecha y horario', severity: 'warning' });
        return;
      }
      setStep('details');
      return;
    }
    if (step === 'details') {
      const v = validateDetailsStep(draft);
      if (!v.ok) {
        setErrors(v.errors as Record<string, string>);
        return;
      }
      setStep('payment');
      return;
    }
    if (step === 'payment') {
      if (qrExpired) {
        pushNotification({
          message: 'El QR expiró. Generá uno nuevo para continuar.',
          severity: 'warning',
        });
        return;
      }
      try {
        setSubmitting(true);
        const result = await confirmBooking(draft);
        setConfirmation(result);
        setStep('confirmation');
        pushNotification({
          message: receipt
            ? 'Pago recibido. ¡Te esperamos! ✨'
            : 'Turno reservado. Confirmamos tu pago en breve.',
          severity: 'success',
        });
      } catch {
        pushNotification({
          message: 'No pudimos confirmar tu pago. Probá de nuevo.',
          severity: 'error',
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'service':
        return <ServiceStep onNext={() => setStep('schedule')} />;
      case 'schedule':
        return <ScheduleStep />;
      case 'details':
        return <DetailsStep errors={errors} />;
      case 'payment':
        return (
          <PaymentStep
            receipt={receipt}
            onReceiptChange={setReceipt}
            expired={qrExpired}
            onExpiredChange={setQrExpired}
          />
        );
      case 'confirmation':
        return confirmation ? (
          <ConfirmationStep confirmation={confirmation} onClose={handleClose} />
        ) : (
          <LoadingSpinner label="Generando confirmación…" />
        );
      default:
        return null;
    }
  };

  const nextLabel =
    step === 'schedule'
      ? 'Continuar'
      : step === 'details'
        ? 'Continuar al pago'
        : step === 'payment'
          ? 'Ya pagué'
          : 'Siguiente';
  const showFooter = step !== 'service' && step !== 'confirmation';

  return (
    <ModalWrapper
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      ariaLabel="Reserva de turno"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: { sm: '92vh' }, height: { xs: '100%', sm: 'auto' } }}>
        {step !== 'confirmation' && (
          <Box
            sx={{
              pt: { xs: 2.5, sm: 3, md: 4 },
              pb: { xs: 1.5, md: 2 },
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <BookingStepper current={step} />
          </Box>
        )}

        <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2.5, sm: 3, md: 5 } }}>
          <Grid container spacing={{ xs: 0, md: 4 }}>
            <Grid xs={12} md={showSummary ? 7 : 12}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </Grid>
            {showSummary && (
              <Grid xs={12} md={5} sx={{ mt: { xs: 3, md: 0 } }}>
                <Box sx={{ position: { md: 'sticky' }, top: { md: 0 } }}>
                  <BookingSummary draft={draft} />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        {showFooter && (
          <Box
            sx={{
              px: { xs: 2.5, sm: 3, md: 5 },
              py: { xs: 2, md: 2.5 },
              borderTop: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'background.paper',
              position: { xs: 'sticky', sm: 'static' },
              bottom: 0,
              zIndex: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={1.5}
            >
              <Button
                variant="ghost"
                startIcon={<ArrowBackRoundedIcon />}
                onClick={goBack}
                disabled={isSubmitting || idx === 0}
                sx={{ flexShrink: 0 }}
              >
                Atrás
              </Button>
              <Button
                variant="contained"
                color="primary"
                endIcon={!isSubmitting ? <ArrowForwardRoundedIcon /> : undefined}
                onClick={goNext}
                disabled={isSubmitting}
                sx={{ flex: { xs: 1, sm: 'initial' } }}
              >
                {isSubmitting ? 'Confirmando…' : nextLabel}
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </ModalWrapper>
  );
};
