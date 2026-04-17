import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Card,
  Divider,
  Flex,
  Loader,
  Menu,
  ScrollArea,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
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
import { OctaveLinksGroup, OctaveLinksGroupProps } from './nav-links';
import { useBreakpoints } from '../../utils';
import { ThemeTrigger } from '../theme';
import { OctaveBranding, useOctaveBranding } from '../branding';
import AuthGuard, { AuthGuardProps } from '../guards/auth.guard';
import { useEffect, useState } from 'react';

export type OctaveShellProps = {
  disablePadding?: boolean;
  disabled?: boolean;
  disableAuth?: boolean;
  authLoadingFallback?: React.ReactNode;
  title?: string;
  description?: string;
  hasBack?: boolean;
  authGuardProps?: Omit<AuthGuardProps, 'children'>;
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
  user,
  menu,
  branding,
}: {
  children: React.ReactNode;
  props: OctaveShellProps;
  title?: string;
  subTitle?: string;
  menu: OctaveLinksGroupProps[];
  branding?: OctaveBranding;
  user?: {
    fullName: string;
    contact: string;
    logout: () => void;
  };
}) {
  const [mounted, setMounted] = useState(false);
  const [isAuthGuardLoading, setIsAuthGuardLoading] = useState(true);
  const [opened, { toggle }] = useDisclosure(true);
  const theme = useMantineTheme();
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const appBranding = useOctaveBranding(branding);
  const { isMobile } = useBreakpoints();
  const optimalHeight = `calc(100vh - 60px)`;

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  const icon = {
    dark: <IconSun size={18} />,
    light: <IconMoon size={18} />,
  };

  const links = menu.map((item: OctaveLinksGroupProps) => (
    <OctaveLinksGroup shellOpened={opened} {...item} key={item.label} />
  ));

  const shouldDisableAuth = props.disableAuth ?? false;
  const isEffectiveAuthLoading = shouldDisableAuth ? false : isAuthGuardLoading;
  const isShellDisabled = !!props.disabled || isEffectiveAuthLoading;

  const defaultAuthLoadingFallback = (
    <Stack h="100vh" w="100%" align="center" justify="center" gap="xs">
      <Loader type="bars" size="xl" />
    </Stack>
  );

  const resolvedAuthLoadingFallback =
    props.authGuardProps?.loadingFallback ??
    props.authLoadingFallback ??
    defaultAuthLoadingFallback;

  const handleAuthLoadingStateChange = (isLoading: boolean) => {
    setIsAuthGuardLoading(isLoading);
    props.authGuardProps?.onLoadingStateChange?.(isLoading);
  };

  const shellContent = shouldDisableAuth ? (
    children
  ) : (
    <AuthGuard
      {...props.authGuardProps}
      loadingFallback={resolvedAuthLoadingFallback}
      onLoadingStateChange={handleAuthLoadingStateChange}
    >
      {children}
    </AuthGuard>
  );

  const NavLogo = () => (
    <Flex gap="xs" align="center">
      {((opened && isMobile) || !isMobile) && appBranding.logo}
      {(opened || isMobile) && (
        <Stack gap={0}>
          <Text fw={600}>{title ?? appBranding.companyName}</Text>
          <Text size="xs" c="dimmed">
            {subTitle ?? appBranding.slogan}
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
            radius={theme.defaultRadius}
            size="md"
            variant="filled"
            color="primary"
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
              rightSection={
                mounted ? (
                  icon[colorScheme as 'light' | 'dark']
                ) : (
                  <IconSun size={15} />
                )
              }
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
      disabled={isShellDisabled}
      header={{ height: isMobile ? 80 : 0 }}
      padding={props.disablePadding ? 0 : 'md'}
      navbar={{
        width: !opened ? 85 : 350,
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
      <AppShell.Navbar p="xs" pt={0} withBorder={false}>
        <ActionIcon
          display={!isMobile ? undefined : 'none'}
          onClick={toggle}
          size="sm"
          radius={100}
          pos="absolute"
          right={-10}
          top={34}
          style={{ zIndex: 10 }}
          variant="light"
        >
          <Card style={{ borderWidth: 2 }} radius={100} withBorder p={0}>
            <Stack>
              {opened ? (
                <IconChevronLeft size={15} />
              ) : (
                <IconChevronRight size={15} />
              )}
            </Stack>
          </Card>
        </ActionIcon>

        <AppShell.Section p="xs">
          <Stack
            w="100%"
            h={65}
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
        <AppShell.Section pt="xs" grow>
          <ScrollArea type="never" h={`calc(${optimalHeight} - 120px)`}>
            {links}
          </ScrollArea>
        </AppShell.Section>
        <Divider />
        <AppShell.Section h={60} w="100%" px="xs">
          <Stack
            w="100%"
            h={70}
            justify="center"
            align={opened ? 'flex-start' : 'center'}
          >
            {UserAcc()}
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main
        bg={
          isShellDisabled
            ? undefined
            : mounted && colorScheme === 'dark'
              ? 'dark'
              : 'gray.1'
        }
      >
        <ScrollArea
          type="never"
          h={
            isMobile
              ? `calc(${optimalHeight} - 120px)`
              : props.disablePadding || isShellDisabled
                ? '100vh'
                : '96vh'
          }
        >
          {shellContent}
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}
