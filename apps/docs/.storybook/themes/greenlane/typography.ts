import { defaultTheme } from '@dt-dds/themes';
import { getTextStyles } from '@dt-dds/react';

export const fontFamily = {
  default:
    "Poppins, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif",
};

export const fontStyles = {
  ...defaultTheme.fontStyles,
  h1: getTextStyles(600, '2.5rem', '3rem', '0.03rem'),
  h2: getTextStyles(600, '2rem', '2.5rem'),
  h3: getTextStyles(600, '1.5rem', '1.75rem'),
  h4: getTextStyles(600, '1.25rem', '1.5rem'),
  h5: getTextStyles(600, '1rem', '1.25rem'),
  h6: getTextStyles(600, '1rem', '1.5rem', 'normal', 'uppercase'),
  body1Bold: getTextStyles(600, '1rem', '1.5rem'),
  body2Bold: getTextStyles(600, '0.875rem', '1.25rem'),
  body3Bold: getTextStyles(600, '0.75rem', '1rem'),
  body4Bold: getTextStyles(600, '0.625rem', '0.875rem'),
  link1Bold: getTextStyles(600, '1rem', '1.5rem'),
  link2Bold: getTextStyles(600, '0.875rem', '1.25rem'),
  link3Bold: getTextStyles(600, '0.75rem', '1rem'),
  button1: getTextStyles(700, '1rem', '1.5rem', '0.02rem', 'uppercase'),
  button2: getTextStyles(700, '0.875rem', '1.25rem', '0.018rem', 'uppercase'),
  button3: getTextStyles(700, '0.625rem', '1rem', '0.015rem', 'uppercase'),
};
