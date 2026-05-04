# Contexto técnico — Estilista (Perfect Beauty Hair Salon)

## Producto
Plataforma web para salon de belleza: gestión de servicios, citas, clientes y productos.

## Stack
- React 18 + TypeScript (strict)
- Vite como bundler
- Material UI (MUI v5) como sistema de diseño base
- Zustand para estado global
- React Router v6 con lazy loading de rutas
- Framer Motion para micro-interacciones

## Arquitectura
Feature-based / modular. La raíz `src/` se organiza por capas:
- `components/` — presentacionales puros + contenedores reutilizables
- `pages/` — vistas ruteables
- `services/` — lógica de negocio pura. Sin React.
- `hooks/` — lógica reactiva reutilizable
- `store/` — stores Zustand
- `utils/` — helpers puros (formatters, validators)
- `data/` — datasets mock
- `types/` — tipos globales compartidos
- `theme/` — configuración centralizada de MUI (paleta, tipografía, overrides)

## Convenciones de código
- **Naming**: camelCase para archivos y componentes. Componentes con mayúscula inicial.
- **Rutas**: minúsculas con guiones (ej: `mis-citas`, `servicios/disponibles`).
- **Estado**: Zustand para estado global que cruza rutas. useState para formularios locales.
- **Estilos**: siempre `sx` prop de MUI o `styled()`. Sin CSS modules.
- **Moneda**: soles peruanos (PEN, `S/`). Formateado con `Intl.NumberFormat('es-PE')`.

## Componentes globales a reutilizar
- `ModalWrapper` — modal base con animaciones
- `NotificationToast` — alertas/toasts globales
- `ServiceCard` — card para servicios
- `LoadingSpinner` — loader consistente
- `EmptyState` — estado vacío reutilizable

## No hacer
- No duplicar lógica de negocio en componentes. Usar services.
- No mezclar idiomas en keys.
- No introducir Redux. Zustand es suficiente.
- No usar CSS custom fuera de MUI `sx` o `styled`.
