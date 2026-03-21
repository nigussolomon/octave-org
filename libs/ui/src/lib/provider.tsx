import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { PropsWithChildren } from 'react';
import { octaveTheme } from './theme/theme';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export interface UIProviderProps extends PropsWithChildren {
  theme?: MantineThemeOverride;
}

export function UIProvider({ children, theme }: UIProviderProps) {
  return (
    <MantineProvider
      defaultColorScheme="light"
      theme={theme ?? octaveTheme}
    >
      <Notifications />
      {children}
    </MantineProvider>
  );
}

export type OctaveProviderProps = UIProviderProps;

export function OctaveProvider(props: OctaveProviderProps) {
  return <UIProvider {...props} />;
}
