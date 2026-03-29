import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Flex,
  Loader,
  Menu,
  MultiSelect,
  Pagination,
  PaginationProps,
  Stack,
  Table,
  Text,
  TextProps,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconEye,
  IconGripVertical,
  IconMenu2,
  IconTable,
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';

import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';

import {
  SortableContext,
  useSortable,
  arrayMove,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { useBreakpoints } from '../../utils';

export interface OctaveCol<T> {
  key: keyof T;
  label: string;
  labelProps?: TextProps;
  visible?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  headerActions?: React.ReactNode;
  tableDropdown?: React.ReactNode;
}

export interface OctaveTableProps<T> {
  data: T[];
  columns: OctaveCol<T>[];
  loading?: boolean;
  leftSection?: React.ReactNode;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    props?: PaginationProps;
  };
  idKey?: keyof T;
}

function EmptyTable() {
  return (
    <Stack w="100%" mih={150} justify="center" align="center">
      <IconTable size={50} color="gray" />
      <Text c="dimmed">Table is empty!</Text>
    </Stack>
  );
}

function LoadingTable() {
  return (
    <Stack w="100%" mih={150} justify="center" align="center">
      <Loader type="bars" />
      <Text size="xs" c="dimmed">
        Table is loading.
      </Text>
    </Stack>
  );
}

function SortableHeader<T>({
  col,
  toggleHide,
  visibleColumns,
}: {
  col: OctaveCol<T>;
  toggleHide: (key: string) => void;
  visibleColumns: OctaveCol<T>[];
}) {
  const { colorScheme } = useMantineColorScheme();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: col.key as string });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Table.Th py="sm" ref={setNodeRef} {...attributes} style={{ ...style }}>
      <Flex gap="md" justify="space-between" align="center">
        <Flex align="center" gap={8}>
          <ActionIcon
            {...listeners}
            variant="transparent"
            color="dark"
            size="sm"
          >
            <IconGripVertical size={14} />
          </ActionIcon>
          <Text
            fw={500}
            size="sm"
            {...col.labelProps}
            c={colorScheme === 'dark' ? 'white' : 'black'}
          >
            {col.label}
          </Text>
        </Flex>

        <Flex gap="xs" align="center">
          {visibleColumns.length > 1 && (
            <ActionIcon
              onClick={() => toggleHide(col.key as string)}
              variant="default"
              size="md"
            >
              <IconEye size={12} />
            </ActionIcon>
          )}
          {col.headerActions && (
            <Menu width={200}>
              <Menu.Target>
                <ActionIcon variant="default">
                  <IconMenu2 size={12} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>{col.headerActions}</Menu.Dropdown>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Table.Th>
  );
}

export function OctaveTable<T>({
  data,
  columns,
  loading,
  idKey,
  pagination,
  leftSection,
}: OctaveTableProps<T>) {
  const { isMobile } = useBreakpoints();
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.key as string),
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const orderedColumns = useMemo(() => {
    return columnOrder
      .map((key) => columns.find((c) => c.key === key))
      .filter(Boolean) as OctaveCol<T>[];
  }, [columnOrder, columns]);

  const visibleColumns = orderedColumns.filter(
    (col) =>
      col.visible !== false && !hiddenColumns.includes(col.key as string),
  );

  const toggleHide = (key: string) => {
    setHiddenColumns((prev) =>
      prev.includes(key) ? prev.filter((i) => i !== key) : [...prev, key],
    );
  };

  if (isMobile) {
    if (loading) {
      return <LoadingTable />;
    }
    if (data?.length === 0) {
      return <EmptyTable />;
    }
    return data?.map((d: T) => (
      <Stack>
        <Card p={0} withBorder>
          <Table
            variant="vertical"
            layout="fixed"
            horizontalSpacing="md"
            withRowBorders
          >
            <Table.Tbody>
              {visibleColumns?.map((col) => (
                <Table.Tr key={col.key as string}>
                  <Table.Th w={160}>{col.label}</Table.Th>
                  <Table.Td key={col.key as string}>
                    {col.render
                      ? col.render(d[col.key], d)
                      : (d[col.key] as React.ReactNode)}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
        <Flex justify="center">
          {pagination && (
            <Pagination size="xs" {...pagination} {...pagination.props} />
          )}
        </Flex>
      </Stack>
    ));
  }

  return (
    <Stack>
      <Flex align="center" justify="space-between">
        <div>{leftSection}</div>
        {hiddenColumns.length > 0 && (
          <MultiSelect
            miw={200}
            label="Hidden columns"
            data={columns.map((col) => ({
              value: col.key as string,
              label: col.label,
            }))}
            value={hiddenColumns}
            onChange={setHiddenColumns}
          />
        )}
      </Flex>

      <Card p={0} withBorder>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;

            if (over && active.id !== over.id) {
              setColumnOrder((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                return arrayMove(items, oldIndex, newIndex);
              });
            }
          }}
        >
          <Table verticalSpacing="xs" horizontalSpacing="md" withRowBorders>
            <Table.Thead>
              <SortableContext
                items={visibleColumns.map((c) => c.key as string)}
                strategy={horizontalListSortingStrategy}
              >
                <Table.Tr>
                  {visibleColumns.map((col) => (
                    <SortableHeader
                      key={col.key as string}
                      col={col}
                      visibleColumns={visibleColumns}
                      toggleHide={toggleHide}
                    />
                  ))}
                </Table.Tr>
              </SortableContext>
            </Table.Thead>

            <Table.Tbody>
              {loading ? (
                <Table.Tr>
                  <Table.Td colSpan={visibleColumns.length}>
                    <LoadingTable />
                  </Table.Td>
                </Table.Tr>
              ) : data.length > 0 ? (
                data.map((row, idx) => (
                  <Table.Tr key={idKey ? String(row[idKey]) : String(idx)}>
                    {visibleColumns.map((col) => (
                      <Table.Td key={col.key as string}>
                        {col.render
                          ? col.render(row[col.key], row)
                          : (row[col.key] as React.ReactNode)}
                      </Table.Td>
                    ))}
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={visibleColumns.length}>
                    <EmptyTable />
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </DndContext>
      </Card>
      {pagination && (
        <Card withBorder>
          <Flex align="center" justify="space-between">
            <Flex gap="md" align="center">
              <Text size="xs" fw={500}>
                {pagination.total} items
              </Text>
              <Divider orientation="vertical" />
              <Text size="xs">
                Page {pagination.page} of {pagination.total}
              </Text>
            </Flex>
            {pagination && <Pagination {...pagination} {...pagination.props} />}
          </Flex>
        </Card>
      )}
    </Stack>
  );
}
