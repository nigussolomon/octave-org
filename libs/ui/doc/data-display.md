# Data Display Components

Components for presenting data to the user: badges, banners, statistic cards, and a full-featured data table.

---

## OctaveBadge

A styled badge built on Mantine's `Badge` that adds a visible border whose color matches the badge's own color.

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | `string` | ✅ | – | Text displayed inside the badge. |
| `labelProps` | `TextProps` | ❌ | `undefined` | Mantine `Text` props applied to the label. |
| `color` | `string` | ❌ | Mantine default | Color key from the Mantine palette (e.g. `"blue"`, `"red"`). Also controls the border color. |
| `radius` | `MantineRadius` | ❌ | `"md"` | Border radius for both the outer card and the badge. |
| `...rest` | `BadgeProps` | ❌ | – | Any additional [Mantine Badge props](https://mantine.dev/core/badge/). |

### Example

```tsx
import { OctaveBadge } from '@octave-org/ui';

<OctaveBadge label="Active" color="green" />

<OctaveBadge
  label="Pending"
  color="orange"
  radius="xl"
  labelProps={{ fw: 800 }}
/>
```

---

## OctaveStatusBadge

Extends `OctaveBadge` with dynamic color and icon resolution based on the badge's `label` value. Useful for representing status fields from an API.

### Props

Inherits all [OctaveBadge](#octavebadge) props plus:

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `colorMap` | `Record<string, string>` | ✅ | – | Maps label values to Mantine color keys. Falls back to `"blue"` for unknown labels. |
| `iconMap` | `Record<string, React.FC<IconProps>>` | ✅ | – | Maps label values to Tabler icon components. Falls back to `IconInfoCircle`. |

### Example

```tsx
import { OctaveStatusBadge } from '@octave-org/ui';
import { IconCheck, IconX, IconClock } from '@tabler/icons-react';

const colorMap = {
  Active: 'green',
  Inactive: 'red',
  Pending: 'orange',
};

const iconMap = {
  Active: IconCheck,
  Inactive: IconX,
  Pending: IconClock,
};

<OctaveStatusBadge
  label="Active"
  colorMap={colorMap}
  iconMap={iconMap}
/>

<OctaveStatusBadge
  label="Pending"
  colorMap={colorMap}
  iconMap={iconMap}
/>
```

---

## OctaveStatCard

A KPI / metric card displaying a value, title, description, directional indicator (up / down), and a large icon.

### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | `string` | ✅ | – | Short metric name displayed below the value. |
| `description` | `string` | ✅ | – | Supplementary description text. |
| `value` | `number` | ✅ | – | Numeric value to display. |
| `color` | `string` | ❌ | `undefined` | Mantine color key used for the card background (`color.0`) and text colors. |
| `icon` | `React.FC<IconProps>` | ✅ | – | Large Tabler icon shown in the top-left. |
| `isValuePercent` | `boolean` | ❌ | `false` | When `true`, formats the value as a percentage using `floatToPercent`. |
| `direction` | `'up' \| 'down' \| 'neutral'` | ❌ | `undefined` | Shows an arrow indicator. `'neutral'` hides the arrow. |
| `colorMap` | `Record<'up' \| 'down' \| 'neutral', string>` | ❌ | `{ up: 'green', down: 'red' }` | Override the arrow colors. |
| `titleProps` | `TextProps` | ❌ | `undefined` | Extra props for the title `Text`. |
| `descriptionProps` | `TextProps` | ❌ | `undefined` | Extra props for the description `Text`. |
| `valueProps` | `TitleProps` | ❌ | `undefined` | Extra props for the value `Title`. |

### Example

```tsx
import { OctaveStatCard } from '@octave-org/ui';
import { IconUsers } from '@tabler/icons-react';

// Basic usage
<OctaveStatCard
  title="Total Users"
  description="Registered users this month"
  value={1240}
  color="blue"
  icon={IconUsers}
/>

// With direction and percentage
<OctaveStatCard
  title="Conversion Rate"
  description="vs last month"
  value={0.142}
  isValuePercent
  direction="up"
  color="green"
  icon={IconUsers}
  colorMap={{ up: 'teal', down: 'red', neutral: 'gray' }}
/>
```

---

## OctaveTable

A full-featured data table with drag-and-drop column reordering, column visibility toggling, custom cell rendering, pagination, and a responsive mobile layout.

### OctaveCol\<T\>

Configuration object that describes a single column.

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `key` | `keyof T \| 'actions'` | ✅ | – | The property key from the row data object to display. Use `'actions'` for a column that renders row-level action controls. |
| `label` | `string` | ✅ | – | Column header text. |
| `labelProps` | `TextProps` | ❌ | `undefined` | Extra `Text` props for the header label. |
| `visible` | `boolean` | ❌ | `true` | Set to `false` to hide the column initially. |
| `render` | `(value: T[keyof T], row: T) => React.ReactNode` | ❌ | `undefined` | Custom renderer for a cell. Receives the cell value and the full row. |
| `headerActions` | `React.ReactNode` | ❌ | `undefined` | Content rendered inside a dropdown menu attached to the column header. |
| `tableDropdown` | `React.ReactNode` | ❌ | `undefined` | Reserved slot for future row-level dropdown actions. |

### OctaveTableProps\<T\>

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | `T[]` | ✅ | – | Array of row data objects. |
| `columns` | `OctaveCol<T>[]` | ✅ | – | Column definitions (see `OctaveCol` above). |
| `loading` | `boolean` | ❌ | `false` | Shows a loading spinner in place of rows. |
| `leftSection` | `React.ReactNode` | ❌ | `undefined` | Content rendered to the left of the column-visibility multi-select. |
| `idKey` | `keyof T` | ❌ | row index | Property used as the React `key` for each row. |
| `pagination.total` | `number` | ❌ | – | Total number of items (used in the pagination footer label). |
| `pagination.page` | `number` | ❌ | – | Current page number (1-based). |
| `pagination.pageSize` | `number` | ❌ | – | Number of items per page. |
| `pagination.onPageChange` | `(page: number) => void` | ❌ | – | Callback fired when the user changes the page. |
| `pagination.props` | `PaginationProps` | ❌ | `undefined` | Extra [Mantine Pagination props](https://mantine.dev/core/pagination/). |

### Example

```tsx
import { OctaveTable, OctaveCol } from '@octave-org/ui';
import { OctaveStatusBadge } from '@octave-org/ui';
import { IconCheck, IconX } from '@tabler/icons-react';

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

const columns: OctaveCol<User>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Full Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <OctaveStatusBadge
        label={value as string}
        colorMap={{ Active: 'green', Inactive: 'red' }}
        iconMap={{ Active: IconCheck, Inactive: IconX }}
      />
    ),
  },
];

const data: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', status: 'Active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', status: 'Inactive' },
];

// Basic table
<OctaveTable data={data} columns={columns} idKey="id" />

// With pagination
<OctaveTable
  data={data}
  columns={columns}
  idKey="id"
  loading={false}
  pagination={{
    total: 50,
    page: 1,
    pageSize: 10,
    onPageChange: (page) => console.log('Page changed to', page),
  }}
/>
```
