# agents.md — @octave-org/ui

## 1. Overview

`@octave-org/ui` is a React UI component library built on top of [Mantine v8](https://mantine.dev). It provides pre-built, opinionated components (inputs, buttons, layout shells, tables, badges, auth forms, notifications, and more) that are ready to use inside Next.js applications.

> **⚠️ PAGES ROUTER ONLY**
> This library is designed exclusively for the **Next.js Pages Router** (`/pages` directory).
> It is **NOT compatible with the App Router** (`/app` directory) and has not been tested or validated for App Router usage.

---

## 2. Environment Constraints

- ✅ **Must** use the `/pages` directory for all routes
- ✅ **Must** use `pages/_app.tsx` to wrap the app with `OctaveProvider`
- ✅ **Must** use `pages/_document.tsx` to include `ColorSchemeScript`
- ✅ **Must** add `@octave-org/ui` to `transpilePackages` in `next.config.ts`
- ❌ **NEVER** use the `/app` directory
- ❌ **NEVER** use `layout.tsx`, `page.tsx`, or any App Router file conventions
- ❌ **NEVER** add `"use client"` or `"use server"` directives
- ❌ **NEVER** create React Server Components
- ❌ **NEVER** use `next/navigation` (App Router only) — use `next/router` instead

---

## 3. Installation & Imports

### Install

```bash
npm install @octave-org/ui
# or
yarn add @octave-org/ui
# or
pnpm add @octave-org/ui
# or
bun add @octave-org/ui
```

### Configure `next.config.ts`

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@octave-org/ui'],
};

export default nextConfig;
```

### Import Rules

- ✅ **Always** import from `@octave-org/ui`
- ❌ **Never** import directly from `@mantine/core`, `@mantine/form`, `@mantine/hooks`, or `@mantine/notifications` — all Mantine exports are re-exported from `@octave-org/ui`

```tsx
// ✅ CORRECT
import { OctaveButton, Stack, createTheme, useForm } from '@octave-org/ui';

// ❌ WRONG — do not import from Mantine directly
import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
```

---

## 4. Core Rules (STRICT)

| Rule | Enforcement |
|------|------------|
| Import from `@octave-org/ui` only | ✅ Required |
| Use `/pages` directory | ✅ Required |
| Wrap app with `OctaveProvider` in `_app.tsx` | ✅ Required |
| Include `ColorSchemeScript` in `_document.tsx` | ✅ Required |
| Add `transpilePackages` in `next.config.ts` | ✅ Required |
| Import from `@mantine/core` directly | ❌ Forbidden |
| Use `/app` directory | ❌ Forbidden |
| Use `"use client"` / `"use server"` directives | ❌ Forbidden |
| Create Server Components | ❌ Forbidden |
| Use `next/navigation` | ❌ Forbidden |
| Use `layout.tsx` / `page.tsx` conventions | ❌ Forbidden |

---

## 5. Providers & Setup (CRITICAL)

Missing `OctaveProvider` will break theming, notifications, and branding. It **must** wrap the entire app in `pages/_app.tsx`.

### `pages/_app.tsx`

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { OctaveProvider, createTheme, MantineColorsTuple } from '@octave-org/ui';

const primary: MantineColorsTuple = [
  '#fff0e4', '#ffe0cf', '#fac0a1', '#f69e6e', '#f28043',
  '#f06e27', '#f06418', '#d6530c', '#bf4906', '#a73c00',
];

const myTheme = createTheme({
  colors: { primary },
  primaryColor: 'primary',
  defaultRadius: 'md',
  fontFamily: 'DM Sans, sans-serif',
});

const myBranding = {
  companyName: 'My Company',
  slogan: 'Your slogan here',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OctaveProvider theme={myTheme} branding={myBranding}>
      <Component {...pageProps} />
    </OctaveProvider>
  );
}
```

`OctaveProvider` accepts:

| Prop | Type | Description |
|------|------|-------------|
| `theme` | `MantineThemeOverride` | Optional theme override (use `createTheme` from `@octave-org/ui`) |
| `branding` | `OctaveBranding` | Optional branding: `companyName`, `slogan`, `logo` |

Internally, `OctaveProvider` wraps `MantineProvider`, `OctaveBrandingProvider`, and `Notifications`. You do not need to add any of those manually.

### `pages/_document.tsx`

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@octave-org/ui';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="light" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## 6. Component Usage Patterns

### Page components and `OctaveShellProps`

