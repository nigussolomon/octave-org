# Layout Components

Application-level shell and navigation link components.

---

## OctaveShell

A complete application shell built on Mantine's `AppShell`. It provides a collapsible sidebar navigation, a sticky header (mobile only), a scrollable navigation area, and a user-profile menu with theme toggle and logout.

### OctaveShellProps

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `disablePadding` | `boolean` | ❌ | `false` | When `true`, sets the main content area padding to `0`. |
| `disabled` | `boolean` | ❌ | `false` | Disables the entire AppShell (hides navbar and header). |
| `title` | `string` | ❌ | `undefined` | Page-level title shown in the browser tab / page heading. |
| `description` | `string` | ❌ | `undefined` | Page-level description (available for SEO / meta use). |
| `hasBack` | `boolean` | ❌ | `false` | Reserved flag — can be used by pages to indicate a back-navigation option. |

### OctaveShell Component Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `children` | `React.ReactNode` | ✅ | – | Main page content rendered inside `AppShell.Main`. |
| `props` | `OctaveShellProps` | ✅ | – | Page-level shell options (see above). |
| `title` | `string` | ❌ | branding default | Application / brand name shown in the navbar logo area. Overrides `branding.companyName`. |
| `subTitle` | `string` | ❌ | branding default | Tagline or version string shown below the brand name. Overrides `branding.slogan`. |
| `branding` | `OctaveBranding` | ❌ | `undefined` | Branding overrides (`companyName`, `slogan`, `logo`) for this shell instance. Falls back to the `OctaveProvider` branding context. |
| `menu` | `OctaveLinksGroupProps[]` | ✅ | – | Navigation items (see [OctaveLinksGroup](#octavelinksgroup)). |
| `user.fullName` | `string` | ❌ | `'Nigus Solomon'` (placeholder) | User's display name in the profile menu. |
| `user.contact` | `string` | ❌ | – | User's email or phone shown below the name. |
| `user.logout` | `() => void` | ❌ | – | Callback fired when the user clicks "Logout". |

### Sidebar behaviour

| State | Width | Trigger |
|---|---|---|
| Collapsed (desktop) | `80 px` | Click the chevron toggle |
| Expanded (desktop) | `300 px` | Click the chevron toggle |
| Mobile | Drawer overlay | Burger icon in the header |

### Example

```tsx
import { OctaveShell, OctaveLinksGroupProps, OctaveBranding } from '@octave-org/ui';
import { IconDashboard, IconGalaxy, IconUsers, IconSettings } from '@tabler/icons-react';
import { ThemeIcon } from '@mantine/core';

const branding: OctaveBranding = {
  companyName: 'Acme Corp',
  slogan: 'Admin Panel',
  logo: <ThemeIcon size={50}><IconGalaxy /></ThemeIcon>,
};

const menu: OctaveLinksGroupProps[] = [
  { icon: IconDashboard, label: 'Dashboard', link: '/dashboard' },
  {
    icon: IconUsers,
    label: 'Users',
    links: [
      { label: 'All Users', link: '/users', active: true },
      { label: 'Roles', link: '/users/roles' },
    ],
  },
  { icon: IconSettings, label: 'Settings', link: '/settings' },
];

export default function DashboardLayout({ children }) {
  return (
    <OctaveShell
      branding={branding}
      menu={menu}
      user={{
        fullName: 'Alice Johnson',
        contact: 'alice@acme.com',
        logout: () => signOut(),
      }}
      props={{ disablePadding: false }}
    >
      {children}
    </OctaveShell>
  );
}
```

---

## OctaveLinksGroup

A single navigation item in the sidebar. Supports a direct link or an expandable group of nested links.

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | `React.FC<IconProps>` | ✅ | – | Tabler icon displayed in a `ThemeIcon` tile. |
| `label` | `string` | ✅ | – | Navigation item text (only visible when the shell is expanded). |
| `link` | `string` | ❌ | `'#'` | Target URL used when `links` is **not** provided. Rendered as a Next.js `Link`. |
| `links` | `{ label: string; link: string; active?: boolean; hidden?: boolean }[]` | ❌ | `undefined` | Child links. When present, the item becomes a collapsible group instead of a direct link. Set `active: true` to highlight the current route; set `hidden: true` to hide a link without removing it. |
| `active` | `boolean` | ❌ | `false` | Marks this top-level item (or its subtree) as active, highlighting the icon tile. |
| `initiallyOpened` | `boolean` | ❌ | `false` | When `true`, the child link group is expanded on first render. |
| `shellOpened` | `boolean` | ❌ | `false` | Passed automatically by `OctaveShell` — controls whether labels and child links are visible. Do not set manually. |

> `OctaveLinksGroup` is consumed internally by `OctaveShell` but can also be used standalone inside a custom navbar.

### Example

```tsx
import { OctaveLinksGroup } from '@octave-org/ui';
import { IconReportAnalytics, IconChartPie } from '@tabler/icons-react';

// Simple link
<OctaveLinksGroup
  icon={IconChartPie}
  label="Analytics"
  link="/analytics"
  active
  shellOpened={true}
/>

// Expandable group with active child and hidden link
<OctaveLinksGroup
  icon={IconReportAnalytics}
  label="Reports"
  initiallyOpened
  shellOpened={true}
  links={[
    { label: 'Monthly', link: '/reports/monthly', active: true },
    { label: 'Quarterly', link: '/reports/quarterly' },
    { label: 'Annual', link: '/reports/annual', hidden: true },
  ]}
/>
```
