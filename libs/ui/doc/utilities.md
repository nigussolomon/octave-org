# Utilities

Standalone utility functions and hooks exported from `@octave-org/ui`.

---

## Formatters

Import path: `@octave-org/ui` (re-exported from `libs/ui/src/utils/lib/formatters.ts`)

---

### formatETB

Formats a number or numeric string as Ethiopian Birr currency.

**Signature**

```ts
function formatETB(value: number | string): string
```

**Examples**

```ts
formatETB(1500)        // "1,500.00 ETB"
formatETB(1234567.89)  // "1,234,567.89 ETB"
formatETB('ETB 2500')  // "2,500.00 ETB"
formatETB('not a num') // ""
```

---

### percentToFloat

Converts a percentage value (string or number) to a decimal fraction.

**Signature**

```ts
function percentToFloat(value: string | number): number
```

**Examples**

```ts
percentToFloat('50%')  // 0.5
percentToFloat(75)     // 0.75
percentToFloat('100%') // 1
```

---

### floatToPercent

Converts a decimal fraction to a percentage string.

**Signature**

```ts
function floatToPercent(value: string | number): string | 0
```

**Examples**

```ts
floatToPercent(0.5)    // "50%"
floatToPercent(0.142)  // "14%"  (rounds via toFixed(0): 14.2 → "14")
floatToPercent(0.145)  // "15%"  (rounds up: 14.5 → "15")
floatToPercent(1)      // "100%"
```

---

### formatDate

Formats an ISO date string into a human-readable date using the Ethiopian locale (`en-ET`).

**Signature**

```ts
function formatDate(value: string): string
```

**Examples**

```ts
formatDate('2024-01-15')             // "Jan 15, 2024"
formatDate('2024-12-31T00:00:00Z')   // "Dec 31, 2024"
formatDate('not-a-date')             // "not-a-date"  (returns input unchanged)
```

---

### UnderscoreToTitleCase

Converts a `snake_case` string to `Title Case`.

**Signature**

```ts
function UnderscoreToTitleCase(value: string): string
```

**Examples**

```ts
UnderscoreToTitleCase('first_name')       // "First Name"
UnderscoreToTitleCase('account_status')   // "Account Status"
UnderscoreToTitleCase('')                 // ""
```

---

### TitleCaseToUnderscore

Converts a `Title Case` string to `snake_case`.

**Signature**

```ts
function TitleCaseToUnderscore(value: string): string
```

**Examples**

```ts
TitleCaseToUnderscore('First Name')     // "first_name"
TitleCaseToUnderscore('Account Status') // "account_status"
TitleCaseToUnderscore('')               // ""
```

---

## Cookie Helpers

Import path: `@octave-org/ui` (re-exported from `libs/ui/src/utils/lib/cookies.ts`)

Thin wrappers around [`js-cookie`](https://github.com/js-cookie/js-cookie) for storing and clearing authentication tokens.

| Cookie key | Constant |
|---|---|
| Access token | `'accessToken'` |
| Refresh token | `'refreshToken'` |
| Auth user | `'auth_user'` |

---

### setTokens

Stores the access token (and optionally the refresh token) in browser cookies.

**Signature**

```ts
function setTokens(accessToken: string, refreshToken?: string): void
```

**Example**

```ts
import { setTokens } from '@octave-org/ui';

// After a successful login API call
setTokens(response.accessToken, response.refreshToken);
```

---

### getAccessToken

Retrieves the stored access token.

**Signature**

```ts
function getAccessToken(): string | undefined
```

**Example**

```ts
import { getAccessToken } from '@octave-org/ui';

const token = getAccessToken();
// Use in API request headers
headers: { Authorization: `Bearer ${token}` }
```

---

### getRefreshToken

Retrieves the stored refresh token.

**Signature**

```ts
function getRefreshToken(): string | undefined
```

---

### clearTokens

Removes all auth-related cookies (`accessToken`, `refreshToken`, `auth_user`). Call on logout.

**Signature**

```ts
function clearTokens(): void
```

**Example**

```ts
import { clearTokens } from '@octave-org/ui';

function handleLogout() {
  clearTokens();
  router.push('/auth/login');
}
```

---

## useBreakpoints

A React hook that returns boolean flags for the current viewport size.

**Signature**

```ts
function useBreakpoints(): {
  isMobile: boolean | undefined;
  isTablet: boolean | undefined;
  isDesktop: boolean | undefined;
}
```

| Flag | Media query | Typical use |
|---|---|---|
| `isMobile` | `max-width: 48em` (≤ 768 px) | Hide sidebars, stack layouts |
| `isTablet` | `48em – 75em` (768–1200 px) | Adjust grid columns |
| `isDesktop` | `min-width: 75em` (≥ 1200 px) | Show full navigation |

> Returns `undefined` on the server (SSR) and until the first paint on the client. Guard conditional renders accordingly.

### Example

```tsx
import { useBreakpoints } from '@octave-org/ui';

function ResponsiveCard() {
  const { isMobile, isTablet } = useBreakpoints();

  return (
    <div style={{ padding: isMobile ? 8 : 24 }}>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```
