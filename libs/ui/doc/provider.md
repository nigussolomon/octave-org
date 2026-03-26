# Provider

Root provider component that must wrap your application (or page tree) to activate the Octave theme, Mantine context, and the notifications system.

---

## UIProvider

Sets up Mantine's `MantineProvider` with the default Octave theme, registers the `<Notifications />` component, and imports required Mantine CSS.

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | ✅ | – | Your application's component tree. |
| `theme` | `MantineThemeOverride` | ❌ | `octaveTheme` | A custom Mantine theme override. When omitted, `octaveTheme` is used. |

### What it does

- Renders `<MantineProvider defaultColorScheme="light">` with the resolved theme.
- Mounts `<Notifications />` so notification helpers (`success`, `info`, `warning`, `error`) work anywhere in the tree.
- Imports `@mantine/core/styles.css` and `@mantine/notifications/styles.css`.

### Example

```tsx
// app/layout.tsx (Next.js App Router)
import { UIProvider } from '@octave-org/ui';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
```

---

## OctaveProvider

An alias for `UIProvider`. Use this name for semantic clarity in Octave-branded projects. It accepts identical props.

```ts
export type OctaveProviderProps = UIProviderProps;
export function OctaveProvider(props: OctaveProviderProps): JSX.Element;
```

### Example

```tsx
// _app.tsx (Next.js Pages Router)
import type { AppProps } from 'next/app';
import { OctaveProvider } from '@octave-org/ui';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OctaveProvider>
      <Component {...pageProps} />
    </OctaveProvider>
  );
}
```

---

## Using a custom theme

```tsx
import { OctaveProvider } from '@octave-org/ui';
import { createTheme, mergeThemeOverrides } from '@mantine/core';
import { octaveTheme } from '@octave-org/ui';

const myTheme = mergeThemeOverrides(octaveTheme, createTheme({
  primaryColor: 'teal',
  fontFamily: 'Inter, sans-serif',
}));

<OctaveProvider theme={myTheme}>
  <App />
</OctaveProvider>
```
