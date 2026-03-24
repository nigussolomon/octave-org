import {
  Card,
  CardProps,
  Divider,
  DividerProps,
  Flex,
  FlexProps,
} from '@mantine/core';
import { OctaveStackedText, OctaveStackedTextProps } from '../text';
import { IconProps } from '@tabler/icons-react';

interface OctaveBannerProps {
  cardProps?: CardProps;
  dividerProps?: DividerProps;
  stackedTextProps: OctaveStackedTextProps;
  flexProps?: FlexProps;
  icon: React.FC<IconProps>;
  iconProps?: IconProps;
  actions?: React.ReactNode;
}

export function OctaveBanner(props: OctaveBannerProps) {
  const {
    cardProps,
    dividerProps,
    stackedTextProps,
    flexProps,
    icon: Icon,
    iconProps,
    actions,
  } = props;

  return (
    <Card {...cardProps}>
      <Flex justify="space-between" align="center" wrap="wrap" gap="md">
        <Flex gap="xs" align="center" {...flexProps}>
          <Icon
            size={30}
            stroke={1}
            color={(cardProps?.bg as string)?.split('.')[0] || undefined}
            {...iconProps}
          />
          <Divider
            color={(cardProps?.bg as string)?.split('.')[0] || 'gray'}
            orientation="vertical"
            {...dividerProps}
          />
          <OctaveStackedText {...stackedTextProps} />
        </Flex>
        {actions}
      </Flex>
    </Card>
  );
}
