import { useState } from 'react';
import { IconChevronRight, IconProps } from '@tabler/icons-react';
import {
  Box,
  Collapse,
  Group,
  Menu,
  ThemeIcon,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';

export interface OctaveLinksGroupProps {
  icon: React.FC<IconProps>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string; active?: boolean; hidden?: boolean }[];
  active?: boolean;
  shellOpened?: boolean;
}

export function OctaveLinksGroup({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
  active,
  shellOpened,
}: OctaveLinksGroupProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [controlHovered, setControlHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const isDark = colorScheme === 'dark';
  const isActiveTree =
    active || links?.find((link) => link.active) !== undefined;

  const NavBtnStates = (isActiveTree: boolean, controlHovered: boolean) =>
    controlHovered ? 'transparent' : isActiveTree ? 'light' : 'default';

  const items = (hasLinks ? links : []).map((link) => (
    <UnstyledButton
      component={Link}
      href={link.link}
      key={link.label}
      onMouseEnter={() => setHoveredLink(link.label)}
      onMouseLeave={() => setHoveredLink(null)}
      style={{
        display: link.hidden ? 'none' : 'block',
        textDecoration: 'none',
        fontWeight: 500,
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        paddingLeft: theme.spacing.md,
        marginLeft: theme.spacing.xl,
        fontSize: theme.fontSizes.sm,
        borderLeft: `${link.active ? '2px' : '1px'} solid ${
          link.active
            ? theme.colors.primary[6]
            : isDark
              ? theme.colors.dark[4]
              : theme.colors.gray[3]
        }`,
        color: link.active ? theme.colors.primary[6] : undefined,
        backgroundColor:
          hoveredLink === link.label
            ? isDark
              ? theme.colors.dark[6]
              : theme.colors.gray[1]
            : 'transparent',
      }}
    >
      {link.label}
    </UnstyledButton>
  ));

  const menuItems = (hasLinks ? links : []).map((link) => (
    <Menu.Item
      component={Link}
      href={link.link}
      key={link.label}
      style={{
        display: link.hidden ? 'none' : 'block',
        color: link.active ? theme.colors.primary[6] : undefined,
      }}
    >
      {link.label}
    </Menu.Item>
  ));

  const control = (
    <UnstyledButton
      component={hasLinks ? undefined : Link}
      href={link || '#'}
      onClick={() => (shellOpened ? setOpened((o) => !o) : null)}
      onMouseEnter={() => setControlHovered(true)}
      onMouseLeave={() => setControlHovered(false)}
      style={{
        display: 'block',
        width: '100%',
        fontWeight: 500,
        borderRadius: theme.spacing.xs,
        padding: `${theme.spacing.xs}`,
        fontSize: theme.fontSizes.sm,
        color: isDark ? 'white' : 'black',
        backgroundColor: controlHovered
          ? isDark
            ? theme.colors.dark[6]
            : theme.colors.primary[0]
          : 'transparent',
      }}
    >
      <Group
        justify={shellOpened ? 'space-between' : 'center'}
        gap={shellOpened ? 'space-between' : 'center'}
      >
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeIcon
            variant={NavBtnStates(isActiveTree, controlHovered)}
            size={35}
          >
            <Icon size={18} />
          </ThemeIcon>
          {shellOpened && <Box ml="md">{label}</Box>}
        </Box>
        {hasLinks && shellOpened && (
          <IconChevronRight
            stroke={1.5}
            size={16}
            style={{
              transform: opened ? 'rotate(-90deg)' : 'none',
              transition: 'transform 200ms ease',
            }}
          />
        )}
      </Group>
    </UnstyledButton>
  );

  return (
    <>
      {hasLinks && !shellOpened ? (
        <Menu trigger="hover" position="right-start" offset={15} width={200}>
          <Menu.Target>{control}</Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{label}</Menu.Label>
            {menuItems}
          </Menu.Dropdown>
        </Menu>
      ) : !shellOpened ? (
        <Tooltip
          label={label}
          position="right"
          offset={15}
          withArrow
          bg={isDark ? 'dark.6' : 'white'}
          c={isDark ? 'white' : 'black'}
          style={{
            border: `1px solid ${
              isDark ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
            fontSize: theme.fontSizes.xs,
            fontWeight: 500,
          }}
        >
          {control}
        </Tooltip>
      ) : (
        control
      )}
      {hasLinks && shellOpened && <Collapse in={opened}>{items}</Collapse>}
    </>
  );
}