When using `OctaveShell` in `_app.tsx`, page components must be typed as `OctaveShellProps` (a `NextPage` extension) and can declare static properties that control the shell layout:

```tsx
import { OctaveShellProps } from '@octave-org/ui';

const MyPage: OctaveShellProps = () => {
  return <div>Page content</div>;
};

MyPage.title = 'My Page';
MyPage.description = 'Page description shown in the shell header';
MyPage.hasBack = false;
MyPage.disabled = false;      // true = disables the shell entirely
MyPage.disablePadding = false;

export default MyPage;
```

### `OctaveShell` layout

Use `OctaveShell` in `_app.tsx` to provide sidebar navigation:

```tsx
import { OctaveShell, OctaveLinksGroupProps } from '@octave-org/ui';
import { IconGauge, IconSettings } from '@tabler/icons-react';

const menu: OctaveLinksGroupProps[] = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Settings',
    icon: IconSettings,
    links: [
      { label: 'Profile', link: '/settings/profile' },
      { label: 'Security', link: '/settings/security' },
    ],
  },
];

// Inside _app.tsx App component:
<OctaveShell
  props={{
    disabled: Component.disabled,
    title: Component.title,
    description: Component.description,
    hasBack: Component.hasBack,
    disablePadding: Component.disablePadding,
  }}
  menu={menu}
  user={{
    contact: 'user@example.com',
    fullName: 'Jane Doe',
    logout: () => { /* handle logout */ },
  }}
>
  <Component {...pageProps} />
</OctaveShell>
```

### Input components

All input components are wrappers around Mantine inputs with an elevated contained style.

```tsx
import {
  OctaveTextInput,
  OctaveNumberInput,
  OctaveSelectInput,
  OctaveSecureInput,
  OctaveCheckboxInput,
  OctaveRadioInput,
  RadioGroup,
  Stack,
} from '@octave-org/ui';

// Text input
<OctaveTextInput label="Email" placeholder="Enter email" description="Your email address" />

// Number input
<OctaveNumberInput label="Age" placeholder="Enter age" />

// Select input
<OctaveSelectInput label="Role" placeholder="Select role" data={['Admin', 'Editor', 'Viewer']} />

// Password input with forgot password link
<OctaveSecureInput
  label="Password"
  placeholder="Enter password"
  enableForgotPassword
  forgotPasswordHref="/auth/fp"
/>

// Checkbox
<OctaveCheckboxInput label="Accept terms" description="You must accept the terms" />

// Radio (must be inside RadioGroup)
<RadioGroup>
  <Stack>
    <OctaveRadioInput value="option1" label="Option 1" description="First option" />
    <OctaveRadioInput value="option2" label="Option 2" description="Second option" />
  </Stack>
</RadioGroup>
```

### Button component

```tsx
import { OctaveButton } from '@octave-org/ui';

// Primary (default)
<OctaveButton btnProps={{ label: 'Submit', action: () => handleSubmit() }} />

// With context
<OctaveButton btnProps={{ label: 'Delete', context: 'destructive', action: () => handleDelete() }} />
<OctaveButton btnProps={{ label: 'Save', context: 'success', action: () => handleSave() }} />
<OctaveButton btnProps={{ label: 'Warn', context: 'warning', action: () => handleWarn() }} />

// As a navigation link
<OctaveButton btnProps={{ label: 'Go to Dashboard', link: '/dashboard', context: 'primary' }} />

// With label styling
<OctaveButton
  btnProps={{ label: 'Register', type: 'submit' }}
  labelProps={{ case: 'uppercase', fw: 700 }}
/>
```

`OctaveButton` `context` values: `'primary'` | `'destructive'` | `'success'` | `'warning'`

### Data display components

```tsx
import { OctaveBadge, OctaveStatusBadge, OctaveStatCard, OctaveTable, OctaveCol } from '@octave-org/ui';
import { IconCheck, IconClock, IconX, IconProps } from '@tabler/icons-react';
import { useState } from 'react';

// Badge
<OctaveBadge color="blue" variant="dot" label="Active" />

// Status badge with dynamic icon and color
const colorMap: Record<string, string> = { active: 'green', inactive: 'red' };
const iconMap: Record<string, React.FC<IconProps>> = { active: IconCheck, inactive: IconX };
<OctaveStatusBadge label="active" colorMap={colorMap} iconMap={iconMap} />

// Stat card
<OctaveStatCard
  icon={IconClock}
  title="Total Users"
  description="Users registered this month"
  direction="up"
  value={0.15}
  isValuePercent
  color="primary"
/>

// Table with typed columns
type Row = { name: string; status: string };
const columns: OctaveCol<Row>[] = [
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' },
];
const [page, setPage] = useState(1);
<OctaveTable
  data={[{ name: 'Alice', status: 'active' }]}
  columns={columns}
  pagination={{ total: 50, page, pageSize: 10, onPageChange: setPage }}
/>
```

