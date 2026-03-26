# Input Components

Form controls and the form builder used throughout the Octave design system. All inputs share a "contained" visual style — a floating label that sits at the top of the input field, giving each input a taller appearance to accommodate the label without overlapping the typed value.

---

## OctaveButton

A styled Mantine `Button` with built-in context variants, optional Next.js `Link` navigation, and smooth hover / press animations.

### OctaveButtonProps

Extends Mantine [`ButtonProps`](https://mantine.dev/core/button/).

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `string` | ❌ | `undefined` | Button text. |
| `action` | `() => void` | ❌ | `undefined` | Click handler. |
| `link` | `string` | ❌ | `undefined` | When provided, renders the button as a Next.js `Link`. |
| `type` | `'submit' \| 'reset' \| 'button'` | ❌ | `'button'` | HTML button type. Use `'submit'` inside forms. |
| `context` | `OctaveButtonContext` | ❌ | `'primary'` | Visual context that maps to a color. |

### OctaveButtonContext

| Value | Color |
|---|---|
| `'primary'` | Mantine primary (blue) |
| `'destructive'` | `red` |
| `'success'` | `green` |
| `'warning'` | `orange` |

### OctaveButtonLabelProps

Extends Mantine [`TextProps`](https://mantine.dev/core/text/).

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `case` | `'lowercase' \| 'uppercase' \| 'free'` | ❌ | `undefined` | CSS `text-transform` applied to the label. `'free'` disables transformation. |

### Usage

```tsx
import { OctaveButton } from '@octave-org/ui';

// Primary action
<OctaveButton
  btnProps={{ label: 'Save Changes', action: handleSave }}
  labelProps={{ case: 'uppercase' }}
/>

// Destructive action
<OctaveButton
  btnProps={{ label: 'Delete', context: 'destructive', action: handleDelete }}
/>

// Navigation link
<OctaveButton
  btnProps={{ label: 'Go to Dashboard', link: '/dashboard', context: 'primary' }}
/>

// Form submit
<OctaveButton
  btnProps={{ label: 'Submit', type: 'submit' }}
  labelProps={{ case: 'uppercase' }}
/>
```

---

## OctaveTextInput

A styled `TextInput` with the "contained" floating-label style. Errors and descriptions are rendered outside the Mantine input to maintain consistent spacing.

Accepts all [Mantine TextInputProps](https://mantine.dev/core/text-input/).

### Example

```tsx
import { OctaveTextInput } from '@octave-org/ui';

<OctaveTextInput
  label="Full Name"
  placeholder="John Doe"
  value={name}
  onChange={(e) => setName(e.target.value)}
  error={nameError}
  description="Enter your legal full name."
/>
```

---

## OctaveNumberInput

A styled `NumberInput` with the "contained" floating-label style.

Accepts all [Mantine NumberInputProps](https://mantine.dev/core/number-input/).

### Example

```tsx
import { OctaveNumberInput } from '@octave-org/ui';

<OctaveNumberInput
  label="Age"
  min={0}
  max={120}
  value={age}
  onChange={setAge}
/>
```

---

## OctaveSelectInput

A styled `Select` dropdown with the "contained" floating-label style.

Accepts all [Mantine SelectProps](https://mantine.dev/core/select/).

### Example

```tsx
import { OctaveSelectInput } from '@octave-org/ui';

<OctaveSelectInput
  label="Country"
  data={['Ethiopia', 'Kenya', 'Uganda']}
  value={country}
  onChange={setCountry}
  searchable
/>
```

---

## OctaveSecureInput

A password input with a show/hide toggle and an optional "Forgot Password?" link.

### Props

Extends [Mantine TextInputProps](https://mantine.dev/core/text-input/) plus:

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `enableForgotPassword` | `boolean` | ❌ | `false` | Shows a "Forgot Password?" anchor below the field. |
| `forgotPasswordHref` | `string` | ❌ | `'#'` | The `href` for the "Forgot Password?" link. |

### Example

```tsx
import { OctaveSecureInput } from '@octave-org/ui';

<OctaveSecureInput
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  enableForgotPassword
  forgotPasswordHref="/auth/forgot-password"
  error={passwordError}
/>
```

---

## OctaveCheckboxInput

A styled checkbox wrapped in a bordered card with a label and optional description.

Accepts all [Mantine CheckboxProps](https://mantine.dev/core/checkbox/).

### Example

```tsx
import { OctaveCheckboxInput } from '@octave-org/ui';

<OctaveCheckboxInput
  label="I agree to the Terms of Service"
  description="You must accept the terms to continue."
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

---

## OctaveRadioInput

A styled radio button wrapped in a bordered card with a label and optional description.

Accepts all [Mantine RadioProps](https://mantine.dev/core/radio/).

### Example

```tsx
import { OctaveRadioInput, Radio } from '@octave-org/ui';

<Radio.Group value={plan} onChange={setPlan}>
  <OctaveRadioInput value="basic" label="Basic Plan" description="Up to 5 users" />
  <OctaveRadioInput value="pro" label="Pro Plan" description="Unlimited users" />
</Radio.Group>
```

---

## OctaveFormBuilder

A generic, type-safe form builder that renders a list of field configurations as Octave-styled inputs. It connects each field to a Mantine `useForm` instance automatically.

### FieldConfigMap

Maps each field `type` string to its corresponding props type.

| `type` | Props type |
|---|---|
| `'text'` | `TextInputProps` |
| `'number'` | `NumberInputProps` |
| `'select'` | `SelectProps` |
| `'secure'` | `OctaveSecureInputProps` |
| `'checkbox'` | `CheckboxProps` |
| `'radio'` | `RadioProps` |

### FormFieldConfig\<T\>

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | `FieldType` | ✅ | One of the keys in `FieldConfigMap`. |
| `name` | `keyof T` | ✅ | The form field name — must match a key in the form's `initialValues`. |
| `props` | `FieldConfigMap[K]` | ❌ | Additional props forwarded to the specific input component (e.g. `label`, `placeholder`, `data` for select). |

### OctaveFormBuilderProps\<T\>

| Prop | Type | Required | Description |
|---|---|---|---|
| `form` | `UseFormReturnType<T>` | ✅ | Form instance created with Mantine's `useForm`. |
| `fields` | `FormFieldConfig<T>[]` | ✅ | Array of field configurations to render. |

### Example

```tsx
import { useForm } from '@mantine/form';
import { OctaveFormBuilder, FormFieldConfig } from '@octave-org/ui';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const fields: FormFieldConfig<LoginForm>[] = [
  {
    type: 'text',
    name: 'email',
    props: { label: 'Email', placeholder: 'you@example.com' },
  },
  {
    type: 'secure',
    name: 'password',
    props: {
      label: 'Password',
      enableForgotPassword: true,
      forgotPasswordHref: '/auth/forgot-password',
    },
  },
  {
    type: 'checkbox',
    name: 'rememberMe',
    props: { label: 'Remember me', description: 'Stay logged in for 30 days' },
  },
];

function LoginPage() {
  const form = useForm<LoginForm>({
    initialValues: { email: '', password: '', rememberMe: false },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length >= 8 ? null : 'At least 8 characters'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <OctaveFormBuilder form={form} fields={fields} />
    </form>
  );
}
```
