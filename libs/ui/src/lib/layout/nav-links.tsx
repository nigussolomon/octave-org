import { useState } from 'react';
import { IconChevronRight, IconProps } from '@tabler/icons-react';
import {
  Box,
  Collapse,
  Group,
  ThemeIcon,
  UnstyledButton,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';

export interface LinksGroupProps {
  icon: React.FC<IconProps>;
  label: string;
  link?: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  shellOpened?: boolean;
}

export function LinksGroup({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  links,
  shellOpened,
}: LinksGroupProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [controlHovered, setControlHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const isDark = colorScheme === 'dark';
  const items = (hasLinks ? links : []).map((link) => (
    <UnstyledButton
      component={Link}
      href={link.link}
      key={link.label}
      onMouseEnter={() => setHoveredLink(link.label)}
      onMouseLeave={() => setHoveredLink(null)}
      style={{
        display: 'block',
        textDecoration: 'none',
        fontWeight: 500,
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        paddingLeft: theme.spacing.md,
        marginLeft: theme.spacing.xl,
        fontSize: theme.fontSizes.sm,
        color: isDark ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `1px solid ${
          isDark ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        backgroundColor:
          hoveredLink === link.label
            ? isDark
              ? theme.colors.dark[7]
              : theme.colors.gray[0]
            : 'transparent',
      }}
    >
      {link.label}
    </UnstyledButton>
  ));

  return (
    <>
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
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          fontSize: theme.fontSizes.sm,
          color: isDark ? theme.white : theme.black,
          backgroundColor: controlHovered
            ? isDark
              ? theme.colors.dark[7]
              : theme.colors.gray[0]
            : 'transparent',
        }}
      >
        <Group justify={shellOpened ? 'space-between' : 'center'} gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={35}>
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
      {hasLinks && shellOpened && <Collapse in={opened}>{items}</Collapse>}
    </>
  );
}