### Auth components

```tsx
import { OctaveAuthForm } from '@octave-org/ui';
import { IconLockAccess } from '@tabler/icons-react';

interface LoginValues { email: string; password: string; }

<OctaveAuthForm<LoginValues>
  config={{
    title: 'Sign In',
    description: 'Enter your credentials',
    icon: <IconLockAccess size={80} stroke={1} />,
    fields: [
      { type: 'text',   name: 'email',    props: { label: 'Email',    placeholder: 'you@example.com' } },
      { type: 'secure', name: 'password', props: { label: 'Password', placeholder: 'Enter password', enableForgotPassword: true, forgotPasswordHref: '/auth/fp' } },
    ],
    primaryAction:   { label: 'Sign in', onSubmit: (values) => console.log(values) },
    secondaryAction: { label: 'Register', link: '/auth/register' },
  }}
  initialValues={{ email: '', password: '' }}
  validate={{
    email: (v) => (/^\S+@\S+$/.test(v as string) ? null : 'Invalid email'),
    password: () => null,
  }}
/>
```

For auth pages, disable the shell by setting static props:

```tsx
const LoginPage: OctaveShellProps = () => { /* ... */ };
LoginPage.disabled = true;
LoginPage.disablePadding = true;
export default LoginPage;
```

---

## 7. Styling Conventions

- ✅ Use the `styles` prop to target internal component parts (e.g., `root`, `input`, `label`)
- ✅ Use the `sx` prop for ad-hoc inline theme-aware styles
- ✅ Use Mantine CSS custom properties for theme-aware values: `var(--mantine-color-primary-6)`, `var(--mantine-spacing-md)`, etc.
- ✅ Use `light-dark()` for light/dark mode aware values: `light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))`
- ✅ Use `c`, `bg`, `p`, `m`, `fz`, `fw` shorthand props from Mantine
- ❌ Do not use CSS Modules — no `.module.css` files
- ❌ Do not use Tailwind CSS
- ❌ Do not override Mantine component styles via global CSS

```tsx
// ✅ Correct styling examples
<Text c="gray.7" fz="sm" fw={600}>Label</Text>
<Box style={{ borderLeft: '2px solid var(--mantine-color-primary-6)' }}>...</Box>
<Stack styles={{ root: { padding: 'var(--mantine-spacing-md)' } }}>...</Stack>
```

---

## 8. Theming

The library ships with a base theme (`octaveTheme`) that sets `primaryColor: 'blue'`, `defaultRadius: 0`, and `fontFamily: 'DM Sans, sans-serif'`. Override it at the app level via `OctaveProvider`.

### Overriding the theme

```tsx
import { createTheme, MantineColorsTuple, OctaveProvider } from '@octave-org/ui';

const brand: MantineColorsTuple = [
  '#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8',
  '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81',
];

const theme = createTheme({
  colors: { brand },
  primaryColor: 'brand',
  defaultRadius: 'sm',
  fontFamily: 'Inter, sans-serif',
});

<OctaveProvider theme={theme}>...</OctaveProvider>
```

### Light/Dark mode

```tsx
import { useMantineColorScheme, ThemeTrigger } from '@octave-org/ui';

// Read current scheme
const { colorScheme } = useMantineColorScheme();

// Toggle button (pre-built component)
<ThemeTrigger />
```

### Branding

```tsx
import { useOctaveBranding } from '@octave-org/ui';

function Header() {
  const { companyName, slogan, logo } = useOctaveBranding();
  return <div>{logo} {companyName}</div>;
}
```

Override branding per-component:

```tsx
const { companyName } = useOctaveBranding({ companyName: 'Override Name' });
```

---

## 9. Common Pitfalls

### ❌ Missing `OctaveProvider`

**Symptom:** Blank page, broken styles, notifications not rendering, runtime errors from Mantine context.

**Fix:** Ensure `OctaveProvider` wraps `<Component {...pageProps} />` in `pages/_app.tsx`.

