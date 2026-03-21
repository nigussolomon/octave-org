import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { octaveTheme } from './theme/theme';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

export interface OctaveProviderProps {
  children: React.ReactNode;
  theme?: MantineThemeOverride;
}

export function OctaveProvider(props: OctaveProviderProps) {
  return (
    <MantineProvider
      defaultColorScheme="light"
      theme={props.theme ?? octaveTheme}
    >
      <Notifications />
      {props.children}
    </MantineProvider>
  );
}
