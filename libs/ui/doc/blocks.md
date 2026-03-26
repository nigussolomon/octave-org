# Blocks

Higher-level, pre-composed page blocks. Currently contains authentication layouts.

---

## OctaveAuthWrapper

A two-column page layout for authentication screens. The left column shows a decorative gradient background with stacked-card artwork and the Octave branding; the right column renders `children`. Use the `flip` prop to swap sides.

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | ✅ | – | Your form or content to display in the non-decorative column. |
| `flip` | `boolean` | ❌ | `false` | When `true`, moves `children` to the left and the decorative panel to the right. |

### Layout behaviour

| Breakpoint | Layout |
|---|---|
| Mobile (`< md`) | Single column — decorative panel is hidden. |
| Desktop (`≥ md`) | Two equal columns (`1fr 1fr`). |

### Example

```tsx
import { OctaveAuthWrapper } from '@octave-org/ui';

// Default: decorative panel on the left, form on the right
<OctaveAuthWrapper>
  <MyLoginForm />
</OctaveAuthWrapper>

// Flipped: form on the left, decorative panel on the right
<OctaveAuthWrapper flip>
  <MyRegisterForm />
</OctaveAuthWrapper>
```

---

## OctaveAuthForm

A batteries-included authentication form component that combines `OctaveAuthWrapper`, `OctaveFormBuilder`, `OctaveButton`, and Mantine's `useForm` in a single, configuration-driven API.

### AuthFormConfig\<T\>

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | ✅ | – | Heading text above the form. |
| `description` | `string` | ✅ | – | Subheading / helper text below the title. |
| `icon` | `React.ReactNode` | ❌ | `undefined` | Optional icon rendered above the title. |
| `fields` | `FormFieldConfig<T>[]` | ❌ | `undefined` | Flat list of fields rendered in a single column. Use `rows` for multi-column layouts. |
| `rows` | `AuthFormRow<T>[]` | ❌ | `undefined` | Row-based layout. Each row contains one or more columns of fields. Rows with `> 1` column render side-by-side via `Flex`. |
| `pinFieldName` | `keyof T` | ❌ | `undefined` | When set, renders a `PinInput` bound to this form field. |
| `pinLength` | `number` | ❌ | `6` | Number of PIN characters. |
| `primaryAction.label` | `string` | ✅ | – | Label for the primary submit button. |
| `primaryAction.onSubmit` | `(values: T) => void \| Promise<void>` | ✅ | – | Called with validated form values on submit. |
| `secondaryAction.label` | `string` | ❌ | – | Label for the secondary button or text link. |
| `secondaryAction.link` | `string` | ❌ | – | Target `href` for the secondary action. |
| `secondaryAction.onClick` | `() => void` | ❌ | – | Click handler for the secondary action button (used instead of `link`). |
| `secondaryAction.variant` | `'outline' \| 'default' \| 'filled'` | ❌ | `'default'` | Button variant when the secondary action is a button. |
| `secondaryAction.context` | `OctaveButtonContext` | ❌ | `'primary'` | Color context when the secondary action is a button. |
| `secondaryAction.linkLabel` | `string` | ❌ | – | When provided, the secondary action renders as an `OctaveLinkedText` (plain text with an inline link) instead of a button. The `label` becomes the prefix and `linkLabel` the clickable text. |

### AuthFormRow\<T\>

| Field | Type | Description |
|---|---|---|
| `columns` | `FormFieldConfig<T>[][]` | An array of columns. Each column is an array of `FormFieldConfig` objects. |

### AuthFormProps\<T\>

| Prop | Type | Required | Description |
|---|---|---|---|
| `config` | `AuthFormConfig<T>` | ✅ | Form configuration (see above). |
| `initialValues` | `T` | ✅ | Initial values for the Mantine `useForm` hook. |
| `validate` | `FormValidateInput<T>` | ❌ | Mantine validation rules object or function. |

### Example — Login form

```tsx
import { OctaveAuthForm, FormFieldConfig } from '@octave-org/ui';
import { IconLock } from '@tabler/icons-react';

interface LoginValues {
  email: string;
  password: string;
}

<OctaveAuthForm<LoginValues>
  initialValues={{ email: '', password: '' }}
  validate={{
    email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
    password: (v) => (v.length >= 6 ? null : 'At least 6 characters'),
  }}
  config={{
    title: 'Welcome back',
    description: 'Sign in to your account',
    icon: <IconLock size={40} />,
    fields: [
      { type: 'text', name: 'email', props: { label: 'Email' } },
      {
        type: 'secure',
        name: 'password',
        props: {
          label: 'Password',
          enableForgotPassword: true,
          forgotPasswordHref: '/auth/forgot-password',
        },
      },
    ],
    primaryAction: {
      label: 'Login',
      onSubmit: async (values) => {
        await loginUser(values);
      },
    },
    secondaryAction: {
      label: "Don't have an account? ",
      linkLabel: 'Sign up',
      link: '/auth/register',
    },
  }}
/>
```

### Example — Registration form with multi-column layout

```tsx
import { OctaveAuthForm } from '@octave-org/ui';

interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

<OctaveAuthForm<RegisterValues>
  initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
  config={{
    title: 'Create account',
    description: 'Join Octave today',
    rows: [
      {
        columns: [
          [{ type: 'text', name: 'firstName', props: { label: 'First Name' } }],
          [{ type: 'text', name: 'lastName', props: { label: 'Last Name' } }],
        ],
      },
      {
        columns: [
          [{ type: 'text', name: 'email', props: { label: 'Email' } }],
        ],
      },
      {
        columns: [
          [{ type: 'secure', name: 'password', props: { label: 'Password' } }],
        ],
      },
    ],
    primaryAction: {
      label: 'Create Account',
      onSubmit: async (values) => {
        await registerUser(values);
      },
    },
    secondaryAction: {
      label: 'Already have an account? ',
      linkLabel: 'Log in',
      link: '/auth/login',
    },
  }}
/>
```

### Example — PIN entry form

```tsx
import { OctaveAuthForm } from '@octave-org/ui';

interface PinValues {
  pin: string;
}

<OctaveAuthForm<PinValues>
  initialValues={{ pin: '' }}
  config={{
    title: 'Enter your PIN',
    description: 'Check your authenticator app for a 6-digit code',
    pinFieldName: 'pin',
    pinLength: 6,
    primaryAction: {
      label: 'Verify',
      onSubmit: (values) => verifyPin(values.pin),
    },
  }}
/>
```
