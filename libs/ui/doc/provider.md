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
| `branding` | `OctaveBranding` | ❌ | `undefined` | Global branding defaults (`companyName`, `slogan`, `logo`) made available via context to `OctaveShell`, `OctaveAuthWrapper`, and `OctaveAuthForm`. |

### What it does

- Renders `<MantineProvider defaultColorScheme="light">` with the resolved theme.
- Mounts `<Notifications />` so notification helpers (`success`, `info`, `warning`, `error`) work anywhere in the tree.
- Provides an `OctaveBrandingProvider` context used by shell and auth components to resolve logo, company name, and slogan.
- Loads Mantine styles from the package entrypoint (`@octave-org/ui`), including core, notifications, and charts styles.

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
import { IconGalaxy } from '@tabler/icons-react';
import { ThemeIcon } from '@mantine/core';

const branding = {
  companyName: 'Octave Labs',
  slogan: 'Secure access for modern teams',
  logo: <ThemeIcon variant="default" size={50}><IconGalaxy /></ThemeIcon>,
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <OctaveProvider branding={branding}>
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
