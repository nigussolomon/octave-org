import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { PropsWithChildren } from 'react';
import { octaveTheme } from './theme/theme';
import { OctaveBranding, OctaveBrandingProvider } from './branding';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';

export interface UIProviderProps extends PropsWithChildren {
  theme?: MantineThemeOverride;
  branding?: OctaveBranding;
}

export function UIProvider({ children, theme, branding }: UIProviderProps) {
  return (
    <MantineProvider
      defaultColorScheme="light"
      theme={theme ?? { ...octaveTheme }}
    >
      <OctaveBrandingProvider branding={branding}>
        <Notifications />
        {children}
      </OctaveBrandingProvider>
    </MantineProvider>
  );
}

export type OctaveProviderProps = UIProviderProps;

export function OctaveProvider(props: OctaveProviderProps) {
  return <UIProvider {...props} />;
}
