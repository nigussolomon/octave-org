import { NotificationStylesNames } from '@mantine/core';
import { NotificationData, notifications } from '@mantine/notifications';
import {
  IconAlertOctagon,
  IconAlertTriangle,
  IconCheck,
  IconInfoSquare,
  IconProps,
} from '@tabler/icons-react';

interface NotificationProps {
  baseProps?: Omit<NotificationData, 'title' | 'message' | 'icon'>;
  title: string;
  description: string;
}

interface CommonProps {
  color: string;
  icon: React.FC<IconProps>;
}

const commonStyles = (
  color: string,
): Partial<Record<NotificationStylesNames, React.CSSProperties>> => ({
  root: {
    paddingLeft: '15px',
  },
  icon: {
    width: 30,
    height: 30,
    background: 'transparent',
  },
});

const radius = 'md';

function commonProps({
  color,
  icon: Icon,
}: CommonProps): Omit<NotificationData, 'title' | 'message'> {
  return {
    color: `var(--mantine-color-${color}-3)`,
    withBorder: true,
    radius,
    styles: commonStyles(color),
    icon: <Icon size={35} color={`var(--mantine-color-${color}-8)`} />,
  };
}

export function success(props: NotificationProps) {
  const { baseProps } = props;
  return notifications.show({
    ...commonProps({ color: 'green', icon: IconCheck }),
    title: props.title ?? 'Success Notification',
    message:
      props.description ?? 'This is a custom styled success Notification.',
    ...baseProps,
  });
}

export function info(props: NotificationProps) {
  const { baseProps } = props;
  return notifications.show({
    ...commonProps({ color: 'blue', icon: IconInfoSquare }),
    title: props.title ?? 'Info Notification',
    message: props.description ?? 'This is a custom styled info Notification.',
    ...baseProps,
  });
}

export function warning(props: NotificationProps) {
  const { baseProps } = props;
  return notifications.show({
    ...commonProps({ color: 'orange', icon: IconAlertTriangle }),
    title: props.title ?? 'Warning Notification',
    message:
      props.description ?? 'This is a custom styled warning Notification.',
    ...baseProps,
  });
}

export function error(props: NotificationProps) {
  const { baseProps } = props;
  return notifications.show({
    ...commonProps({ color: 'red', icon: IconAlertOctagon }),
    title: props.title ?? 'Error Notification',
    message: props.description ?? 'This is a custom styled error Notification.',
    ...baseProps,
  });
}
