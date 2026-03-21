import Head from 'next/head';
import {
  createTheme,
  MantineColorsTuple,
  OctaveProvider,
  OctaveShell,
  OctaveShellProps,
  ThemeIcon,
  ThemeTrigger,
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
  '#ecefff',
  '#d5dafb',
  '#a9b1f1',
  '#7a87e9',
  '#5362e1',
  '#3a4bdd',
  '#2c40dc',
  '#1f32c4',
  '#182cb0',
  '#0a259c',
];

export const octaveTheme = createTheme({
  colors: {
    primary: primary,
  },
  primaryColor: 'primary',
  defaultRadius: 0,
  fontFamily: 'DM Sans, sans-serif',
});

type ShellLayoutProps = AppProps & {
  Component: OctaveShellProps;
};

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
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
  return (
    <main className={dmSans.className}>
      <Head>
        <title>Octave Admin Dashboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </Head>

      <OctaveProvider theme={octaveTheme}>
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
          }}
        >
          <ThemeTrigger />
        </div>
        <OctaveShell
          props={{
            disabled: Component.disabled,
            title: Component.title,
            description: Component.description,
            hasBack: Component.hasBack,
            disablePadding: Component.disablePadding,
          }}
          menu={mockdata}
          user={{
            contact: 'nigus@octave.com',
            fullName: 'Nigus Octave',
            logout: () => {
              console.log('Logout');
            },
          }}
          title="CompanyTitle"
          subTitle="CompanySlogan"
          logo={
            <ThemeIcon size="xl">
              <IconGalaxy />
            </ThemeIcon>
          }
        >
          <Component {...pageProps} />
        </OctaveShell>
      </OctaveProvider>
    </main>
  );
}
