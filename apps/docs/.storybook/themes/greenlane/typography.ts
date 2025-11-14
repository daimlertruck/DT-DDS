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
    "Poppins, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif",
};

export const fontStyles = {
  h1: `font-family: Poppins; ${getTextStyles(
    600,
    '2.5rem',
    '3rem',
    '0.03rem'
  )}`,
  h2: `font-family: Poppins; ${getTextStyles(600, '2rem', '2.5rem')}`,
  h3: `font-family: Poppins; ${getTextStyles(600, '1.5rem', '1.75rem')}`,
  h4: `font-family: Poppins; ${getTextStyles(600, '1.25rem', '1.5rem')}`,
  h5: `font-family: Poppins; ${getTextStyles(600, '1rem', '1.25rem')}`,
  h6: `font-family: Poppins; ${getTextStyles(
    600,
    '1rem',
    '1.5rem',
    'normal',
    'uppercase'
  )}`,
  h1Bold: `font-family: Poppins; ${getTextStyles(700, '40px', '48px')}`,
  h2Bold: `font-family: Poppins; ${getTextStyles(700, '32px', '40px')}`,
  h3Bold: `font-family: Poppins; ${getTextStyles(700, '24px', '28px')}`,
  h4Bold: `font-family: Poppins; ${getTextStyles(700, '20px', '24px')}`,
  h5Bold: `font-family: Poppins; ${getTextStyles(700, '16px', '20px')}`,
  h6Bold: `font-family: Poppins; ${getTextStyles(700, '16px', '24px')}`,
  h1XsRegular: `font-family: Poppins; ${getTextStyles(400, '40px', '48px')}`,
  h2XsRegular: `font-family: Poppins; ${getTextStyles(400, '32px', '40px')}`,
  h3XsRegular: `font-family: Poppins; ${getTextStyles(400, '24px', '28px')}`,
  h4XsRegular: `font-family: Poppins; ${getTextStyles(400, '20px', '24px')}`,
  h5XsRegular: `font-family: Poppins; ${getTextStyles(400, '16px', '20px')}`,
  h6XsRegular: `inherit`,
  h1XsBold: `font-family: Poppins; ${getTextStyles(700, '40px', '48px')}`,
  h2XsBold: `font-family: Poppins; ${getTextStyles(700, '32px', '40px')}`,
  h3XsBold: `font-family: Poppins; ${getTextStyles(700, '24px', '28px')}`,
  h4XsBold: `font-family: Poppins; ${getTextStyles(700, '20px', '24px')}`,
  h5XsBold: `font-family: Poppins; ${getTextStyles(700, '16px', '20px')}`,
  h6XsBold: 'inherit',
  bodyLgRegular: `font-family: Poppins; ${getTextStyles(400, '16px', '20px')}`,
  bodyLgBold: `font-family: Poppins; ${getTextStyles(700, '16px', '20px')}`,
  bodyMdRegular: `font-family: Poppins; ${getTextStyles(400, '14px', '16px')}`,
  bodyMdBold: `font-family: Poppins; ${getTextStyles(700, '14px', '16px')}`,
  bodySmRegular: `font-family: Poppins; ${getTextStyles(400, '12px', '16px')}`,
  bodySmBold: `font-family: Poppins; ${getTextStyles(700, '12px', '16px')}`,
  bodyXsRegular: `font-family: Poppins; ${getTextStyles(400, '10px', '14px')}`,
  bodyXsBold: `font-family: Poppins; ${getTextStyles(700, '10px', '14px')}`,
  buttonLg: `font-family: Poppins; ${getTextStyles(
    700,
    '1rem',
    '1.5rem',
    '0.02rem',
    'uppercase'
  )}`,
  buttonMd: `font-family: Poppins; ${getTextStyles(
    700,
    '0.875rem',
    '1.25rem',
    '0.018rem',
    'uppercase'
  )}`,
  buttonSm: `font-family: Poppins; ${getTextStyles(
    700,
    '0.625rem',
    '1rem',
    '0.015rem',
    'uppercase'
  )}`,
  linkLgRegular: `font-family: Poppins; ${getTextStyles(
    400,
    '16px',
    '24px'
  )} text-decoration: underline;`,
  linkLgBold: `font-family: Poppins; ${getTextStyles(
    700,
    '16px',
    '24px'
  )} text-decoration: underline;`,
  linkMdRegular: `font-family: Poppins; ${getTextStyles(
    400,
    '14px',
    '16px'
  )} text-decoration: underline;`,
  linkMdBold: `font-family: Poppins; ${getTextStyles(
    700,
    '14px',
    '16px'
  )} text-decoration: underline;`,
  linkSmRegular: `font-family: Poppins; ${getTextStyles(
    400,
    '12px',
    '16px'
  )} text-decoration: underline;`,
  linkSmBold: `font-family: Poppins; ${getTextStyles(
    700,
    '12px',
    '16px'
  )} text-decoration: underline;`,
  body1Bold: `font-family: Poppins; ${getTextStyles(600, '1rem', '1.5rem')}`,
  body1: `font-family: Poppins; ${getTextStyles(400, '1rem', '1.5rem')}`,
  body2Bold: `font-family: Poppins; ${getTextStyles(
    600,
    '0.875rem',
    '1.25rem'
  )}`,
  body2: `font-family: Poppins; ${getTextStyles(400, '0.875rem', '1.25rem')}`,
  body3Bold: `font-family: Poppins; ${getTextStyles(600, '0.75rem', '1rem')}`,
  body3: `font-family: Poppins; ${getTextStyles(400, '0.75rem', '1rem')}`,
  body4Bold: `font-family: Poppins; ${getTextStyles(
    600,
    '0.625rem',
    '0.875rem'
  )}`,
  body4: `font-family: Poppins; ${getTextStyles(400, '0.625rem', '0.875rem')}`,
  link1Bold: `font-family: Poppins; ${getTextStyles(600, '1rem', '1.5rem')}`,
  link1: `font-family: Poppins; ${getTextStyles(400, '1rem', '1.5rem')}`,
  link2Bold: `font-family: Poppins; ${getTextStyles(
    600,
    '0.875rem',
    '1.25rem'
  )}`,
  link2: `font-family: Poppins; ${getTextStyles(400, '0.875rem', '1.25rem')}`,
  link3Bold: `font-family: Poppins; ${getTextStyles(600, '0.75rem', '1rem')}`,
  link3: `font-family: Poppins; ${getTextStyles(400, '0.75rem', '1rem')}`,
  button1: `font-family: Poppins; ${getTextStyles(
    700,
    '1rem',
    '1.5rem',
    '0.02rem',
    'uppercase'
  )}`,
  button2: `font-family: Poppins; ${getTextStyles(
    700,
    '0.875rem',
    '1.25rem',
    '0.018rem',
    'uppercase'
  )}`,
  button3: `font-family: Poppins; ${getTextStyles(
    700,
    '0.625rem',
    '1rem',
    '0.015rem',
    'uppercase'
  )}`,
  p: `font-family: Poppins; ${getTextStyles(400, '14px', '16px')}`,
  pSmall: `font-family: Poppins; ${getTextStyles(400, '12px', '16px')}`,
  pXSmall: `font-family: Poppins; ${getTextStyles(400, '10px', '14px')}`,
  pXXSmall: `font-family: Poppins; ${getTextStyles(400, '10px', '14px')}`,
  tag: `font-family: Poppins; ${getTextStyles(400, '12px', '16px')}`,
};

const formattedResponsiveFontStyles = {
  h1: `font-family: Poppins; ${getTextStyles(400, '48px', '52px')}`,
  h2: `font-family: Poppins; ${getTextStyles(400, '40px', '44px')}`,
  h3: `font-family: Poppins; ${getTextStyles(400, '32px', '36px')}`,
  h4: `font-family: Poppins; ${getTextStyles(400, '24px', '28px')}`,
  h5: `font-family: Poppins; ${getTextStyles(400, '20px', '24px')}`,
  h1Bold: `font-family: Poppins; ${getTextStyles(700, '48px', '52px')}`,
  h2Bold: `font-family: Poppins; ${getTextStyles(700, '40px', '44px')}`,
  h3Bold: `font-family: Poppins; ${getTextStyles(700, '32px', '36px')}`,
  h4Bold: `font-family: Poppins; ${getTextStyles(700, '24px', '28px')}`,
  h5Bold: `font-family: Poppins; ${getTextStyles(700, '20px', '24px')}`,
} as const;

export const responsiveFontStyles = Object.fromEntries(
  Object.entries(formattedResponsiveFontStyles).map(([key, styleString]) => [
    key,
    getTextResponsiveStyle([{ minBound: 'mq4', fontStyles: styleString }]),
  ])
);
