# @octave-org/ui

A UI component library built on top of [Mantine](https://mantine.dev), designed for use with Next.js projects.

> **Note:** This package is currently only stable on the **Next.js Pages Router**. App Router support is not guaranteed.

---

## Installation

Install the package and its peer dependencies:

```bash
npm install @octave-org/ui @mantine/core @mantine/hooks @mantine/form @mantine/notifications
```

---

## Setup

### 1. Update `next.config.ts`

Add `@octave-org/ui` to `transpilePackages` so Next.js can process the package correctly:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@octave-org/ui'],
};

export default nextConfig;
```

### 2. Wrap your app with `OctaveProvider`

In your `pages/_app.tsx`, wrap your application with the `OctaveProvider` component to enable theming and notifications:

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

---

## Usage

### OctaveButton

Use `OctaveButton` to render a styled button. You can pass a label, an action handler, or a link.

```tsx
import { OctaveButton } from '@octave-org/ui';

export default function MyPage() {
  return (
    <OctaveButton
      btnProps={{
        label: 'Click me',
        action: () => console.log('Button clicked!'),
        context: 'primary', // 'primary' | 'destructive' | 'success' | 'warning'
      }}
    />
  );
}
```

You can also render the button as a link:

```tsx
<OctaveButton
  btnProps={{
    label: 'Go to Dashboard',
    link: '/dashboard',
    context: 'success',
  }}
/>
```

---

## Running unit tests

Run `nx test @octave-org/ui` to execute the unit tests via [Jest](https://jestjs.io).
