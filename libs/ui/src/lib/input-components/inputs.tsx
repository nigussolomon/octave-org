import {
  ActionIcon,
  Anchor,
  Card,
  Checkbox,
  CheckboxProps,
  Flex,
  NumberInput,
  NumberInputProps,
  Radio,
  RadioProps,
  Select,
  SelectProps,
  Stack,
  Text,
  TextInput,
  TextInputProps,
} from '@mantine/core';
import React, { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import Link from 'next/link';
import {
  DatePickerInput,
  DatePickerInputProps,
  DatesProvider,
} from '@mantine/dates';

const containedStyle = () => {
  return {
    root: {
      position: 'relative' as const,
      width: '100%',
    },
    input: {
      height: '54px',
      paddingTop: '18px',
    },
    label: {
      position: 'absolute' as const,
      pointerEvents: 'none' as const,
      fontSize: 'var(--mantine-font-size-xs)',
      paddingLeft: 'var(--mantine-spacing-sm)',
      paddingTop: 'calc(var(--mantine-spacing-sm) / 2)',
      zIndex: 1,
    },
  };
};

function InputWrapper({
  children,
  error,
  description,
}: {
  children: React.ReactNode;
  error?: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <Stack w="100%" align="stretch" gap={4}>
      {children}
      {(error || description) && (
        <Text size="xs" c={error ? 'red' : 'dimmed'} pl={5}>
          {error || description}
        </Text>
      )}
    </Stack>
  );
}

function SecureInputWrapper({
  children,
  enableForgotPassword,
  forgotPasswordHref,
  error,
}: {
  children: React.ReactNode;
  enableForgotPassword?: boolean;
  forgotPasswordHref?: string;
  error?: string;
}) {
  return (
    <Stack w="100%" align="stretch" gap={4}>
      {children}
      <Flex gap="xl" justify="space-between">
        <Text size="xs" c="red">
          {error}
        </Text>
        {enableForgotPassword && (
          <Flex justify="flex-end">
            <Anchor
              component={Link}
              underline="always"
              size="xs"
              href={forgotPasswordHref || '#'}
            >
              Forgot Password?
            </Anchor>
          </Flex>
        )}
      </Flex>
    </Stack>
  );
}

export function OctaveTextInput(props: TextInputProps) {
  return (
    <InputWrapper error={props.error} description={props.description}>
      <TextInput
        {...props}
        styles={containedStyle()}
        error={null}
        description={null}
      />
    </InputWrapper>
  );
}

export function OctaveNumberInput(props: NumberInputProps) {
  return (
    <InputWrapper error={props.error} description={props.description}>
      <NumberInput
        {...props}
        styles={containedStyle()}
        error={null}
        description={null}
      />
    </InputWrapper>
  );
}

export function OctaveSelectInput(props: SelectProps) {
  return (
    <InputWrapper error={props.error} description={props.description}>
      <Select
        {...props}
        styles={containedStyle()}
        error={null}
        description={null}
      />
    </InputWrapper>
  );
}

export interface OctaveSecureInputProps extends TextInputProps {
  enableForgotPassword?: boolean;
  forgotPasswordHref?: string;
}

export function OctaveSecureInput(props: OctaveSecureInputProps) {
  const [secure, setSecure] = useState(true);
  const { enableForgotPassword, forgotPasswordHref, ...rest } = props;
  return (
    <SecureInputWrapper
      enableForgotPassword={enableForgotPassword}
      forgotPasswordHref={forgotPasswordHref}
      error={props.error?.toString()}
    >
      <TextInput
        {...rest}
        styles={containedStyle()}
        error={null}
        description={null}
        type={secure ? 'password' : 'text'}
        rightSectionWidth={50}
        rightSection={
          <ActionIcon
            mx={25}
            size="md"
            variant="light"
            onClick={() => setSecure(!secure)}
          >
            {secure ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </ActionIcon>
        }
      />
    </SecureInputWrapper>
  );
}

export function OctaveCheckboxInput(props: CheckboxProps) {
  return (
    <Stack>
      <Card py="xs" pr="xl" withBorder>
        <Flex gap="xs" align="center">
          <Checkbox {...props} label={null} error={null} description={null} />
          <Stack gap={0}>
            <Text size="xs" fw={600}>
              {props.label}
            </Text>
            <Text size="xs" c={props.error ? 'red' : 'dimmed'}>
              {props.error || props.description}
            </Text>
          </Stack>
        </Flex>
      </Card>
    </Stack>
  );
}

export function OctaveRadioInput(props: RadioProps) {
  return (
    <Stack>
      <Card py="xs" pr="xl" withBorder>
        <Flex gap="xs" align="center">
          <Radio {...props} label={null} error={null} description={null} />
          <Stack gap={0}>
            <Text size="xs" fw={600}>
              {props.label}
            </Text>
            <Text size="xs" c="dimmed">
              {props.description}
            </Text>
          </Stack>
        </Flex>
      </Card>
    </Stack>
  );
}

export function OctaveDateInput(props: DatePickerInputProps) {
  return (
    <InputWrapper error={props.error} description={props.description}>
      <DatesProvider settings={{ locale: 'am' }}>
        <DatePickerInput
          {...props}
          styles={containedStyle()}
          error={null}
          description={null}
        />
      </DatesProvider>
    </InputWrapper>
  );
}
