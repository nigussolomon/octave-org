# Theme

Theme configuration and the color-scheme toggle button.

---

## octaveTheme

The default Mantine theme override used by `OctaveProvider`.

```ts
import { createTheme } from '@mantine/core';

export const octaveTheme = createTheme({
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily: 'DM Sans, sans-serif',
});
```

| Setting | Value | Description |
|---|---|---|
| `primaryColor` | `'blue'` | Default color for primary interactive elements. |
| `defaultRadius` | `'md'` | Border radius applied to cards, inputs, buttons, etc. |
| `fontFamily` | `'DM Sans, sans-serif'` | Body and heading font. Requires the font to be loaded (e.g. via Google Fonts). |

### Customising the theme

Pass a `theme` prop to `OctaveProvider` to merge your own overrides on top of (or instead of) `octaveTheme`:

```tsx
import { OctaveProvider } from '@octave-org/ui';
import { createTheme, mergeThemeOverrides } from '@mantine/core';
import { octaveTheme } from '@octave-org/ui';

const customTheme = mergeThemeOverrides(octaveTheme, createTheme({
  primaryColor: 'violet',
  fontFamily: 'Inter, sans-serif',
}));

<OctaveProvider theme={customTheme}>
  <App />
</OctaveProvider>
```

---

## ThemeTrigger

A single `ActionIcon` button that toggles the Mantine color scheme between `'light'` and `'dark'`. It renders a sun icon in dark mode and a moon icon in light mode.

> **Requirement:** Must be rendered inside a `MantineProvider` / `OctaveProvider`.

### Props

`ThemeTrigger` accepts no props.

### Example

```tsx
import { ThemeTrigger } from '@octave-org/ui';

// In a navbar or header
<ThemeTrigger />
```

> `ThemeTrigger` is already embedded in the `OctaveShell` user menu — you only need it explicitly if you are building a custom layout.
