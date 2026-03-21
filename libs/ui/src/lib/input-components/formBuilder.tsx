import { UseFormReturnType } from '@mantine/form';
import {
  OctaveTextInput,
  OctaveNumberInput,
  OctaveSelectInput,
  OctaveSecureInput,
  OctaveCheckboxInput,
  OctaveRadioInput,
  OctaveSecureInputProps,
} from './inputs';
import {
  TextInputProps,
  NumberInputProps,
  SelectProps,
  CheckboxProps,
  RadioProps,
} from '@mantine/core';

type FieldType = 'text' | 'number' | 'select' | 'secure' | 'checkbox' | 'radio';

export interface FieldConfigMap {
  text: TextInputProps;
  number: NumberInputProps;
  select: SelectProps;
  secure: OctaveSecureInputProps;
  checkbox: CheckboxProps;
  radio: RadioProps;
}

export type FormFieldConfig<T> = {
  [K in FieldType]: {
    type: K;
    name: keyof T;
    props?: FieldConfigMap[K];
  };
}[FieldType];

export interface OctaveFormBuilderProps<T> {
  form: UseFormReturnType<T>;
  fields: FormFieldConfig<T>[];
}

export function OctaveFormBuilder<T>({
  form,
  fields,
}: OctaveFormBuilderProps<T>) {
  return (
    <>
      {fields.map((field) => {
        const inputProps = form.getInputProps(field.name as string, {
          type: field.type === 'checkbox' ? 'checkbox' : 'input',
        });

        const mergedProps = { ...field.props, ...inputProps };

        switch (field.type) {
          case 'text':
            return (
              <OctaveTextInput
                key={field.name as string}
                {...(mergedProps as TextInputProps)}
              />
            );
          case 'number':
            return (
              <OctaveNumberInput
                key={field.name as string}
                {...(mergedProps as NumberInputProps)}
              />
            );
          case 'select':
            return (
              <OctaveSelectInput
                key={field.name as string}
                {...(mergedProps as SelectProps)}
              />
            );
          case 'secure':
            return (
              <OctaveSecureInput
                key={field.name as string}
                {...(mergedProps as OctaveSecureInputProps)}
              />
            );
          case 'checkbox':
            return (
              <OctaveCheckboxInput
                key={field.name as string}
                {...(mergedProps as CheckboxProps)}
              />
            );
          case 'radio':
            return (
              <OctaveRadioInput
                key={field.name as string}
                {...(mergedProps as RadioProps)}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
