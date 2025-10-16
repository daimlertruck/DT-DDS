import { FontFace } from '@dt-dds/themes';

export const fonts: FontFace[] = [
  {
    '@font-face': {
      fontFamily: 'Daimler CS',
      fontStyle: 'normal',
      fontWeight: 400,
      src: "url('./DaimlerCS-Regular.woff2') format('woff2'), url('./DaimlerCS-Regular.woff') format('woff')",
    },
  },
  {
    '@font-face': {
      fontFamily: 'Daimler CS',
      fontStyle: 'normal',
      fontWeight: 700,
      src: "url('./DaimlerCS-Bold.woff2') format('woff2'), url('./DaimlerCS-Bold.woff') format('woff')",
    },
  },
];
