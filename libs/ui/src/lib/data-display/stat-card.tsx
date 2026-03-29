import {
  Card,
  CardProps,
  Flex,
  Stack,
  Text,
  TextProps,
  ThemeIcon,
  Title,
  TitleProps,
} from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconProps } from '@tabler/icons-react';
import { floatToPercent } from '../../utils';

type OctaveStatCardDirection = 'up' | 'down' | 'neutral';

interface OctaveStatCardProps {
  title: string;
  description: string;
  value: number;
  isValuePercent?: boolean;
  direction?: OctaveStatCardDirection;
  color?: string;
  icon: React.FC<IconProps>;
  colorMap?: Record<OctaveStatCardDirection, string>;
  titleProps?: TextProps;
  descriptionProps?: TextProps;
  valueProps?: TitleProps;
  cardProps?: CardProps;
}

export function OctaveStatCard(props: OctaveStatCardProps) {
  const colorMap = props.colorMap || {
    up: 'green',
    down: 'red',
    neutral: 'primary',
  };
  const { titleProps, descriptionProps, valueProps } = props;
  const Icon = props.icon;
  return (
    <Card {...props.cardProps} p="xl" withBorder>
      <Stack>
        <Flex justify="space-between">
          <ThemeIcon size="xl">{Icon && <Icon size={25} />}</ThemeIcon>

          <Flex align="center" gap="xs">
            {props.direction && props.direction !== 'neutral' && (
              <ThemeIcon size="xs" color={colorMap?.[props.direction]}>
                {props.direction === 'up' ? (
                  <IconArrowUp size={12} />
                ) : props.direction === 'down' ? (
                  <IconArrowDown size={12} />
                ) : (
                  <IconArrowDown
                    size={20}
                    color={colorMap?.neutral || 'primary'}
                  />
                )}
              </ThemeIcon>
            )}

            <Title {...valueProps}>
              {props.isValuePercent
                ? `${floatToPercent(props.value)}`
                : props.value}
            </Title>
          </Flex>
        </Flex>
        <Stack gap={0} mt="xl">
          <Text fw={900} {...titleProps} size="xl">
            {props.title}
          </Text>
          <Text
            size="xs"
            {...descriptionProps}
            c="dimmed"
            truncate="end"
            lineClamp={1}
          >
            {props.description}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}
