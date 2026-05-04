import { Box, Stack, Typography } from '@mui/material';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) => (
  <Stack
    spacing={1.5}
    sx={{
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      maxWidth: align === 'center' ? 720 : 640,
      mx: align === 'center' ? 'auto' : 0,
    }}
  >
    {eyebrow && (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Box sx={{ width: 24, height: 1, backgroundColor: 'accent.main' }} />
        <Typography variant="eyebrow">{eyebrow}</Typography>
        <Box sx={{ width: 24, height: 1, backgroundColor: 'accent.main' }} />
      </Box>
    )}
    <Typography variant="h2" component="h2">
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="subtitle1" sx={{ maxWidth: 620 }}>
        {subtitle}
      </Typography>
    )}
  </Stack>
);
