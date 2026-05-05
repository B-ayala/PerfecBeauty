import { useMemo, type CSSProperties } from 'react';
import { Box } from '@mui/material';

interface FallingLeavesProps {
  visible: boolean;
  count?: number;
}

const LEAF_GLYPHS = ['🍂', '🍁', '🌿', '🍃'];
const WARM_HUES = ['#C9722C', '#A8541C', '#D99347', '#8C3F1A', '#E0A24A', '#B8651C'];

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

interface LeafConfig {
  id: number;
  glyph: string;
  color: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotateStart: number;
  rotateEnd: number;
  opacity: number;
}

const buildLeaves = (count: number): LeafConfig[] =>
  Array.from({ length: count }, (_, id) => ({
    id,
    glyph: pick(LEAF_GLYPHS),
    color: pick(WARM_HUES),
    left: random(0, 100),
    size: random(16, 32),
    duration: random(7, 14),
    delay: random(0, 8),
    drift: random(-120, 120),
    rotateStart: random(-45, 45),
    rotateEnd: random(180, 540),
    opacity: random(0.55, 0.9),
  }));

type LeafCSSVars = CSSProperties & {
  ['--leaf-rs']: string;
  ['--leaf-re']: string;
  ['--leaf-drift']: string;
  ['--leaf-op']: number;
};

export const FallingLeaves = ({ visible, count = 28 }: FallingLeavesProps) => {
  const leaves = useMemo(() => buildLeaves(count), [count]);

  if (!visible) return null;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: (t) => t.zIndex.appBar - 1,
        contain: 'layout paint size',
        transform: 'translateZ(0)',
      }}
    >
      {leaves.map((leaf) => {
        const style: LeafCSSVars = {
          position: 'absolute',
          top: 0,
          left: `${leaf.left}%`,
          fontSize: leaf.size,
          color: leaf.color,
          textShadow: `0 2px 4px ${leaf.color}55`,
          userSelect: 'none',
          animation: `leaf-fall ${leaf.duration}s ease-in-out ${leaf.delay}s infinite`,
          ['--leaf-rs']: `${leaf.rotateStart}deg`,
          ['--leaf-re']: `${leaf.rotateEnd}deg`,
          ['--leaf-drift']: `${leaf.drift}px`,
          ['--leaf-op']: leaf.opacity,
        };
        return (
          <span key={leaf.id} style={style}>
            {leaf.glyph}
          </span>
        );
      })}
    </Box>
  );
};
