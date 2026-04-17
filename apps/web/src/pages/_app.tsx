import Head from 'next/head';
import '@octave-org/ui/styles.css';
import {
  Center,
  createTheme,
  Loader,
  MantineColorsTuple,
  OctaveProvider,
  OctaveShell,
  OctaveShellProps,
  Stack,
  Text,
  ThemeIcon,
} from '@octave-org/ui';
import { DM_Sans } from 'next/font/google';
import { AppProps } from 'next/app';
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGalaxy,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from '@tabler/icons-react';
import { OctaveLinksGroupProps } from '@octave-org/ui';
import { initSdk, getConfig } from '@octave-org/ui';

initSdk({ url: process.env.NEXT_PUBLIC_API_URL });

console.log(getConfig().url);

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '1000',
  ],
});

const primary: MantineColorsTuple = [
  '#fff0e4',
  '#ffe0cf',
  '#fac0a1',
  '#f69e6e',
  '#f28043',
  '#f06e27',
  '#f06418',
  '#d6530c',
  '#bf4906',
  '#a73c00',
];

export const octaveTheme = createTheme({
  colors: {
    primary: primary,
  },
  primaryColor: 'primary',
  defaultRadius: 'md',
  fontFamily: 'DM Sans, sans-serif',
});

const appBranding = {
  companyName: 'Octave Labs',
  slogan: 'Secure access for modern teams',
  logo: (
    <ThemeIcon variant="default" size={50}>
      <IconGalaxy />
    </ThemeIcon>
  ),
};

type ShellLayoutProps = AppProps & {
  Component: OctaveShellProps;
};

const mockdata: OctaveLinksGroupProps[] = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/', active: true },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/', hidden: true },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  {
    label: 'Analytics',
    icon: IconPresentationAnalytics,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

export default function App({ Component, pageProps }: ShellLayoutProps) {
  const enableAuthDevBypass =
    process.env.NEXT_PUBLIC_AUTH_DEV_BYPASS === 'true';

  return (
    <main className={dmSans.className}>
      <Head>
        <title>{appBranding.companyName}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>

      <OctaveProvider theme={octaveTheme} branding={appBranding}>
        <OctaveShell
          props={{
            disabled: Component.disabled,
            disableAuth: Component.disableAuth,
            title: Component.title,
            description: Component.description,
            hasBack: Component.hasBack,
            disablePadding: Component.disablePadding,
            authGuardProps: {
              authRoute: '/auth',
              devBypass: enableAuthDevBypass,
              requireRefreshToken: true,
            },
          }}
          menu={mockdata}
          user={{
            contact: 'hello@octavelabs.com',
            fullName: 'Nigus Octave',
            logout: () => {
              console.log('Logout');
            },
          }}
        >
          <Component {...pageProps} />
        </OctaveShell>
      </OctaveProvider>
    </main>
  );
}
