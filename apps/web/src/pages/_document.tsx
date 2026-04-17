import { Html, Head, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@octave-org/ui';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
