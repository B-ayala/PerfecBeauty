import { Snackbar, Alert } from '@mui/material';
import { useNotificationStore } from '@/store/notificationStore';

/**
 * Renderiza la cola de notificaciones del store global.
 * Se monta una sola vez en el root de la app.
 */
export const NotificationToast = () => {
  const queue = useNotificationStore((s) => s.queue);
  const dismiss = useNotificationStore((s) => s.dismiss);
  const current = queue[0];

  if (!current) return null;

  return (
    <Snackbar
      key={current.id}
      open
      autoHideDuration={current.durationMs}
      onClose={() => dismiss(current.id)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => dismiss(current.id)}
        severity={current.severity}
        variant="filled"
        sx={{
          borderRadius: 2,
          alignItems: 'center',
          boxShadow: '0 20px 40px -20px rgba(26,26,26,0.4)',
        }}
      >
        {current.message}
      </Alert>
    </Snackbar>
  );
};
