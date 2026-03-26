# @octave-org/ui

This library was generated with [Nx](https://nx.dev).

## Branding

Set shared branding once at the provider level:

```tsx
import { OctaveProvider } from '@octave-org/ui';

<OctaveProvider
  branding={{
    companyName: 'Acme Inc.',
    slogan: 'Secure access for modern teams',
  }}
>
  <App />
</OctaveProvider>;
```

`OctaveAuthWrapper`, `OctaveAuthForm`, and `OctaveShell` will use that branding by default. You can still override branding per component with a `branding` prop when needed.

## Running unit tests

Run `nx test @octave-org/ui` to execute the unit tests via [Jest](https://jestjs.io).
