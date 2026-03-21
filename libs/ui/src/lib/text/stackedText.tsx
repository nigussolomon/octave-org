import { Stack, Text, TextProps } from '@mantine/core';

export interface OctaveStackedTextProps {
  title: string;
  description: string;
  titleProps?: TextProps;
  descProps?: TextProps;
}

export function OctaveStackedText({
  title,
  description,
  titleProps,
  descProps,
}: OctaveStackedTextProps) {
  return (
    <Stack gap={0}>
      <Text size="xl" fw={700} {...titleProps}>
        {title}
      </Text>
      <Text mt={-5} size="xs" c="dimmed" {...descProps}>
        {description}
      </Text>
    </Stack>
  );
}
