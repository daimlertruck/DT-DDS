import localFont from 'next/font/local';

export const daimlerTruckFonts = localFont({
  src: [
    {
      path: '../assets/fonts/DaimlerCS-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/DaimlerCS-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});
