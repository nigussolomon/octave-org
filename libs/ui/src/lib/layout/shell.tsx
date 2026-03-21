import {
  ActionIcon,
  AppShell,
  Avatar,
  Card,
  Divider,
  Flex,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronLeft,
  IconChevronRight,
  IconLogout,
} from '@tabler/icons-react';
import { NextPage } from 'next/dist/types';
import { LinksGroup, LinksGroupProps } from './nav-links';

export type OctaveShellProps = {
  disablePadding?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;
  hasBack?: boolean;
};

export type OctavePageProps<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> &
  OctaveShellProps;

export function OctaveShell({
  children,
  props,
  title,
  subTitle,
  logo,
  user,
  menu,
}: {
  children: React.ReactNode;
  props: OctaveShellProps;
  title: string;
  subTitle: string;
  logo?: React.ReactNode;
  menu: LinksGroupProps[];
  user?: {
    fullName: string;
    contact: string;
    logout: () => void;
  };
}) {
  const [opened, { toggle }] = useDisclosure();

  const links = menu.map((item: LinksGroupProps) => (
    <LinksGroup shellOpened={opened} {...item} key={item.label} />
  ));

  return (
    <AppShell
      layout="alt"
      disabled={props.disabled}
      padding={props.disablePadding ? 0 : 'md'}
      navbar={{
        width: !opened ? 80 : 300,
        breakpoint: 'sm',
        collapsed: {
          desktop: false,
          mobile: !opened,
        },
      }}
    >
      <AppShell.Navbar>
        <ActionIcon
          onClick={toggle}
          radius={100}
          pos="absolute"
          right={-15}
          top={28}
          style={{ zIndex: 10 }}
          variant="light"
        >
          <Card style={{ borderWidth: 2 }} radius={100} withBorder p={0}>
            <Stack>
              {opened ? (
                <IconChevronLeft size={18} />
              ) : (
                <IconChevronRight size={18} />
              )}
            </Stack>
          </Card>
        </ActionIcon>
        <AppShell.Section px="sm">
          <Stack
            w="100%"
            h={80}
            justify="center"
            align={opened ? 'flex-start' : 'center'}
          >
            <Flex gap="xs" align="center">
              {logo}
              {opened && (
                <Stack gap={0}>
                  <Text fw={600}>{title}</Text>
                  <Text size="xs" c="dimmed">
                    {subTitle}
                  </Text>
                </Stack>
              )}
            </Flex>
          </Stack>
        </AppShell.Section>
        <Divider />
        <AppShell.Section grow>
          <ScrollArea type="never" h="calc(100vh - 160px)">
            {links}
          </ScrollArea>
        </AppShell.Section>
        <Divider />
        <AppShell.Section px="sm" h={80} w="100%">
          <Stack
            w="100%"
            h={80}
            justify="center"
            align={opened ? 'flex-start' : 'center'}
          >
            <Flex w="100%" gap="xs" justify="center" align="center">
              <Avatar
                size="md"
                radius="sm"
                name={user?.fullName || 'Nigus Solomon'}
              />
              {opened && (
                <Flex h="100%" w="100%" align="center" justify="space-between">
                  <Stack gap={0}>
                    <Text fw={600}>{user?.fullName}</Text>
                    <Text size="xs" c="dimmed">
                      {user?.contact}
                    </Text>
                  </Stack>
                  <ActionIcon
                    onClick={user?.logout}
                    size="xl"
                    variant="subtle"
                    color="red"
                  >
                    <IconLogout size={18} />
                  </ActionIcon>
                </Flex>
              )}
            </Flex>
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