---

### ❌ Missing `ColorSchemeScript` in `_document.tsx`

**Symptom:** Flash of wrong color scheme on page load.

**Fix:** Add `<ColorSchemeScript defaultColorScheme="light" />` inside `<Head>` in `pages/_document.tsx`.

---

### ❌ Missing `transpilePackages` in `next.config.ts`

**Symptom:** Build errors, import resolution failures, or runtime errors when importing from `@octave-org/ui`.

**Fix:** Add `transpilePackages: ['@octave-org/ui']` to `next.config.ts`.

---

### ❌ Importing directly from `@mantine/core`

**Symptom:** Possible duplicate context errors, style inconsistencies, or components outside the Octave theme.

**Fix:** Always import from `@octave-org/ui`. All Mantine exports are re-exported from there.

```tsx
// ❌ Wrong
import { Button, TextInput } from '@mantine/core';

// ✅ Correct
import { OctaveButton, OctaveTextInput } from '@octave-org/ui';
// or, for raw Mantine components when no Octave wrapper exists:
import { Divider, Flex } from '@octave-org/ui';
```

---

### ❌ Using App Router patterns

**Symptom:** Compilation errors, missing context, broken provider hierarchy.

**Fix:** Use Pages Router exclusively. Never create files in an `/app` directory.

---

### ❌ Using `next/navigation` instead of `next/router`

**Symptom:** `useRouter` from `next/navigation` throws "not in App Router context".

**Fix:** Use `next/router`:

```tsx
// ❌ Wrong
import { useRouter } from 'next/navigation';

// ✅ Correct
import { useRouter } from 'next/router';
```

---

### ❌ Forgetting to set static shell props on auth pages

**Symptom:** Auth pages render inside the application shell (sidebar visible).

**Fix:** Set `MyPage.disabled = true` and `MyPage.disablePadding = true` on the page component.

---

## 10. Examples

### Example 1 — Minimal app setup

```tsx
// next.config.ts
import type { NextConfig } from 'next';
const nextConfig: NextConfig = { transpilePackages: ['@octave-org/ui'] };
export default nextConfig;
```

```tsx
// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@octave-org/ui';

export default function Document() {
  return (
    <Html lang="en">
      <Head><ColorSchemeScript defaultColorScheme="light" /></Head>
      <body><Main /><NextScript /></body>
    </Html>
  );
}
```

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { OctaveProvider } from '@octave-org/ui';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OctaveProvider>
      <Component {...pageProps} />
    </OctaveProvider>
  );
}
```

```tsx
// pages/index.tsx
import { OctaveButton, Stack, Text } from '@octave-org/ui';

export default function Home() {
  return (
    <Stack p="xl">
      <Text fz="xl" fw={700}>Hello from @octave-org/ui</Text>
      <OctaveButton btnProps={{ label: 'Get Started', action: () => alert('clicked') }} />
    </Stack>
  );
}
```

---

### Example 2 — App with `OctaveShell` and custom theme

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import {
  OctaveProvider,
  OctaveShell,
  OctaveShellProps,
  OctaveLinksGroupProps,
  createTheme,
  MantineColorsTuple,
} from '@octave-org/ui';
import { IconGauge, IconSettings } from '@tabler/icons-react';

type ShellAppProps = AppProps & { Component: OctaveShellProps };

const primary: MantineColorsTuple = [
  '#fff0e4', '#ffe0cf', '#fac0a1', '#f69e6e', '#f28043',
  '#f06e27', '#f06418', '#d6530c', '#bf4906', '#a73c00',
];

const theme = createTheme({ colors: { primary }, primaryColor: 'primary', defaultRadius: 'md' });
const branding = { companyName: 'Acme Corp', slogan: 'Building the future' };

const menu: OctaveLinksGroupProps[] = [
  { label: 'Dashboard', icon: IconGauge },
  { label: 'Settings', icon: IconSettings },
];

export default function App({ Component, pageProps }: ShellAppProps) {
  return (
    <OctaveProvider theme={theme} branding={branding}>
      <OctaveShell
        props={{
          disabled: Component.disabled,
          title: Component.title,
          description: Component.description,
          hasBack: Component.hasBack,
          disablePadding: Component.disablePadding,
        }}
        menu={menu}
        user={{ contact: 'admin@acme.com', fullName: 'Admin User', logout: () => {} }}
      >
        <Component {...pageProps} />
      </OctaveShell>
    </OctaveProvider>
  );
}
```

