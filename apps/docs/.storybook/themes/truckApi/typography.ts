import { CustomTheme, defaultTheme } from '@dt-dds/themes';
import { getTextStyles } from '@dt-dds/react';

export const fontFamily = {
  default:
    "Roboto, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif",
};

export const fontStyles = {
  ...defaultTheme.fontStyles,
  h3: getTextStyles(500, '2rem', '2.25rem'),
  h4: getTextStyles(500, '1.5rem', '1.75rem'),
  h5: getTextStyles(500, '1.25rem', '1.5rem'),
  h6: getTextStyles(500, '1rem', '1.5rem'),
  button1: getTextStyles(700, '1rem', '1.5rem'),
  button2: getTextStyles(700, '0.875rem', '1.25rem'),
  button3: getTextStyles(700, '0.75rem', '1rem'),
};
