import type { ReactNode } from 'react';
import { Dialog, DialogContent, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
  hideCloseButton?: boolean;
  ariaLabel?: string;
}

/**
 * Modal base con animación Framer Motion + responsive fullscreen en mobile.
 * No acopla layout interno — cada feature define su propio contenido.
 */
export const ModalWrapper = ({
  open,
  onClose,
  children,
  maxWidth = 'md',
  hideCloseButton = false,
  ariaLabel,
}: ModalWrapperProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          fullScreen={fullScreen}
          maxWidth={maxWidth}
          fullWidth
          aria-label={ariaLabel}
          PaperComponent={motion.div as never}
          PaperProps={{
            initial: { opacity: 0, y: 32, scale: 0.98 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 16, scale: 0.98 },
            transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
            sx: {
              borderRadius: fullScreen ? 0 : 3,
              overflow: 'hidden',
              backgroundColor: 'background.paper',
            },
          }}
          BackdropProps={{
            sx: {
              backgroundColor: 'rgba(26,26,26,0.45)',
              backdropFilter: 'blur(6px)',
            },
          }}
        >
          {!hideCloseButton && (
            <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
              <IconButton
                onClick={onClose}
                aria-label="Cerrar"
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(4px)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          <DialogContent sx={{ p: 0 }}>{children}</DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
