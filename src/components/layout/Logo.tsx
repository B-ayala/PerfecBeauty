import { Box } from '@mui/material';
import logoSrc from '@/assets/perfec-beauty-logo.png';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md';
}

export const Logo = ({ variant = 'dark', size = 'md' }: LogoProps) => {
  const dimension = size === 'sm' ? 44 : 56;

  return (
    <Box
      component="a"
      href="#inicio"
      aria-label="Perfec Beauty · Inicio"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 0,
        textDecoration: 'none',
        borderRadius: '50%',
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'scale(1.04)' },
        '&:focus-visible': {
          outline: (t) => `2px solid ${t.palette.accent.main}`,
          outlineOffset: 2,
        },
      }}
    >
      <Box
        component="img"
        src={logoSrc}
        alt="Perfec Beauty"
        loading="eager"
        decoding="async"
        sx={{
          width: dimension,
          height: dimension,
          borderRadius: '50%',
          objectFit: 'cover',
          display: 'block',
          boxShadow:
            variant === 'light'
              ? '0 0 0 1px rgba(255,255,255,0.18)'
              : '0 2px 10px rgba(20,20,20,0.08)',
        }}
      />
    </Box>
  );
};
