import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  label?: string;
  size?: number;
  fullPage?: boolean;
}

export const LoadingSpinner = ({
  label,
  size = 28,
  fullPage = false,
}: LoadingSpinnerProps) => (
  <Box
    role="status"
    aria-live="polite"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1.5,
      minHeight: fullPage ? '60vh' : 120,
      color: 'text.secondary',
    }}
  >
    <CircularProgress size={size} thickness={3} sx={{ color: 'accent.main' }} />
    {label && (
      <Typography variant="body2" sx={{ letterSpacing: '0.04em' }}>
        {label}
      </Typography>
    )}
  </Box>
);
