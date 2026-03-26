# Feedback Components

Imperative toast-notification helpers for displaying user-facing alerts. Each function wraps Mantine's `notifications.show` with pre-styled colors and icons.

---

## Notification Functions

All four helpers share the same `NotificationProps` interface.

### NotificationProps

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | ✅ | – | Short heading shown at the top of the notification. |
| `description` | `string` | ✅ | – | Body text of the notification. |
| `baseProps` | `Omit<NotificationData, 'title' \| 'message' \| 'icon'>` | ❌ | `undefined` | Any extra [Mantine notification options](https://mantine.dev/x/notifications/) (e.g. `autoClose`, `id`). |

> **Note:** Notifications require `<Notifications />` to be mounted in the component tree. This is handled automatically by `OctaveProvider` / `UIProvider`.

---

### success

Displays a **green** notification with a checkmark icon.

```tsx
import { success } from '@octave-org/ui';

success({
  title: 'Saved!',
  description: 'Your changes have been saved successfully.',
});
```

---

### info

Displays a **blue** notification with an info-square icon.

```tsx
import { info } from '@octave-org/ui';

info({
  title: 'Did you know?',
  description: 'You can drag columns in the table to reorder them.',
});
```

---

### warning

Displays an **orange** notification with a warning-triangle icon.

```tsx
import { warning } from '@octave-org/ui';

warning({
  title: 'Unsaved changes',
  description: 'You have unsaved changes. Please save before leaving.',
});
```

---

### error

Displays a **red** notification with an alert-octagon icon.

```tsx
import { error } from '@octave-org/ui';

error({
  title: 'Something went wrong',
  description: 'Failed to connect to the server. Please try again.',
});
```

---

## Custom options via `baseProps`

Use `baseProps` to pass any additional Mantine notification options:

```tsx
import { success } from '@octave-org/ui';

success({
  title: 'Profile updated',
  description: 'Your profile information has been updated.',
  baseProps: {
    autoClose: 3000,          // close after 3 seconds
    id: 'profile-update',     // deduplicate notifications with the same id
    withCloseButton: false,   // hide the close button
  },
});
```

---

## Visual reference

| Function | Color | Icon |
|---|---|---|
| `success` | Green | `IconCheck` |
| `info` | Blue | `IconInfoSquare` |
| `warning` | Orange | `IconAlertTriangle` |
| `error` | Red | `IconAlertOctagon` |