```tsx
// pages/dashboard.tsx
import { OctaveShellProps, OctaveStatCard, Stack } from '@octave-org/ui';
import { IconGauge } from '@tabler/icons-react';

const Dashboard: OctaveShellProps = () => (
  <Stack>
    <OctaveStatCard
      icon={IconGauge}
      title="Active Users"
      description="Users active in the last 30 days"
      direction="up"
      value={0.12}
      isValuePercent
      color="primary"
    />
  </Stack>
);

Dashboard.title = 'Dashboard';
Dashboard.description = 'Your activity overview';
Dashboard.hasBack = false;

export default Dashboard;
```

---

### Example 3 — Login page (shell disabled)

```tsx
// pages/auth/login.tsx
import { OctaveAuthForm, OctaveShellProps } from '@octave-org/ui';
import { IconLockAccess } from '@tabler/icons-react';

interface LoginValues { email: string; password: string; }

const LoginPage: OctaveShellProps = () => (
  <OctaveAuthForm<LoginValues>
    config={{
      title: 'Sign In',
      description: 'Enter your credentials to continue',
      icon: <IconLockAccess size={80} stroke={1} />,
      fields: [
        { type: 'text',   name: 'email',    props: { label: 'Email',    required: true, placeholder: 'you@example.com' } },
        { type: 'secure', name: 'password', props: { label: 'Password', placeholder: 'Enter password', enableForgotPassword: true, forgotPasswordHref: '/auth/forgot-password' } },
      ],
      primaryAction:   { label: 'Sign In', onSubmit: (values) => console.log(values) },
      secondaryAction: { label: 'Register', link: '/auth/register' },
    }}
    initialValues={{ email: '', password: '' }}
    validate={{
      email:    (v) => (/^\S+@\S+$/.test(v as string) ? null : 'Invalid email'),
      password: () => null,
    }}
  />
);

LoginPage.disabled = true;
LoginPage.disablePadding = true;

export default LoginPage;
```

---

### Example 4 — Data page with table, notifications, and inputs

```tsx
// pages/users.tsx
import { useState } from 'react';
import {
  OctaveShellProps,
  OctaveTable,
  OctaveCol,
  OctaveTextInput,
  OctaveButton,
  OctaveStatusBadge,
  Stack,
  Flex,
  success,
  error,
} from '@octave-org/ui';
import { IconCheck, IconX, IconProps } from '@tabler/icons-react';

type User = { id: string; name: string; status: string };

const colorMap: Record<string, string> = { active: 'green', inactive: 'red' };
const iconMap: Record<string, React.FC<IconProps>> = { active: IconCheck, inactive: IconX };

const columns: OctaveCol<User>[] = [
  { key: 'id',     label: 'ID' },
  { key: 'name',   label: 'Name' },
  { key: 'status', label: 'Status', render: (row) => (
    <OctaveStatusBadge label={row.status} colorMap={colorMap} iconMap={iconMap} />
  )},
];

const UsersPage: OctaveShellProps = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    if (!search) { error({ title: 'Error', description: 'Search term is required' }); return; }
    success({ title: 'Searching', description: `Looking for "${search}"` });
  };

  return (
    <Stack>
      <Flex gap="sm">
        <OctaveTextInput
          label="Search"
          placeholder="Enter user name"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <OctaveButton btnProps={{ label: 'Search', action: handleSearch, context: 'primary' }} />
      </Flex>
      <OctaveTable
        data={[
          { id: '1', name: 'Alice', status: 'active' },
          { id: '2', name: 'Bob',   status: 'inactive' },
        ]}
        columns={columns}
        pagination={{ total: 2, page, pageSize: 10, onPageChange: setPage }}
      />
    </Stack>
  );
};

UsersPage.title = 'Users';
UsersPage.description = 'Manage application users';

export default UsersPage;
```

---

### Example 5 — Responsive page using `useBreakpoints`

```tsx
// pages/profile.tsx
import { OctaveShellProps, useBreakpoints, Stack, Flex, Text, OctaveButton } from '@octave-org/ui';

const ProfilePage: OctaveShellProps = () => {
  const { isMobile } = useBreakpoints();

  return (
    <Stack>
      <Text fz={isMobile ? 'lg' : 'xl'} fw={700}>My Profile</Text>
      <Flex direction={isMobile ? 'column' : 'row'} gap="md">
        <OctaveButton btnProps={{ label: 'Edit Profile', context: 'primary', action: () => {} }} />
        <OctaveButton btnProps={{ label: 'Change Password', context: 'warning', action: () => {} }} />
      </Flex>
    </Stack>
  );
};

ProfilePage.title = 'Profile';
ProfilePage.description = 'Your account details';
ProfilePage.hasBack = true;

export default ProfilePage;
```

