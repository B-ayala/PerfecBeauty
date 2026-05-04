import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from './palette';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
  interface TypographyVariants {
    display: React.CSSProperties;
    eyebrow: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    display?: React.CSSProperties;
    eyebrow?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true;
    eyebrow: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    ghost: true;
  }
}

const baseTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: palette.charcoal,
      light: palette.graphite,
      dark: '#000000',
      contrastText: palette.ivory,
    },
    secondary: {
      main: palette.rose,
      light: palette.blush,
      dark: palette.roseDeep,
      contrastText: palette.charcoal,
    },
    accent: {
      main: palette.champagne,
      light: '#E4C98B',
      dark: palette.champagneDark,
      contrastText: palette.charcoal,
    },
    background: {
      default: palette.ivory,
      paper: '#FFFFFF',
    },
    text: {
      primary: palette.charcoal,
      secondary: palette.taupe,
      disabled: palette.stone,
    },
    divider: 'rgba(26, 26, 26, 0.08)',
    success: { main: palette.success },
    warning: { main: palette.warning },
    error: { main: palette.error },
  },
  shape: {
    borderRadius: 14,
  },
  spacing: 8,
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      fontSize: 'clamp(2.25rem, 7vw, 4rem)',
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      fontSize: 'clamp(1.85rem, 5.2vw, 3rem)',
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      fontSize: 'clamp(1.4rem, 3.6vw, 2rem)',
      lineHeight: 1.22,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.05rem',
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '0.95rem',
      letterSpacing: '0.02em',
    },
    subtitle1: {
      fontSize: '1.05rem',
      lineHeight: 1.6,
      color: palette.taupe,
    },
    subtitle2: {
      fontSize: '0.9rem',
      lineHeight: 1.55,
      color: palette.taupe,
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.65,
    },
    body2: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
      color: palette.taupe,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.78rem',
      letterSpacing: '0.04em',
      color: palette.stone,
    },
    display: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 'clamp(2.5rem, 9vw, 5.5rem)',
      lineHeight: 1.02,
      letterSpacing: '-0.025em',
    },
    eyebrow: {
      fontFamily: '"Inter", sans-serif',
      fontSize: '0.72rem',
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: palette.champagneDark,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          height: '100%',
        },
        body: {
          backgroundColor: palette.ivory,
          color: palette.charcoal,
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::selection': {
          backgroundColor: palette.charcoal,
          color: palette.ivory,
        },
        '*:focus-visible': {
          outline: `2px solid ${palette.champagne}`,
          outlineOffset: 2,
          borderRadius: 4,
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: 999,
          paddingInline: 18,
          paddingBlock: 10,
          fontSize: '0.85rem',
          transition: 'all 0.25s cubic-bezier(.2,.8,.2,1)',
          [t.breakpoints.up('sm')]: {
            paddingInline: 24,
            paddingBlock: 12,
            fontSize: '0.88rem',
          },
        }),
        sizeLarge: ({ theme: t }) => ({
          paddingInline: 22,
          paddingBlock: 12,
          fontSize: '0.9rem',
          [t.breakpoints.up('sm')]: {
            paddingInline: 32,
            paddingBlock: 14,
            fontSize: '0.95rem',
          },
        }),
        sizeSmall: {
          paddingInline: 16,
          paddingBlock: 7,
          fontSize: '0.8rem',
        },
        containedPrimary: {
          background: palette.charcoal,
          color: palette.ivory,
          '&:hover': {
            background: palette.graphite,
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 24px -12px rgba(26,26,26,0.45)',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(26,26,26,0.2)',
          '&:hover': {
            borderColor: palette.charcoal,
            backgroundColor: 'rgba(26,26,26,0.04)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'ghost' },
          style: {
            background: 'transparent',
            color: palette.charcoal,
            '&:hover': {
              background: 'rgba(26,26,26,0.05)',
            },
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(26,26,26,0.06)',
          boxShadow: '0 1px 2px rgba(26,26,26,0.02)',
          transition: 'all 0.3s cubic-bezier(.2,.8,.2,1)',
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
        elevation: 0,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
          '& fieldset': {
            borderColor: 'rgba(26,26,26,0.12)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(26,26,26,0.3)',
          },
          '&.Mui-focused fieldset': {
            borderColor: palette.charcoal,
            borderWidth: 1,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 500,
          letterSpacing: '0.02em',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(26,26,26,0.08)',
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(baseTheme);
