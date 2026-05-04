import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import QrCodeScannerRoundedIcon from '@mui/icons-material/QrCodeScannerRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';
import { getServiceById } from '@/data/services';
import { formatDateLong, formatPrice } from '@/utils/format';

const YAPE_PURPLE = '#6E2A8C';
const YAPE_PURPLE_LIGHT = '#F2EAF7';

const RECIPIENT = {
  name: 'Perfec Beauty Studio',
  phone: '+591 71234567',
  document: 'CI 1234567 LP',
};

interface PaymentStepProps {
  onReceiptChange?: (file: File | null) => void;
  receipt: File | null;
  expired: boolean;
  onExpiredChange: (expired: boolean) => void;
}

export const PaymentStep = ({
  onReceiptChange,
  receipt,
  expired,
  onExpiredChange,
}: PaymentStepProps) => {
  const draft = useBookingStore((s) => s.draft);
  const service = getServiceById(draft.serviceId);
  const [copied, setCopied] = useState<'phone' | 'amount' | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const amount = service?.priceFrom ?? 0;
  const reference = useMemo(
    () => `PB-${(draft.customer.name || 'cliente').slice(0, 3).toUpperCase()}-${Date.now().toString(36).slice(-4).toUpperCase()}`,
    [draft.customer.name],
  );

  useEffect(() => {
    if (expired) return;
    if (secondsLeft <= 0) {
      onExpiredChange(true);
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((v) => v - 1), 1000);
    return () => window.clearTimeout(id);
  }, [secondsLeft, expired, onExpiredChange]);

  const handleCopy = async (text: string, key: 'phone' | 'amount') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      // ignore — clipboard not available
    }
  };

  const handleFile = (file: File | null) => {
    if (!file) {
      onReceiptChange?.(null);
      return;
    }
    onReceiptChange?.(file);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeLabel = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const renewQr = () => {
    setSecondsLeft(15 * 60);
    onExpiredChange(false);
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box
            sx={{
              px: 1.25,
              py: 0.5,
              borderRadius: 999,
              backgroundColor: YAPE_PURPLE_LIGHT,
              color: YAPE_PURPLE,
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Yape Bolivia
          </Box>
          <Chip
            size="small"
            icon={<LockRoundedIcon sx={{ fontSize: 14 }} />}
            label="Pago seguro"
            sx={{
              height: 24,
              backgroundColor: 'transparent',
              border: '1px solid',
              borderColor: 'divider',
              color: 'text.secondary',
              '& .MuiChip-icon': { color: 'success.main', ml: 0.75 },
              '& .MuiChip-label': { px: 0.75, fontSize: '0.72rem' },
            }}
          />
        </Stack>
        <Typography variant="h3" component="h2">
          Asegurá tu turno con un pago rápido
        </Typography>
        <Typography variant="body2">
          Escaneá el código QR con tu app de Yape para confirmar la reserva. El cargo se acredita
          al instante.
        </Typography>
        {service && (
          <Stack
            direction="row"
            spacing={0.75}
            alignItems="center"
            divider={
              <Box sx={{ width: 3, height: 3, borderRadius: '50%', backgroundColor: 'divider' }} />
            }
            sx={{ flexWrap: 'wrap', rowGap: 0.5, color: 'text.secondary', mt: 0.5 }}
          >
            <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {service.name}
            </Typography>
            {draft.date && (
              <Typography variant="caption">{formatDateLong(draft.date)}</Typography>
            )}
            {draft.time && <Typography variant="caption">{draft.time} h</Typography>}
          </Stack>
        )}
      </Stack>

      {expired && (
        <Alert
          severity="warning"
          variant="outlined"
          action={
            <Button color="inherit" size="small" onClick={renewQr}>
              Generar nuevo
            </Button>
          }
          sx={{ borderRadius: 2 }}
        >
          El código QR expiró. Generá uno nuevo para continuar.
        </Alert>
      )}

      <Box
        sx={{
          display: 'grid',
          gap: { xs: 2.5, md: 3 },
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.05fr) minmax(0, 1fr)' },
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            boxShadow: '0 24px 48px -28px rgba(110, 42, 140, 0.35)',
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${YAPE_PURPLE} 0%, #8C3DAB 100%)`,
              color: '#fff',
              px: { xs: 2.5, sm: 3 },
              py: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Stack spacing={0.25}>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.16em' }}
              >
                TOTAL A PAGAR
              </Typography>
              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography sx={{ fontSize: '1.85rem', fontWeight: 700, lineHeight: 1 }}>
                  {formatPrice(amount)}
                </Typography>
                <Tooltip title={copied === 'amount' ? 'Copiado' : 'Copiar monto'}>
                  <IconButton
                    size="small"
                    onClick={() => handleCopy(String(amount), 'amount')}
                    sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: '#fff' } }}
                  >
                    {copied === 'amount' ? (
                      <CheckRoundedIcon sx={{ fontSize: 16 }} />
                    ) : (
                      <ContentCopyRoundedIcon sx={{ fontSize: 16 }} />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing={0.75}
              alignItems="center"
              sx={{
                px: 1.25,
                py: 0.6,
                borderRadius: 999,
                backgroundColor: 'rgba(255,255,255,0.16)',
                color: '#fff',
              }}
            >
              <AccessTimeRoundedIcon sx={{ fontSize: 14 }} />
              <Typography
                variant="caption"
                sx={{
                  color: 'inherit',
                  fontVariantNumeric: 'tabular-nums',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {expired ? '00:00' : timeLabel}
              </Typography>
            </Stack>
          </Box>

          <Stack spacing={2} sx={{ px: { xs: 2.5, sm: 3 }, py: 3, alignItems: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                p: 2,
                borderRadius: 2.5,
                backgroundColor: '#fff',
                border: '1px solid',
                borderColor: 'rgba(110, 42, 140, 0.12)',
                boxShadow: '0 8px 24px -16px rgba(110, 42, 140, 0.4)',
              }}
            >
              <QrPattern seed={reference} expired={expired} />
              {expired && (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    backdropFilter: 'blur(2px)',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    borderRadius: 2.5,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    QR expirado
                  </Typography>
                </Box>
              )}
            </Box>

            <Stack spacing={0.75} sx={{ width: '100%' }}>
              <PaymentRow
                label="Beneficiario"
                value={RECIPIENT.name}
                emphasised
              />
              <PaymentRow
                label="Yape / celular"
                value={RECIPIENT.phone}
                action={
                  <Tooltip title={copied === 'phone' ? 'Copiado' : 'Copiar número'}>
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(RECIPIENT.phone, 'phone')}
                      sx={{ color: 'text.secondary' }}
                    >
                      {copied === 'phone' ? (
                        <CheckRoundedIcon sx={{ fontSize: 16, color: 'success.main' }} />
                      ) : (
                        <ContentCopyRoundedIcon sx={{ fontSize: 16 }} />
                      )}
                    </IconButton>
                  </Tooltip>
                }
              />
              <PaymentRow label="Documento" value={RECIPIENT.document} />
              <PaymentRow label="Referencia" value={reference} mono />
            </Stack>
          </Stack>
        </Box>

        <Stack spacing={2.5}>
          <Box
            sx={{
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              backgroundColor: 'secondary.light',
              p: { xs: 2.25, sm: 2.5 },
            }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
              <QrCodeScannerRoundedIcon sx={{ color: 'accent.dark' }} />
              <Typography variant="h5">Cómo pagar</Typography>
            </Stack>
            <Stack spacing={1.75}>
              <Step number={1} title="Abrí Yape Bolivia" subtitle="En tu celular, andá a la sección Pagos." />
              <Step
                number={2}
                title="Escaneá el QR"
                subtitle="O ingresá el número del beneficiario manualmente."
              />
              <Step
                number={3}
                title="Confirmá el monto"
                subtitle={`Verificá que diga ${formatPrice(amount)} antes de aceptar.`}
              />
              <Step
                number={4}
                title="Adjuntá el comprobante"
                subtitle="Es opcional, pero acelera la confirmación de tu turno."
              />
            </Stack>
          </Box>

          <Box
            component="label"
            htmlFor="receipt-upload"
            sx={{
              cursor: 'pointer',
              borderRadius: 3,
              border: '1.5px dashed',
              borderColor: receipt ? 'success.main' : 'rgba(26,26,26,0.18)',
              backgroundColor: receipt ? 'rgba(107,142,94,0.06)' : 'background.paper',
              p: 2.25,
              transition: 'all 0.25s ease',
              display: 'block',
              '&:hover': {
                borderColor: receipt ? 'success.main' : 'primary.main',
                backgroundColor: receipt ? 'rgba(107,142,94,0.08)' : 'rgba(26,26,26,0.02)',
              },
            }}
          >
            <input
              id="receipt-upload"
              ref={fileRef}
              type="file"
              accept="image/*,application/pdf"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  backgroundColor: receipt ? 'rgba(107,142,94,0.12)' : 'secondary.light',
                  color: receipt ? 'success.main' : 'accent.dark',
                  flexShrink: 0,
                }}
              >
                {receipt ? <CheckRoundedIcon /> : <CloudUploadOutlinedIcon />}
              </Box>
              <Stack spacing={0.25} sx={{ flex: 1, minWidth: 0 }}>
                {receipt ? (
                  <>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }} noWrap>
                      <AttachFileRoundedIcon
                        sx={{ fontSize: 14, mr: 0.5, verticalAlign: '-2px', color: 'success.main' }}
                      />
                      {receipt.name}
                    </Typography>
                    <Typography variant="caption">
                      {(receipt.size / 1024).toFixed(0)} KB · listo para enviar
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      Adjuntar comprobante
                    </Typography>
                    <Typography variant="caption">
                      Arrastrá la captura o tocá acá. PNG, JPG o PDF.
                    </Typography>
                  </>
                )}
              </Stack>
              {receipt && (
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.preventDefault();
                    if (fileRef.current) fileRef.current.value = '';
                    handleFile(null);
                  }}
                  sx={{ color: 'text.secondary' }}
                  aria-label="Quitar comprobante"
                >
                  <CloseRoundedIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>
          </Box>

          <Stack
            direction="row"
            spacing={1.25}
            alignItems="flex-start"
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: 'rgba(201, 169, 97, 0.08)',
            }}
          >
            <VerifiedRoundedIcon sx={{ color: 'accent.dark', fontSize: 20, mt: 0.25 }} />
            <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.55 }}>
              Apenas recibamos tu pago, te confirmamos por WhatsApp y email. Si necesitás cancelar
              o reprogramar, contactanos hasta 4 h antes.
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