---

## Full Component & Utility Reference

### Components (import from `@octave-org/ui`)

| Export | Type | Description |
|--------|------|-------------|
| `OctaveProvider` | Provider | Root provider — wraps MantineProvider + branding + notifications |
| `UIProvider` | Provider | Alias for `OctaveProvider` |
| `OctaveBrandingProvider` | Provider | Standalone branding context provider |
| `OctaveShell` | Layout | App shell with collapsible sidebar, user menu, and header |
| `OctaveLinksGroup` | Layout | Collapsible sidebar nav link group |
| `OctaveButton` | Input | Styled button with context colors, link support, hover effects |
| `OctaveTextInput` | Input | Contained-style text input |
| `OctaveNumberInput` | Input | Contained-style number input |
| `OctaveSelectInput` | Input | Contained-style select dropdown |
| `OctaveSecureInput` | Input | Password input with show/hide toggle and optional forgot-password link |
| `OctaveCheckboxInput` | Input | Checkbox with description support |
| `OctaveRadioInput` | Input | Radio button with description support (must be inside `RadioGroup`) |
| `OctaveFormBuilder` | Input | Dynamic form builder driven by a config array |
| `OctaveAuthForm` | Block | Complete auth form layout (login, register, etc.) |
| `OctaveAuthWrapper` | Block | Auth page outer wrapper/layout |
| `OctaveBadge` | Data | Simple styled badge |
| `OctaveStatusBadge` | Data | Badge with dynamic color and icon from maps |
| `OctaveStatCard` | Data | Statistics card with direction indicator (up/down/neutral) |
| `OctaveTable` | Data | Table with drag-reorder columns, hide/show, empty state, pagination, loading state |
| `OctaveStackedText` | Text | Title + description stacked vertically |
| `OctaveLinkedText` | Text | Text with an inline hyperlink |
| `ThemeTrigger` | Theme | Pre-built light/dark mode toggle button |
| `octaveTheme` | Theme | Base Mantine theme config object |
| `ColorSchemeScript` | Util | Script to prevent color scheme flash (use in `_document.tsx`) |

All `@mantine/core`, `@mantine/form`, `@mantine/hooks`, and `@mantine/notifications` exports are also available from `@octave-org/ui`.

### Utilities (import from `@octave-org/ui`)

| Export | Description |
|--------|-------------|
| `useBreakpoints()` | Returns `{ isMobile, isTablet, isDesktop }` based on Mantine breakpoints |
| `useOctaveBranding(overrides?)` | Returns branding values from context with optional per-call overrides |
| `success(props)` | Show a green success notification |
| `info(props)` | Show a blue info notification |
| `warning(props)` | Show an orange warning notification |
| `error(props)` | Show a red error notification |
| `formatETB(value)` | Format a number as Ethiopian Birr currency |
| `percentToFloat(value)` | Convert a percent string (e.g. `"15%"`) to decimal (e.g. `0.15`) |
| `floatToPercent(value)` | Convert a decimal (e.g. `0.15`) to a percent string (e.g. `"15%"`) |
| `formatDate(date)` | Format a date in `en-ET` locale |
| `UnderscoreToTitleCase(str)` | Convert `snake_case` to `Title Case` |
| `TitleCaseToUnderscore(str)` | Convert `Title Case` to `snake_case` |
| `setTokens(access, refresh)` | Store access and refresh tokens in cookies |
| `getAccessToken()` | Retrieve stored access token |
| `getRefreshToken()` | Retrieve stored refresh token |
| `clearTokens()` | Remove all stored tokens |

### Notification function signature

```tsx
success({ title: string; description: string; baseProps?: NotificationData });
info({    title: string; description: string; baseProps?: NotificationData });
warning({ title: string; description: string; baseProps?: NotificationData });
error({   title: string; description: string; baseProps?: NotificationData });

// baseProps example (position, autoClose, etc.)
success({
  title: 'Done',
  description: 'Record saved successfully.',
  baseProps: { position: 'top-right', autoClose: 3000 },
});
```
