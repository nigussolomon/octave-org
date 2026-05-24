import { Button, ButtonProps, Text, TextProps } from '@mantine/core';
import Link from 'next/link';
import { useBreakpoints } from '../../utils';

export type OctaveButtonContext =
  | 'primary'
  | 'destructive'
  | 'success'
  | 'warning';

export interface OctaveButtonProps extends ButtonProps {
  label?: string;
  action?: () => void;
  link?: string;
  type?: 'submit' | 'reset' | 'button';
  context?: OctaveButtonContext;
}

export interface OctaveButtonLabelProps extends TextProps {
  case?: 'lowercase' | 'uppercase' | 'free';
}

const colorMap: Record<OctaveButtonContext, string | undefined> = {
  primary: undefined,
  destructive: 'red',
  success: 'green',
  warning: 'orange',
};

export function OctaveButton({
  btnProps,
  labelProps,
}: {
  btnProps: OctaveButtonProps;
  labelProps?: OctaveButtonLabelProps;
}) {
  const { label, action, link, context, ...rest } = btnProps;
  const { isMobile } = useBreakpoints();
  const size = (btnProps.size ?? isMobile) ? 'sm' : 'md';
  return (
    <Button
      w={btnProps.fullWidth ? undefined : 'fit-content'}
      color={colorMap[context ?? 'primary']}
      component={link ? Link : undefined}
      href={link || '#'}
      size={size}
      type={btnProps.type}
      onClick={action}
      style={{
        ...btnProps.style,
      }}
      {...rest}
      fullWidth={false}
    >
      <Text
        style={{
          textTransform:
            labelProps?.case === 'free' ? undefined : labelProps?.case,
          fontWeight: 600,
        }}
        size="xs"
        {...labelProps}
        truncate="end"
      >
        {label}
      </Text>
    </Button>
  );
}
