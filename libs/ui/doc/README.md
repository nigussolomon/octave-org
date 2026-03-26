# Octave UI Library

A comprehensive React component library built on top of [Mantine](https://mantine.dev/) and [Tabler Icons](https://tabler.io/icons), fully typed with TypeScript and optimized for Next.js applications.

## Installation

```bash
npm install @octave-org/ui
```

## Setup

Wrap your application with the `OctaveProvider` (or `UIProvider`) to apply the Octave theme and enable notifications:

```tsx
import { OctaveProvider } from '@octave-org/ui';

export default function App({ children }) {
  return <OctaveProvider>{children}</OctaveProvider>;
}
```

---

## Component Categories

| Category | Description | Documentation |
|---|---|---|
| **Data Display** | Badges, banners, stat cards, and data tables | [data-display.md](./data-display.md) |
| **Feedback** | Toast notifications (success, info, warning, error) | [feedback.md](./feedback.md) |
| **Input Components** | Form inputs, buttons, and the form builder | [input-components.md](./input-components.md) |
| **Layout** | App shell with sidebar navigation | [layout.md](./layout.md) |
| **Text** | Stacked text and linked text helpers | [text.md](./text.md) |
| **Theme** | Theme configuration and color-scheme toggle | [theme.md](./theme.md) |
| **Blocks** | Pre-built auth wrapper and auth form | [blocks.md](./blocks.md) |
| **Utilities** | Formatters, cookie helpers, responsive breakpoints | [utilities.md](./utilities.md) |
| **Provider** | Root provider wrapping Mantine and notifications | [provider.md](./provider.md) |

---

## Design Principles

- **Type-safe** – All component props are fully typed with TypeScript generics and interfaces.
- **Mantine-first** – Components extend Mantine primitives; all Mantine props are available unless explicitly overridden.
- **Next.js ready** – Link-aware components use `next/link` for client-side navigation.
- **Responsive** – Mobile-first layouts using three breakpoints: mobile (`< 48em`), tablet (`48–75em`), desktop (`> 75em`).
- **Dark mode** – Every component respects Mantine's `colorScheme` context (light / dark).
- **Tabler Icons** – All icons come from `@tabler/icons-react` for visual consistency.
