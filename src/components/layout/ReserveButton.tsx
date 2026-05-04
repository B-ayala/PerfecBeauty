import { useRef, useState, type ReactNode } from 'react';
import { Box, Button, type ButtonProps, type SxProps, type Theme } from '@mui/material';
import { useAutumnStore } from '@/store/autumnStore';

interface ReserveButtonProps {
  label?: string;
  monkeySize?: number;
  size?: ButtonProps['size'];
  sx?: SxProps<Theme>;
  showHearts?: boolean;
  onClick: () => void;
}

const HEART_LIFETIME_MS = 1400;

const reserveButtonSx: SxProps<Theme> = {
  position: 'relative',
  overflow: 'visible',
  alignItems: 'center',
  transition: 'all 0.5s cubic-bezier(.2,.8,.2,1)',
  '&.is-autumn': {
    background: 'linear-gradient(135deg, #8C3F1A 0%, #C9722C 50%, #D99347 100%)',
    backgroundSize: '200% 200%',
    boxShadow: '0 14px 32px -14px rgba(140,63,26,0.55)',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #8C3F1A 0%, #C9722C 50%, #E0A24A 100%)',
    backgroundSize: '200% 200%',
    animation: 'autumn-shift 3s ease infinite',
    transform: 'translateY(-2px) scale(1.03)',
    boxShadow: '0 16px 36px -14px rgba(140,63,26,0.55)',
  },
  '@keyframes autumn-shift': {
    '0%, 100%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
  },
};

const MonkeyIcon = ({ size }: { size: number }) => (
  <Box
    component="span"
    className="autumn-monkey-pulse"
    aria-hidden
    sx={{
      fontSize: `${size}px`,
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      ml: 0.75,
    }}
  >
    🐵
  </Box>
);

const FloatingHeart = ({ children }: { children: ReactNode }) => (
  <Box
    component="span"
    aria-hidden
    sx={{
      position: 'absolute',
      top: 4,
      left: '50%',
      fontSize: 18,
      pointerEvents: 'none',
      animation: 'autumn-heart-float 1.4s ease-out forwards',
    }}
  >
    {children}
  </Box>
);

export const ReserveButton = ({
  label = 'Reservar turno',
  monkeySize = 20,
  size,
  sx,
  showHearts = true,
  onClick,
}: ReserveButtonProps) => {
  const [hearts, setHearts] = useState<number[]>([]);
  const heartId = useRef(0);
  const autumnActive = useAutumnStore((s) => s.active);
  const setHovering = useAutumnStore((s) => s.setHovering);

  const handleClick = () => {
    if (showHearts) {
      const id = heartId.current++;
      setHearts((prev) => [...prev, id]);
      window.setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h !== id));
      }, HEART_LIFETIME_MS);
    }
    onClick();
  };

  return (
    <Button
      className={`autumn-trigger ${autumnActive ? 'is-autumn' : ''}`}
      variant="contained"
      color="primary"
      size={size}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onClick={handleClick}
      sx={[reserveButtonSx, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {label}
      <MonkeyIcon size={monkeySize} />
      {showHearts && hearts.map((id) => <FloatingHeart key={id}>🤎</FloatingHeart>)}
    </Button>
  );
};
