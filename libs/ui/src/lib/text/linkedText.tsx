import { Anchor, AnchorProps, Text, TextProps } from '@mantine/core';
import Link from 'next/link';

export interface OctaveLinkedTextProps {
  label: string;
  link: string;
  linkLabel: string;
  baseTextProps?: TextProps;
  baseAnchorProps?: AnchorProps;
}

export function OctaveLinkedText({
  label,
  link,
  linkLabel,
  baseTextProps,
  baseAnchorProps,
}: OctaveLinkedTextProps) {
  return (
    <Text size="xs" {...baseTextProps}>
      {label}
      <Anchor
        href={link}
        component={Link}
        inherit
        underline="always"
        {...baseAnchorProps}
      >
        {linkLabel}
      </Anchor>
    </Text>
  );
}
