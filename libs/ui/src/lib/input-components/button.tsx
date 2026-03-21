import { Button, ButtonProps, Text, TextProps } from '@mantine/core';
import Link from 'next/link';

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
  return (
    <Button
      fullWidth
      color={colorMap[context ?? 'primary']}
      component={link ? Link : undefined}
      href={link || '#'}
      size="lg"
      type={btnProps.type}
      onClick={action}
      style={{
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        ...btnProps.style,
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow:
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
          },
        },
      }}
      {...rest}
    >
      <Text
        style={{
          textTransform:
            labelProps?.case === 'free' ? undefined : labelProps?.case,
          fontWeight: 600,
        }}
        size="xs"
        {...labelProps}
      >
        {label}
      </Text>
    </Button>
  );
}
