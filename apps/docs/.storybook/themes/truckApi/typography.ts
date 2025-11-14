import { Breakpoints, defaultTheme, getTextStyles } from '@dt-dds/react';

interface ResponsiveStyle {
  minBound?: Breakpoints;
  maxBound?: Breakpoints;
  fontStyles: string;
}

const getTextResponsiveStyle = (styles: ResponsiveStyle[]) => {
  return styles
    .map((style) => {
      const minBoundStyle = style.minBound
        ? ` and (min-width:${defaultTheme.breakpoints[style.minBound]}px)`
        : '';
      const maxBoundStyle = style.maxBound
        ? ` and (max-width:${defaultTheme.breakpoints[style.maxBound]}px)`
        : '';
      return `
      @media only screen${minBoundStyle} ${maxBoundStyle} {
          ${style.fontStyles}
      }`;
    })
    .join('');
};

export const fontFamily = {
  default:
    "Roboto, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif",
};

export const fontStyles = {
  h1: `font-family: Roboto; ${getTextStyles(400, '40px', '48px')}`,
  h2: `font-family: Roboto; ${getTextStyles(400, '32px', '40px')}`,
  h3: `font-family: Roboto; ${getTextStyles(500, '2rem', '2.25rem')}`,
  h4: `font-family: Roboto; ${getTextStyles(500, '1.5rem', '1.75rem')}`,
  h5: `font-family: Roboto; ${getTextStyles(500, '1.25rem', '1.5rem')}`,
  h6: `font-family: Roboto; ${getTextStyles(500, '1rem', '1.5rem')}`,
  h1Bold: `font-family: Roboto; ${getTextStyles(700, '40px', '48px')}`,
  h2Bold: `font-family: Roboto; ${getTextStyles(700, '32px', '40px')}`,
  h3Bold: `font-family: Roboto; ${getTextStyles(700, '24px', '28px')}`,
  h4Bold: `font-family: Roboto; ${getTextStyles(700, '20px', '24px')}`,
  h5Bold: `font-family: Roboto; ${getTextStyles(700, '16px', '20px')}`,
  h6Bold: `font-family: Roboto; ${getTextStyles(700, '16px', '24px')}`,
  h1XsRegular: `font-family: Roboto; ${getTextStyles(400, '40px', '48px')}`,
  h2XsRegular: `font-family: Roboto; ${getTextStyles(400, '32px', '40px')}`,
  h3XsRegular: `font-family: Roboto; ${getTextStyles(400, '24px', '28px')}`,
  h4XsRegular: `font-family: Roboto; ${getTextStyles(400, '20px', '24px')}`,
  h5XsRegular: `font-family: Roboto; ${getTextStyles(400, '16px', '20px')}`,
  h6XsRegular: `inherit`,
  h1XsBold: `font-family: Roboto; ${getTextStyles(700, '40px', '48px')}`,
  h2XsBold: `font-family: Roboto; ${getTextStyles(700, '32px', '40px')}`,
  h3XsBold: `font-family: Roboto; ${getTextStyles(700, '24px', '28px')}`,
  h4XsBold: `font-family: Roboto; ${getTextStyles(700, '20px', '24px')}`,
  h5XsBold: `font-family: Roboto; ${getTextStyles(700, '16px', '20px')}`,
  h6XsBold: 'inherit',
  bodyLgRegular: `font-family: Roboto; ${getTextStyles(400, '16px', '20px')}`,
  bodyLgBold: `font-family: Roboto; ${getTextStyles(700, '16px', '20px')}`,
  bodyMdRegular: `font-family: Roboto; ${getTextStyles(400, '14px', '16px')}`,
  bodyMdBold: `font-family: Roboto; ${getTextStyles(700, '14px', '16px')}`,
  bodySmRegular: `font-family: Roboto; ${getTextStyles(400, '12px', '16px')}`,
  bodySmBold: `font-family: Roboto; ${getTextStyles(700, '12px', '16px')}`,
  bodyXsRegular: `font-family: Roboto; ${getTextStyles(400, '10px', '14px')}`,
  bodyXsBold: `font-family: Roboto; ${getTextStyles(700, '10px', '14px')}`,
  buttonLg: `font-family: Roboto; ${getTextStyles(700, '1rem', '1.5rem')}`,
  buttonMd: `font-family: Roboto; ${getTextStyles(700, '0.875rem', '1.25rem')}`,
  buttonSm: `font-family: Roboto; ${getTextStyles(700, '0.75rem', '1rem')}`,
  linkLgRegular: `font-family: Roboto; ${getTextStyles(
    400,
    '16px',
    '24px'
  )} text-decoration: underline;`,
  linkLgBold: `font-family: Roboto; ${getTextStyles(
    700,
    '16px',
    '24px'
  )} text-decoration: underline;`,
  linkMdRegular: `font-family: Roboto; ${getTextStyles(
    400,
    '14px',
    '16px'
  )} text-decoration: underline;`,
  linkMdBold: `font-family: Roboto; ${getTextStyles(
    700,
    '14px',
    '16px'
  )} text-decoration: underline;`,
  linkSmRegular: `font-family: Roboto; ${getTextStyles(
    400,
    '12px',
    '16px'
  )} text-decoration: underline;`,
  linkSmBold: `font-family: Roboto; ${getTextStyles(
    700,
    '12px',
    '16px'
  )} text-decoration: underline;`,
  body1Bold: `font-family: Roboto; ${getTextStyles(700, '16px', '20px')}`,
  body1: `font-family: Roboto; ${getTextStyles(400, '16px', '20px')}`,
  body2Bold: `font-family: Roboto; ${getTextStyles(700, '14px', '16px')}`,
  body2: `font-family: Roboto; ${getTextStyles(400, '14px', '16px')}`,
  body3Bold: `font-family: Roboto; ${getTextStyles(700, '12px', '16px')}`,
  body3: `font-family: Roboto; ${getTextStyles(400, '12px', '16px')}`,
  body4Bold: `font-family: Roboto; ${getTextStyles(700, '10px', '14px')}`,
  body4: `font-family: Roboto; ${getTextStyles(400, '10px', '14px')}`,
  link1Bold: `font-family: Roboto; ${getTextStyles(700, '16px', '24px')}`,
  link1: `font-family: Roboto; ${getTextStyles(400, '16px', '24px')}`,
  link2Bold: `font-family: Roboto; ${getTextStyles(700, '14px', '16px')}`,
  link2: `font-family: Roboto; ${getTextStyles(400, '14px', '16px')}`,
  link3Bold: `font-family: Roboto; ${getTextStyles(700, '12px', '16px')}`,
  link3: `font-family: Roboto; ${getTextStyles(400, '12px', '16px')}`,
  button1: `font-family: Roboto; ${getTextStyles(700, '1rem', '1.5rem')}`,
  button2: `font-family: Roboto; ${getTextStyles(700, '0.875rem', '1.25rem')}`,
  button3: `font-family: Roboto; ${getTextStyles(700, '0.75rem', '1rem')}`,
  p: `font-family: Roboto; ${getTextStyles(400, '14px', '16px')}`,
  pSmall: `font-family: Roboto; ${getTextStyles(400, '12px', '16px')}`,
  pXSmall: `font-family: Roboto; ${getTextStyles(400, '10px', '14px')}`,
  pXXSmall: `font-family: Roboto; ${getTextStyles(400, '10px', '14px')}`,
  tag: `font-family: Roboto; ${getTextStyles(400, '12px', '16px')}`,
};

const formattedResponsiveFontStyles = {
  h1: `font-family: Roboto; ${getTextStyles(400, '48px', '52px')}`,
  h2: `font-family: Roboto; ${getTextStyles(400, '40px', '44px')}`,
  h3: `font-family: Roboto; ${getTextStyles(400, '32px', '36px')}`,
  h4: `font-family: Roboto; ${getTextStyles(400, '24px', '28px')}`,
  h5: `font-family: Roboto; ${getTextStyles(400, '20px', '24px')}`,
  h1Bold: `font-family: Roboto; ${getTextStyles(700, '48px', '52px')}`,
  h2Bold: `font-family: Roboto; ${getTextStyles(700, '40px', '44px')}`,
  h3Bold: `font-family: Roboto; ${getTextStyles(700, '32px', '36px')}`,
  h4Bold: `font-family: Roboto; ${getTextStyles(700, '24px', '28px')}`,
  h5Bold: `font-family: Roboto; ${getTextStyles(700, '20px', '24px')}`,
} as const;

export const responsiveFontStyles = Object.fromEntries(
  Object.entries(formattedResponsiveFontStyles).map(([key, styleString]) => [
    key,
    getTextResponsiveStyle([{ minBound: 'mq4', fontStyles: styleString }]),
  ])
);
