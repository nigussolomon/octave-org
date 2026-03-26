# Text Components

Lightweight presentational helpers for common text patterns.

---

## OctaveStackedText

Renders a bold title and a dimmed description stacked vertically with no gap between them.

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | ✅ | – | Primary text rendered as an `xl` bold heading. |
| `description` | `string` | ✅ | – | Secondary / supporting text rendered as dimmed `xs` text. |
| `titleProps` | `TextProps` | ❌ | `undefined` | Extra [Mantine Text props](https://mantine.dev/core/text/) for the title. |
| `descProps` | `TextProps` | ❌ | `undefined` | Extra Mantine `Text` props for the description. |

### Example

```tsx
import { OctaveStackedText } from '@octave-org/ui';

// Basic usage
<OctaveStackedText
  title="Welcome back"
  description="You last logged in yesterday."
/>

// Custom styling
<OctaveStackedText
  title="Octave Designs"
  description="The UI system you deserve"
  titleProps={{ c: 'white', fw: 900 }}
  descProps={{ c: 'white', mt: -5 }}
/>

// Centered, large heading
<OctaveStackedText
  title="Create your account"
  description="Fill in the form below to get started"
  titleProps={{ ta: 'center', style: { fontSize: '32px' }, fw: 900 }}
  descProps={{ ta: 'center', mt: -10 }}
/>
```

---

## OctaveLinkedText

Renders an inline sentence where part of the text is a Next.js `Link` (underlined anchor).

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `string` | ✅ | – | The plain text prefix (e.g. `"Don't have an account? "`). |
| `linkLabel` | `string` | ✅ | – | The clickable anchor text (e.g. `"Sign up"`). |
| `link` | `string` | ✅ | – | The `href` for the anchor. |
| `baseTextProps` | `TextProps` | ❌ | `undefined` | Extra props for the outer `Text` wrapper (defaults to `size="xs"`). |
| `baseAnchorProps` | `AnchorProps` | ❌ | `undefined` | Extra props for the `Anchor` element. |

### Example

```tsx
import { OctaveLinkedText } from '@octave-org/ui';

// Sign-up prompt below a login form
<OctaveLinkedText
  label="Don't have an account? "
  linkLabel="Sign up"
  link="/auth/register"
/>

// Center-aligned with custom sizing
<OctaveLinkedText
  label="Already have an account? "
  linkLabel="Log in"
  link="/auth/login"
  baseTextProps={{ ta: 'center', size: 'sm' }}
/>
```
