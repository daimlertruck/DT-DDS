import { Breakpoints, CustomTheme as Theme } from '../../types';

import { breakpoints } from './breakpoints';

export const fontFamily = {
  default:
    "Daimler CS, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif",
};

interface ResponsiveStyle {
  minBound?: Breakpoints;
  maxBound?: Breakpoints;
  fontSize: string;
  lineHeight: string;
}

const getTextResponsiveStyle = (styles: ResponsiveStyle[]) => {
  return styles
    .map((style) => {
      const minBoundStyle = style.minBound
        ? ` and (min-width:${breakpoints[style.minBound]}px)`
        : '';
      const maxBoundStyle = style.maxBound
        ? ` and (max-width:${breakpoints[style.maxBound]}px)`
        : '';
      return `
      @media only screen${minBoundStyle} ${maxBoundStyle} {
          font-size: ${style.fontSize};
          line-height: ${style.lineHeight};
      }`;
    })
    .join('');
};

export const fontStyles: Theme['fontStyles'] = {
  h1: 'font-family: Daimler CS; font-size: 48px; font-weight: 400; letter-spacing: 0px; line-height: 52px; text-decoration: none',
  h2: 'font-family: Daimler CS; font-size: 40px; font-weight: 400; letter-spacing: 0px; line-height: 44px; text-decoration: none',
  h3: 'font-family: Daimler CS; font-size: 32px; font-weight: 400; letter-spacing: 0px; line-height: 36px; text-decoration: none',
  h4: 'font-family: Daimler CS; font-size: 24px; font-weight: 400; letter-spacing: 0px; line-height: 28px; text-decoration: none',
  h5: 'font-family: Daimler CS; font-size: 20px; font-weight: 400; letter-spacing: 0px; line-height: 24px; text-decoration: none',
  h6: 'font-family: Daimler CS; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 24px; text-decoration: none',
  h1Bold:
    'font-family: Daimler CS; font-size: 48px; font-weight: 700; letter-spacing: 0px; line-height: 52px; text-decoration: none',
  h2Bold:
    'font-family: Daimler CS; font-size: 40px; font-weight: 700; letter-spacing: 0px; line-height: 44px; text-decoration: none',
  h3Bold:
    'font-family: Daimler CS; font-size: 32px; font-weight: 700; letter-spacing: 0px; line-height: 36px; text-decoration: none',
  h4Bold:
    'font-family: Daimler CS; font-size: 24px; font-weight: 700; letter-spacing: 0px; line-height: 28px; text-decoration: none',
  h5Bold:
    'font-family: Daimler CS; font-size: 20px; font-weight: 700; letter-spacing: 0px; line-height: 24px; text-decoration: none',
  h6Bold:
    'font-family: Daimler CS; font-size: 16px; font-weight: 700; letter-spacing: 0px; line-height: 24px; text-decoration: none',
  h1XsRegular:
    'font-family: Daimler CS; font-size: 40px; font-weight: 400; letter-spacing: 0px; line-height: 48px; text-decoration: none',
  h2XsRegular:
    'font-family: Daimler CS; font-size: 32px; font-weight: 400; letter-spacing: 0px; line-height: 40px; text-decoration: none',
  h3XsRegular:
    'font-family: Daimler CS; font-size: 24px; font-weight: 400; letter-spacing: 0px; line-height: 28px; text-decoration: none',
  h4XsRegular:
    'font-family: Daimler CS; font-size: 20px; font-weight: 400; letter-spacing: 0px; line-height: 24px; text-decoration: none',
  h5XsRegular:
    'font-family: Daimler CS; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 20px; text-decoration: none',
  h6XsRegular: 'inherit',
  h1XsBold:
    'font-family: Daimler CS; font-size: 40px; font-weight: 700; letter-spacing: 0px; line-height: 48px; text-decoration: none',
  h2XsBold:
    'font-family: Daimler CS; font-size: 32px; font-weight: 700; letter-spacing: 0px; line-height: 40px; text-decoration: none',
  h3XsBold:
    'font-family: Daimler CS; font-size: 24px; font-weight: 700; letter-spacing: 0px; line-height: 28px; text-decoration: none',
  h4XsBold:
    'font-family: Daimler CS; font-size: 20px; font-weight: 700; letter-spacing: 0px; line-height: 24px; text-decoration: none',
  h5XsBold:
    'font-family: Daimler CS; font-size: 16px; font-weight: 700; letter-spacing: 0px; line-height: 20px; text-decoration: none',
  h6XsBold: 'inherit',
  bodyLgRegular:
    'font-family: Daimler CS; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 20px; text-decoration: none',
  bodyLgBold:
    'font-family: Daimler CS; font-size: 16px; font-weight: 700; letter-spacing: 0px; line-height: 20px; text-decoration: none',
  bodyMdRegular:
    'font-family: Daimler CS; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  bodyMdBold:
    'font-family: Daimler CS; font-size: 14px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  bodySmRegular:
    'font-family: Daimler CS; font-size: 12px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  bodySmBold:
    'font-family: Daimler CS; font-size: 12px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  bodyXsRegular:
    'font-family: Daimler CS; font-size: 10px; font-weight: 400; letter-spacing: 0px; line-height: 14px; text-decoration: none',
  bodyXsBold:
    'font-family: Daimler CS; font-size: 10px; font-weight: 700; letter-spacing: 0px; line-height: 14px; text-decoration: none',
  buttonLg:
    'font-family: Daimler CS; font-size: 16px; font-weight: 700; letter-spacing: 0px; line-height: 24px; text-decoration: none',
  buttonMd:
    'font-family: Daimler CS; font-size: 14px; font-weight: 700; letter-spacing: 0px; line-height: 20px; text-decoration: none',
  buttonSm:
    'font-family: Daimler CS; font-size: 12px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  linkLgRegular:
    'font-family: Daimler CS; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 24px; text-decoration: underline',
  linkLgBold:
    'font-family: Daimler CS; font-size: 16px; font-weight: 700; letter-spacing: 0px; line-height: 24px; text-decoration: underline',
  linkMdRegular:
    'font-family: Daimler CS; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: underline',
  linkMdBold:
    'font-family: Daimler CS; font-size: 14px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: underline',
  linkSmRegular:
    'font-family: Daimler CS; font-size: 12px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: underline',
  linkSmBold:
    'font-family: Daimler CS; font-size: 12px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: underline',
  body1Bold:
    'font-family: Daimler CS; font-size: 16px; font-weight: 700; letter-spacing: 0px; line-height: 20px; text-decoration: none',
  body1:
    'font-family: Daimler CS; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 20px; text-decoration: none',
  body2Bold:
    'font-family: Daimler CS; font-size: 14px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  body2:
    'font-family: Daimler CS; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  body3Bold:
    'font-family: Daimler CS; font-size: 12px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  body3:
    'font-family: Daimler CS; font-size: 12px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  body4Bold:
    'font-family: Daimler CS; font-size: 10px; font-weight: 700; letter-spacing: 0px; line-height: 14px; text-decoration: none',
  body4:
    'font-family: Daimler CS; font-size: 10px; font-weight: 400; letter-spacing: 0px; line-height: 14px; text-decoration: none',
  link1Bold:
    'font-family: Daimler CS; font-size: 16px; font-weight: 700; letter-spacing: 0px; line-height: 24px; text-decoration: underline',
  link1:
    'font-family: Daimler CS; font-size: 16px; font-weight: 400; letter-spacing: 0px; line-height: 24px; text-decoration: underline',
  link2Bold:
    'font-family: Daimler CS; font-size: 14px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: underline',
  link2:
    'font-family: Daimler CS; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: underline',
  link3Bold:
    'font-family: Daimler CS; font-size: 12px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: underline',
  link3:
    'font-family: Daimler CS; font-size: 12px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: underline',
  button1:
    'font-family: Daimler CS; font-size: 16px; font-weight: 700; letter-spacing: 0px; line-height: 24px; text-decoration: none',
  button2:
    'font-family: Daimler CS; font-size: 14px; font-weight: 700; letter-spacing: 0px; line-height: 20px; text-decoration: none',
  button3:
    'font-family: Daimler CS; font-size: 12px; font-weight: 700; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  p: 'font-family: Daimler CS; font-size: 14px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  pSmall:
    'font-family: Daimler CS; font-size: 12px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: none',
  pXSmall:
    'font-family: Daimler CS; font-size: 10px; font-weight: 400; letter-spacing: 0px; line-height: 14px; text-decoration: none',
  pXXSmall:
    'font-family: Daimler CS; font-size: 10px; font-weight: 400; letter-spacing: 0px; line-height: 14px; text-decoration: none',
  tag: 'font-family: Daimler CS; font-size: 12px; font-weight: 400; letter-spacing: 0px; line-height: 16px; text-decoration: none',
} as const;

export const responsiveFontStyles = {
  h1: getTextResponsiveStyle([
    { minBound: 'mq4', fontSize: '3rem', lineHeight: '3.25rem' },
  ]),
  h2: getTextResponsiveStyle([
    { minBound: 'mq4', fontSize: '2.5rem', lineHeight: '2.75rem' },
  ]),
  h3: getTextResponsiveStyle([
    { minBound: 'mq4', fontSize: '2rem', lineHeight: '2.25rem' },
  ]),
  h4: getTextResponsiveStyle([
    { minBound: 'mq4', fontSize: '1.5rem', lineHeight: '1.75rem' },
  ]),
  h5: getTextResponsiveStyle([
    { minBound: 'mq4', fontSize: '1.25rem', lineHeight: '1.5rem' },
  ]),
};
