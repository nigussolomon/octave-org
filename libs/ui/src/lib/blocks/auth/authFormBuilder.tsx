import { OctaveAuthWrapper } from './wrapper';
import { useForm, FormValidateInput } from '@mantine/form';
import { Stack, Divider, Center, Flex, PinInput } from '@mantine/core';
import {
  OctaveFormBuilder,
  FormFieldConfig,
} from '../../input-components/formBuilder';
import { OctaveButton, OctaveButtonContext } from '../../input-components';
import { OctaveStackedText } from '../../text';
import { OctaveLinkedText } from '../../text/linkedText';

export interface AuthFormRow<T extends object> {
  columns: FormFieldConfig<T>[][];
}

export interface AuthFormConfig<T extends object> {
  title: string;
  description: string;
  icon?: React.ReactNode;

  rows?: AuthFormRow<T>[];
  fields?: FormFieldConfig<T>[];

  pinFieldName?: keyof T;
  pinLength?: number;

  primaryAction: {
    label: string;
    onSubmit: (values: T) => void | Promise<void>;
  };

  secondaryAction?: {
    label: string;
    link?: string;
    onClick?: () => void;
    variant?: 'outline' | 'default' | 'filled';
    context?: OctaveButtonContext;
    linkLabel?: string;
  };
}

interface AuthFormProps<T extends object> {
  config: AuthFormConfig<T>;
  initialValues: T;
  validate?: FormValidateInput<T>;
}

export function OctaveAuthForm<T extends object>({
  config,
  initialValues,
  validate,
}: AuthFormProps<T>) {
  const form = useForm<T>({ initialValues, validate });

  return (
    <OctaveAuthWrapper>
      <Center w="100%" h="100%">
        <Stack align="center">
          {config.icon}

          <OctaveStackedText
            title={config.title}
            description={config.description}
            titleProps={{ fw: 900, style: { fontSize: '32px' }, ta: 'center' }}
            descProps={{ mt: -10, ta: 'center' }}
          />

          <form onSubmit={form.onSubmit(config.primaryAction.onSubmit)}>
            <Stack maw={400} miw={{ base: 300, md: 400 }} gap="md">
              {config.rows &&
                config.rows.map((row, rowIndex) =>
                  row.columns.length > 1 ? (
                    <Flex key={rowIndex} gap="md">
                      {row.columns.map((col, colIndex) => (
                        <OctaveFormBuilder
                          key={colIndex}
                          form={form}
                          fields={col}
                        />
                      ))}
                    </Flex>
                  ) : (
                    <OctaveFormBuilder
                      key={rowIndex}
                      form={form}
                      fields={row.columns[0]}
                    />
                  ),
                )}

              {config.fields && (
                <OctaveFormBuilder form={form} fields={config.fields} />
              )}

              {config.pinFieldName && (
                <Center>
                  <PinInput
                    type="alphanumeric"
                    mask
                    length={config.pinLength || 6}
                    size="md"
                    {...form.getInputProps(config.pinFieldName as string)}
                  />
                </Center>
              )}

              <Divider />

              <Stack gap={8}>
                <OctaveButton
                  btnProps={{
                    type: 'submit',
                    fullWidth: true,
                    label: config.primaryAction.label,
                    loading: form.submitting,
                  }}
                  labelProps={{ case: 'uppercase' }}
                />

                {config.secondaryAction &&
                  (config.secondaryAction.linkLabel ? (
                    <OctaveLinkedText
                      baseTextProps={{ ta: 'center', size: 'sm' }}
                      label={config.secondaryAction.label}
                      link={config.secondaryAction.link || ''}
                      linkLabel={config.secondaryAction.linkLabel}
                    />
                  ) : (
                    <OctaveButton
                      btnProps={{
                        type: 'button',
                        fullWidth: true,
                        label: config.secondaryAction.label,
                        variant: config.secondaryAction.variant || 'default',
                        context: config.secondaryAction.context || 'primary',
                        link: config.secondaryAction.link,
                        action: config.secondaryAction.onClick,
                      }}
                      labelProps={{ case: 'uppercase' }}
                    />
                  ))}
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Center>
    </OctaveAuthWrapper>
  );
}
