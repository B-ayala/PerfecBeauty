import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
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

const MonkeyIcon = ({
  size,
  onClick,
}: {
  size: number;
  onClick?: (e: MouseEvent<HTMLSpanElement>) => void;
}) => (
  <Box
    component="span"
    className="autumn-monkey-pulse"
    aria-hidden
    onClick={onClick}
    sx={{
      fontSize: `${size}px`,
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      cursor: onClick ? 'pointer' : 'inherit',
    }}
  >
    🐵
  </Box>
);

const SparkleIcon = ({
  size,
  active,
  onClick,
}: {
  size: number;
  active: boolean;
  onClick: (e: MouseEvent<HTMLSpanElement>) => void;
}) => (
  <Box
    component="span"
    aria-label="Descubrí más experiencias"
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e as unknown as MouseEvent<HTMLSpanElement>);
      }
    }}
    sx={{
      fontSize: `${size}px`,
      lineHeight: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'transform 0.25s ease, filter 0.25s ease',
      filter: active
        ? 'drop-shadow(0 0 6px rgba(217,147,71,0.7))'
        : 'drop-shadow(0 1px 2px rgba(140,63,26,0.25))',
      transform: active ? 'scale(1.08)' : 'scale(1)',
      '&:hover': {
        transform: 'scale(1.15) rotate(-8deg)',
        filter: 'drop-shadow(0 0 8px rgba(217,147,71,0.85))',
      },
      '&:focus-visible': {
        outline: '2px solid rgba(217,147,71,0.7)',
        outlineOffset: 2,
        borderRadius: '50%',
      },
    }}
  >
    ✨
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
  const toggleAutumn = useAutumnStore((s) => s.toggle);
  const promoVisible = useAutumnStore((s) => s.promoVisible);
  const togglePromo = useAutumnStore((s) => s.togglePromo);

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

  const handleMonkeyClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    toggleAutumn({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  };

  const handleSparkleClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    togglePromo();
  };

  return (
    <Box
      sx={[
        { display: 'inline-flex', alignItems: 'center', gap: 1 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Button
        className={`autumn-trigger ${autumnActive ? 'is-autumn' : ''}`}
        variant="contained"
        color="primary"
        size={size}
        onClick={handleClick}
        sx={reserveButtonSx}
      >
        {label}
        {showHearts && hearts.map((id) => <FloatingHeart key={id}>🤎</FloatingHeart>)}
      </Button>
      <MonkeyIcon size={monkeySize} onClick={handleMonkeyClick} />
      <SparkleIcon size={monkeySize} active={promoVisible} onClick={handleSparkleClick} />
    </Box>
  );
};
