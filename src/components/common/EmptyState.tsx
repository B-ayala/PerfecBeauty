import type { ReactNode } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    spacing={2}
    sx={{
      py: 6,
      px: 3,
      textAlign: 'center',
      borderRadius: 3,
      border: (t) => `1px dashed ${t.palette.divider}`,
      color: 'text.secondary',
    }}
  >
    {icon && (
      <Box sx={{ color: 'accent.main', fontSize: 40, lineHeight: 1 }}>{icon}</Box>
    )}
    <Typography variant="h5" sx={{ color: 'text.primary' }}>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" sx={{ maxWidth: 420 }}>
        {description}
      </Typography>
    )}
    {actionLabel && onAction && (
      <Button variant="outlined" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </Stack>
);
