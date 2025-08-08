/* woff2 - Chrome 26+, Opera 23+, Firefox 39+ */
/* woff  - Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */

import type { FontFace } from '@dt-dds/themes';

export const webFonts: FontFace[] = [
  /* roboto-regular - latin */
  {
    '@font-face': {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 400,
      src: "url(/fonts/roboto-v30-latin/roboto-v30-latin-regular.woff) format('woff'), url(/fonts/roboto-v30-latin/roboto-v30-latin-regular.woff2) format('woff2')",
    },
  },
  /* roboto-italic - latin */
  {
    '@font-face': {
      fontFamily: 'Roboto',
      fontStyle: 'italic',
      fontWeight: 400,
      src: "url(/fonts/roboto-v30-latin/roboto-v30-latin-italic.woff) format('woff'), url(/fonts/roboto-v30-latin/roboto-v30-latin-italic.woff2) format('woff2')",
    },
  },
  {
    /* roboto-900 - latin */
    '@font-face': {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 900,
      src: "url(/fonts/roboto-v30-latin/roboto-v30-latin-900.woff) format('woff'), url(/fonts/roboto-v30-latin/roboto-v30-latin-900.woff2) format('woff2')",
    },
  },
  {
    /* poppins-regular */
    '@font-face': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 400,
      src: "url(/fonts/poppins/poppins-regular.woff) format('woff'), url(/fonts/poppins/poppins-regular.woff2) format('woff2')",
    },
  },
  {
    /* poppins-italic */
    '@font-face': {
      fontFamily: 'Poppins',
      fontStyle: 'italic',
      fontWeight: 400,
      src: "url(/fonts/poppins/poppins-italic.woff) format('woff'), url(/fonts/poppins/poppins-italic.woff2) format('woff2')",
    },
  },
  {
    /* poppins-semi-bold */
    '@font-face': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 600,
      src: "url(/fonts/poppins/poppins-semi-bold.woff) format('woff'), url(/fonts/poppins/poppins-semi-bold.woff2) format('woff2')",
    },
  },
  {
    /* poppins-bold */
    '@font-face': {
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontWeight: 700,
      src: "url(/fonts/poppins/poppins-bold.woff) format('woff'), url(/fonts/poppins/poppins-bold.woff2) format('woff2')",
    },
  },
  /* daimler-cs PRO regular */
  {
    '@font-face': {
      fontFamily: 'DaimlerCSPro',
      fontStyle: 'normal',
      fontWeight: 400,
      src: "url(/fonts/daimler-cs-pro/DaimlerCSPro-Regular.otf) format('opentype')",
    },
  },
  /* daimler-cs PRO bold */
  {
    '@font-face': {
      fontFamily: 'DaimlerCSPro',
      fontStyle: 'normal',
      fontWeight: 700,
      src: "url(/fonts/daimler-cs-pro/DaimlerCSPro-Bold.otf) format('opentype')",
    },
  },
  /* daimler-cs PRO italic */
  {
    '@font-face': {
      fontFamily: 'DaimlerCSPro',
      fontStyle: 'italic',
      fontWeight: 400,
      src: "url(/fonts/daimler-cs-pro/DaimlerCSPro-Italic.otf) format('opentype')",
    },
  },
  {
    '@font-face': {
      fontFamily: 'Daimler CS',
      fontStyle: 'normal',
      fontWeight: 350,
      src: "url(/fonts/daimler-cs/DaimlerCS-Regular.woff) format('woff'), url(/fonts/daimler-cs/DaimlerCS-Regular.woff2) format('woff2')",
    },
  },
  {
    '@font-face': {
      fontFamily: 'Daimler CS',
      fontStyle: 'normal',
      fontWeight: 700,
      src: "url(/fonts/daimler-cs/DaimlerCS-Bold.woff) format('woff'), url(/fonts/daimler-cs/DaimlerCS-Bold.woff2) format('woff2')",
    },
  },
];
