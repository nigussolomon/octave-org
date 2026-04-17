import { Badge, BadgeProps, Card, Flex, Text, TextProps } from '@mantine/core';
import { IconInfoCircle, IconProps } from '@tabler/icons-react';

interface OctaveBadgeProps extends BadgeProps {
  label: string;
  labelProps?: TextProps;
}

export function OctaveBadge(props: OctaveBadgeProps) {
  const { label, labelProps, ...badgeProps } = props;
  return (
    <Flex>
      <Card
        h="fit-content"
        w="fit-content"
        withBorder
        style={{
          borderWidth: 2,
          borderColor: `var(--mantine-color-${props.color}-9)`,
        }}
        p={0}
        radius={props.radius}
      >
        <Badge px={'xs'} radius={0} size="xl" {...badgeProps} variant="light">
          <Text size="xs" fw={700} {...labelProps}>
            {label}
          </Text>
        </Badge>
      </Card>
    </Flex>
  );
}

interface OctaveStatusBadgeProps extends OctaveBadgeProps {
  colorMap: Record<string, string>;
  iconMap: Record<string, React.FC<IconProps>>;
}

export function OctaveStatusBadge(props: OctaveStatusBadgeProps) {
  const { colorMap, iconMap, ...badgeProps } = props;
  const color = colorMap[badgeProps.label] ?? 'blue';
  const Icon = iconMap[badgeProps.label] ?? IconInfoCircle;
  return (
    <OctaveBadge
      leftSection={<Icon size={18} />}
      {...badgeProps}
      color={color}
    />
  );
}
