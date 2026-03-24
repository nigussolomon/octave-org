import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Card,
  Divider,
  Flex,
  Menu,
  ScrollArea,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronLeft,
  IconChevronRight,
  IconLogout,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { NextPage } from 'next/dist/types';
import { LinksGroup, LinksGroupProps } from './nav-links';
import { useBreakpoints } from '../../utils';
import { ThemeTrigger } from '../theme';

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
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const icon = {
    light: <IconSun size={18} />,
    dark: <IconMoon size={18} />,
  };
  const { isMobile } = useBreakpoints();

  const links = menu.map((item: LinksGroupProps) => (
    <LinksGroup shellOpened={opened} {...item} key={item.label} />
  ));

  const NavLogo = () => (
    <Flex gap="xs" align="center">
      {logo}
      {(opened || isMobile) && (
        <Stack gap={0}>
          <Text fw={600}>{title}</Text>
          <Text size="xs" c="dimmed">
            {subTitle}
          </Text>
        </Stack>
      )}
    </Flex>
  );

  const UserAcc = () => (
    <Flex
      w={isMobile && !opened ? undefined : '100%'}
      gap="xs"
      justify="center"
      align="center"
    >
      <Menu width={200}>
        <Menu.Target>
          <Avatar
            size="md"
            radius="sm"
            name={user?.fullName || 'Nigus Solomon'}
          />
        </Menu.Target>
        {(!opened || isMobile) && (
          <Menu.Dropdown>
            <Card p="xs">
              <Stack gap={0}>
                <Text size="xs" fw={600}>
                  {user?.fullName}
                </Text>
                <Text size="xs" c="dimmed">
                  {user?.contact}
                </Text>
              </Stack>
            </Card>
            <Menu.Divider />
            <Menu.Label>User Actions</Menu.Label>
            <Menu.Divider />
            <Menu.Item
              onClick={() =>
                setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
              }
              rightSection={icon[colorScheme as 'light' | 'dark']}
            >
              <Text size="xs">Toggle Theme</Text>
            </Menu.Item>
            <Menu.Item
              color="red"
              rightSection={<IconLogout size={15} />}
              onClick={user?.logout}
            >
              <Text size="xs">Logout</Text>
            </Menu.Item>
          </Menu.Dropdown>
        )}
      </Menu>
      {opened && (
        <Flex h="100%" w="100%" align="center" justify="space-between">
          <Stack gap={0}>
            <Text fw={600}>{user?.fullName}</Text>
            <Text size="xs" c="dimmed">
              {user?.contact}
            </Text>
          </Stack>
          <Flex align="center" gap="xs">
            <ThemeTrigger />
            <ActionIcon
              onClick={user?.logout}
              size="lg"
              variant="filled"
              color="red"
            >
              <IconLogout size={18} />
            </ActionIcon>
          </Flex>
        </Flex>
      )}
    </Flex>
  );

  return (
    <AppShell
      layout="alt"
      disabled={props.disabled}
      header={{ height: isMobile ? 80 : 0 }}
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
      <AppShell.Header display={isMobile ? undefined : 'none'}>
        <Flex px="md" h="100%" justify="space-between" align="center">
          <Flex h="100%" align="center" gap="xs">
            <Burger size="sm" opened={opened} onClick={toggle} />
            {NavLogo()}
          </Flex>
          {UserAcc()}
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar>
        <ActionIcon
          display={!isMobile ? undefined : 'none'}
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
            <Flex
              w="100%"
              align="center"
              justify={
                isMobile ? 'space-between' : opened ? 'flex-start' : 'center'
              }
            >
              {NavLogo()}
              <Burger
                size="sm"
                opened={opened}
                onClick={toggle}
                display={isMobile ? undefined : 'none'}
              />
            </Flex>
          </Stack>
        </AppShell.Section>
        <Divider />
        <AppShell.Section grow>
          <ScrollArea
            type="never"
            h={`calc(100vh - 160px ${isMobile ? ' - 80px' : ''})`}
          >
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
            {UserAcc()}
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
