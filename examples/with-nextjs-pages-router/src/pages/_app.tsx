import type { AppProps } from 'next/app';
import { AppLayout } from '../components/AppLayout';
import {
  daimlertruckTheme,
  CustomTheme,
  Provider as ThemeProvider,
} from '@dt-dds/react';

import { daimlerTruckFonts } from '../utils';

import '@dt-dds/icons/index.css';

const theme: CustomTheme = {
  ...daimlertruckTheme,
  fontFamily: {
    default: daimlerTruckFonts.style.fontFamily,
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
}