interface StepProps {
  number: number;
  title: string;
  subtitle: string;
}

const Step = ({ number, title, subtitle }: StepProps) => (
  <Stack direction="row" spacing={1.5} alignItems="flex-start">
    <Box
      sx={{
        width: 26,
        height: 26,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        color: 'accent.dark',
        fontSize: '0.78rem',
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {number}
    </Box>
    <Stack spacing={0.25}>
      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {subtitle}
      </Typography>
    </Stack>
  </Stack>
);

interface PaymentRowProps {
  label: string;
  value: string;
  emphasised?: boolean;
  mono?: boolean;
  action?: React.ReactNode;
}

const PaymentRow = ({ label, value, emphasised, mono, action }: PaymentRowProps) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
    <Typography
      variant="caption"
      sx={{ color: 'text.secondary', letterSpacing: '0.1em', textTransform: 'uppercase' }}
    >
      {label}
    </Typography>
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Typography
        variant="body2"
        sx={{
          color: 'text.primary',
          fontWeight: emphasised ? 700 : 500,
          fontFamily: mono ? 'monospace' : undefined,
          letterSpacing: mono ? '0.06em' : undefined,
          textAlign: 'right',
        }}
      >
        {value}
      </Typography>
      {action}
    </Stack>
  </Stack>
);

interface QrPatternProps {
  seed: string;
  expired: boolean;
}

const QR_SIZE = 25;

const QrPattern = ({ seed, expired }: QrPatternProps) => {
  const cells = useMemo(() => buildQrCells(seed), [seed]);

  return (
    <motion.div
      key={seed}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: expired ? 0.4 : 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ display: 'block' }}
    >
      <svg
        viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
        width={208}
        height={208}
        role="img"
        aria-label="Código QR de pago"
        shapeRendering="crispEdges"
      >
        {cells.map((row, y) =>
          row.map((on, x) =>
            on ? (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill="#1A1A1A"
              />
            ) : null,
          ),
        )}
      </svg>
    </motion.div>
  );
};

