import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'default' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  tone = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => (
  <Dialog
    open={open}
    onClose={onCancel}
    maxWidth="xs"
    fullWidth
    PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
  >
    <DialogTitle sx={{ fontFamily: 'Playfair Display', fontSize: '1.4rem' }}>
      {title}
    </DialogTitle>
    {description && (
      <DialogContent>
        <Typography variant="body2">{description}</Typography>
      </DialogContent>
    )}
    <DialogActions sx={{ p: 2, gap: 1 }}>
      <Button variant="ghost" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button
        variant="contained"
        color={tone === 'danger' ? 'error' : 'primary'}
        onClick={onConfirm}
      >
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);
