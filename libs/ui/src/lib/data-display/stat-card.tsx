import {
  Card,
  Flex,
  Stack,
  Text,
  TextProps,
  Title,
  TitleProps,
  useMantineColorScheme,
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
  color: string;
  icon: React.FC<IconProps>;
  colorMap?: Record<OctaveStatCardDirection, string>;
  titleProps?: TextProps;
  descriptionProps?: TextProps;
  valueProps?: TitleProps;
}

export function OctaveStatCard(props: OctaveStatCardProps) {
  const { colorScheme } = useMantineColorScheme();
  const { titleProps, descriptionProps, valueProps } = props;
  const Icon = props.icon;
  return (
    <Card withBorder bg={`${props.color || 'white'}.0`}>
      <Stack>
        <Flex justify="space-between">
          {Icon && (
            <Icon
              color={colorScheme === 'dark' ? props.color : 'black'}
              size={50}
            />
          )}

          <Flex align="center" gap="xs">
            {props.direction &&
              props.direction !== 'neutral' &&
              (props.direction === 'up' ? (
                <IconArrowUp size={20} color={props.colorMap?.up || 'green'} />
              ) : props.direction === 'down' ? (
                <IconArrowDown
                  size={20}
                  color={props.colorMap?.down || 'red'}
                />
              ) : (
                <IconArrowDown size={20} color="red" />
              ))}
            <Title
              c={colorScheme === 'dark' ? props.color : 'black'}
              {...valueProps}
            >
              {props.isValuePercent
                ? `${floatToPercent(props.value)}`
                : props.value}
            </Title>
          </Flex>
        </Flex>
        <Stack gap="xs">
          <Text
            c={colorScheme === 'dark' ? props.color : 'black'}
            fw={900}
            {...titleProps}
          >
            {props.title}
          </Text>
          <Text
            c={colorScheme === 'dark' ? 'black' : 'dimmed'}
            size="xs"
            {...descriptionProps}
          >
            {props.description}
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
}
