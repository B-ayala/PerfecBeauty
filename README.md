# Perfec Beauty · Salón de Belleza Integral

Landing de alta fidelidad para un salón de belleza premium, con flujo de reserva de turnos en 3 pasos. Diseño minimalista, elegante y centrado en conversión.

## Stack

- **React 18 + TypeScript + Vite**
- **MUI v5** como design system (theme centralizado, `sx` / `styled` para extender)
- **Zustand** para estado global (reserva + notificaciones)
- **Framer Motion** para microinteracciones y transiciones entre pasos

## Arranque rápido

```bash
npm install
npm run dev
```

Abrí http://localhost:5173

Scripts disponibles:

| Script            | Qué hace                         |
| ----------------- | -------------------------------- |
| `npm run dev`     | Servidor de desarrollo con HMR   |
| `npm run build`   | Type-check + build de producción |
| `npm run preview` | Previsualiza el build            |

## Arquitectura

```
src/
├── components/
│   ├── common/        # ModalWrapper, NotificationToast, ServiceCard, etc.
│   ├── layout/        # Header, Footer, Logo
│   ├── sections/      # Hero, Services, Professionals, Benefits, Testimonials, CTA
│   └── booking/       # Flow + 3 pasos + Stepper + Summary
├── pages/             # LandingPage
├── services/          # bookingService (validaciones, slots, confirmación)
├── store/             # Zustand: bookingStore, notificationStore
├── hooks/             # (reservado para hooks compartidos)
├── utils/             # format, validators
├── data/              # Mocks: services, professionals, testimonials, benefits
├── types/             # Tipos globales
└── theme/             # palette.ts + theme.ts (MUI theme extendido)
```

## Sistema de diseño

- **Paleta** — Neutros cálidos (ivory, linen, charcoal) + acentos rosé y champagne.
- **Tipografía** — Playfair Display para titulares (editorial, italics sutiles), Inter para UI.
- **Tokens** — todos los colores, spacings y radios se consumen desde `theme`. Cero valores hardcodeados fuera de `theme/`.
- **Variantes custom** — `Typography.display`, `Typography.eyebrow`, `Button.ghost` declaradas vía module augmentation para tipado estricto.

## Componentes reutilizables

| Componente          | Propósito                                       |
| ------------------- | ----------------------------------------------- |
| `ModalWrapper`      | Dialog con Framer Motion + fullscreen en mobile |
| `NotificationToast` | Snackbar conectado al `notificationStore`       |
| `ServiceCard`       | Card de servicio (landing + booking)            |
| `SectionHeading`    | Eyebrow + título + subtítulo consistentes       |
| `LoadingSpinner`    | Loader con tokens del theme                     |
| `EmptyState`        | Estado vacío reutilizable                       |
| `ConfirmDialog`     | Confirmación destructiva / neutral              |

## Flujo de reserva (3 pasos + confirmación)

1. **Servicio** — selección visual desde cards.
2. **Horario** — profesional (opcional), fecha y hora.
3. **Datos** — nombre, teléfono, email, notas.
4. **Confirmación** — código de reserva + resumen.

El estado vive en `bookingStore` (Zustand). Validaciones y mock de disponibilidad en `services/bookingService.ts` — toda la lógica de negocio fuera de los componentes.

## Accesibilidad y UX

- Navegación por teclado con `focus-visible` custom (outline dorado).
- `aria-label` en todos los botones icónicos.
- `aria-live` en loaders.
- Contraste AA en botones primarios y texto sobre fondos oscuros.
- Mobile-first: stepper con labels colapsables, modal fullscreen en `xs`.

## Extensión

- **Dark mode** — el theme está pensado para variante oscura; extendé `theme.ts` con un segundo preset.
- **Backend real** — reemplazá `confirmBooking` y `getAvailableSlots` por llamadas al API; el resto de la app no se entera.
- **Rutas adicionales** (ej: `mis-citas`) — agregá `react-router-dom` y nuevos archivos en `pages/`.