function buildQrCells(seed: string): boolean[][] {
  const grid: boolean[][] = Array.from({ length: QR_SIZE }, () =>
    Array.from({ length: QR_SIZE }, () => false),
  );

  const drawFinder = (ox: number, oy: number) => {
    for (let y = 0; y < 7; y += 1) {
      for (let x = 0; x < 7; x += 1) {
        const onBorder = x === 0 || x === 6 || y === 0 || y === 6;
        const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        grid[oy + y][ox + x] = onBorder || inner;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(QR_SIZE - 7, 0);
  drawFinder(0, QR_SIZE - 7);

  // Timing patterns
  for (let i = 8; i < QR_SIZE - 8; i += 1) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  // Hash from seed for deterministic pattern
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let state = h >>> 0;
  const next = () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0xffffffff;
  };

  const isFinderArea = (x: number, y: number) => {
    if (x < 8 && y < 8) return true;
    if (x >= QR_SIZE - 8 && y < 8) return true;
    if (x < 8 && y >= QR_SIZE - 8) return true;
    return false;
  };

  for (let y = 0; y < QR_SIZE; y += 1) {
    for (let x = 0; x < QR_SIZE; x += 1) {
      if (isFinderArea(x, y)) continue;
      if (x === 6 || y === 6) continue;
      grid[y][x] = next() > 0.5;
    }
  }

  // Alignment-style block bottom-right
  for (let y = QR_SIZE - 9; y < QR_SIZE - 4; y += 1) {
    for (let x = QR_SIZE - 9; x < QR_SIZE - 4; x += 1) {
      const dx = x - (QR_SIZE - 7);
      const dy = y - (QR_SIZE - 7);
      const onBorder = Math.max(Math.abs(dx), Math.abs(dy)) === 2;
      const center = dx === 0 && dy === 0;
      grid[y][x] = onBorder || center;
    }
  }

  return grid;
}
