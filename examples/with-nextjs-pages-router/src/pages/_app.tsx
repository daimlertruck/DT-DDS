import type { AppProps } from 'next/app';
import { Provider as ThemeProvider, theme } from '@dt-dds/react';

import '@dt-dds/fonts/index.css';
import '@dt-dds/icons/index.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
