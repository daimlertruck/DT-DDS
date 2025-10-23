import { formatObject, formatTypographyStyle } from '../formatter';
import { resolveTokenReference } from '../tokenUtils';

import { TokenFile } from './../../../types';

/**
 * Generates typography.ts file content
 */
export function generateTypography(
  tokens: TokenFile,
  themeName: string
): string {
  const typographyTokens = tokens.Typography as any;
  if (!typographyTokens) {
    throw new Error(`Missing Typography tokens for theme '${themeName}'`);
  }

  function getTypographyValue(category: string, styleName: string): string {
    const categoryTokens = typographyTokens[category];
    if (!categoryTokens?.[styleName]) {
      console.warn(`⚠️  Missing typography style: ${category}.${styleName}`);
      return 'inherit';
    }

    const style = categoryTokens[styleName];
    if (!style.$value) {
      console.warn(
        `⚠️  Missing $value for typography style: ${category}.${styleName}`
      );
      return 'inherit';
    }

    const {
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing,
      lineHeight,
      textDecoration,
    } = style.$value;

    // Resolve token references
    const resolvedFontFamily = fontFamily
      ? resolveTokenReference(tokens, fontFamily)
      : 'inherit';
    const resolvedFontSize = fontSize
      ? resolveTokenReference(tokens, fontSize)
      : 'inherit';
    const resolvedFontWeight = fontWeight
      ? resolveTokenReference(tokens, fontWeight)
      : 'inherit';
    const resolvedLetterSpacing = letterSpacing
      ? resolveTokenReference(tokens, letterSpacing)
      : 'inherit';
    const resolvedLineHeight = lineHeight
      ? resolveTokenReference(tokens, lineHeight)
      : 'inherit';

    return formatTypographyStyle(
      resolvedFontFamily,
      resolvedFontSize,
      resolvedFontWeight,
      resolvedLetterSpacing,
      resolvedLineHeight,
      textDecoration
    );
  }

  const fontStyles = {
    // Headings - Regular variants
    h1: getTypographyValue('Headings', 'h1-xs-regular'),
    h2: getTypographyValue('Headings', 'h2-xs-regular'),
    h3: getTypographyValue('Headings', 'h3-xs-regular'),
    h4: getTypographyValue('Headings', 'h4-xs-regular'),
    h5: getTypographyValue('Headings', 'h5-xs-regular'),
    h6: getTypographyValue('Headings', 'h6-regular'),
    // Headings - Bold variants
    h1Bold: getTypographyValue('Headings', 'h1-xs-bold'),
    h2Bold: getTypographyValue('Headings', 'h2-xs-bold'),
    h3Bold: getTypographyValue('Headings', 'h3-xs-bold'),
    h4Bold: getTypographyValue('Headings', 'h4-xs-bold'),
    h5Bold: getTypographyValue('Headings', 'h5-xs-bold'),
    h6Bold: getTypographyValue('Headings', 'h6-bold'),
    // Headings - XS Regular variants
    h1XsRegular: getTypographyValue('Headings', 'h1-xs-regular'),
    h2XsRegular: getTypographyValue('Headings', 'h2-xs-regular'),
    h3XsRegular: getTypographyValue('Headings', 'h3-xs-regular'),
    h4XsRegular: getTypographyValue('Headings', 'h4-xs-regular'),
    h5XsRegular: getTypographyValue('Headings', 'h5-xs-regular'),
    h6XsRegular: getTypographyValue('Headings', 'h6-xs-regular'),
    // Headings - XS Bold variants
    h1XsBold: getTypographyValue('Headings', 'h1-xs-bold'),
    h2XsBold: getTypographyValue('Headings', 'h2-xs-bold'),
    h3XsBold: getTypographyValue('Headings', 'h3-xs-bold'),
    h4XsBold: getTypographyValue('Headings', 'h4-xs-bold'),
    h5XsBold: getTypographyValue('Headings', 'h5-xs-bold'),
    h6XsBold: getTypographyValue('Headings', 'h6-xs-bold'),
    // Body - Large variants
    bodyLgRegular: getTypographyValue('Body', 'body-lg-regular'),
    bodyLgBold: getTypographyValue('Body', 'body-lg-bold'),
    // Body - Medium variants
    bodyMdRegular: getTypographyValue('Body', 'body-md-regular'),
    bodyMdBold: getTypographyValue('Body', 'body-md-bold'),
    // Body - Small variants
    bodySmRegular: getTypographyValue('Body', 'body-sm-regular'),
    bodySmBold: getTypographyValue('Body', 'body-sm-bold'),
    // Body - XS variants
    bodyXsRegular: getTypographyValue('Body', 'body-xs-regular'),
    bodyXsBold: getTypographyValue('Body', 'body-xs-bold'),
    // Buttons
    buttonLg: getTypographyValue('Buttons', 'button-lg'),
    buttonMd: getTypographyValue('Buttons', 'button-md'),
    buttonSm: getTypographyValue('Buttons', 'button-sm'),
    // Links - Large variants
    linkLgRegular: getTypographyValue('Links', 'link-lg-regular'),
    linkLgBold: getTypographyValue('Links', 'link-lg-bold'),
    // Links - Medium variants
    linkMdRegular: getTypographyValue('Links', 'link-md-regular'),
    linkMdBold: getTypographyValue('Links', 'link-md-bold'),
    // Links - Small variants
    linkSmRegular: getTypographyValue('Links', 'link-sm-regular'),
    linkSmBold: getTypographyValue('Links', 'link-sm-bold'),
    // Legacy (keeping for backward compatibility)
    body1Bold: getTypographyValue('Body', 'body-lg-bold'), // Map to body-lg-bold
    body1: getTypographyValue('Body', 'body-lg-regular'), // Map to body-lg-regular
    body2Bold: getTypographyValue('Body', 'body-md-bold'), // Map to body-md-bold
    body2: getTypographyValue('Body', 'body-md-regular'), // Map to body-md-regular
    body3Bold: getTypographyValue('Body', 'body-sm-bold'), // Map to body-sm-bold
    body3: getTypographyValue('Body', 'body-sm-regular'), // Map to body-sm-regular
    body4Bold: getTypographyValue('Body', 'body-xs-bold'), // Map to body-xs-bold
    body4: getTypographyValue('Body', 'body-xs-regular'), // Map to body-xs-regular
    link1Bold: getTypographyValue('Links', 'link-lg-bold'), // Map to link-lg-bold
    link1: getTypographyValue('Links', 'link-lg-regular'), // Map to link-lg-regular
    link2Bold: getTypographyValue('Links', 'link-md-bold'), // Map to link-md-bold
    link2: getTypographyValue('Links', 'link-md-regular'), // Map to link-md-regular
    link3Bold: getTypographyValue('Links', 'link-sm-bold'), // Map to link-sm-bold
    link3: getTypographyValue('Links', 'link-sm-regular'), // Map to link-sm-regular
    button1: getTypographyValue('Buttons', 'button-lg'), // Map to button-lg
    button2: getTypographyValue('Buttons', 'button-md'), // Map to button-md
    button3: getTypographyValue('Buttons', 'button-sm'), // Map to button-sm
    p: getTypographyValue('Body', 'body-md-regular'), // Map to body-md-regular
    pSmall: getTypographyValue('Body', 'body-sm-regular'), // Map to body-sm-regular
    pXSmall: getTypographyValue('Body', 'body-xs-regular'), // Map to body-xs-regular
    pXXSmall: getTypographyValue('Body', 'body-xs-regular'), // Map to body-xs-regular
    tag: getTypographyValue('Body', 'body-sm-regular'), // Map to body-sm-regular
  };

  const responsiveFontStyles = {
    h1: getTypographyValue('Headings', 'h1-regular'),
    h2: getTypographyValue('Headings', 'h2-regular'),
    h3: getTypographyValue('Headings', 'h3-regular'),
    h4: getTypographyValue('Headings', 'h4-regular'),
    h5: getTypographyValue('Headings', 'h5-regular'),
    h1Bold: getTypographyValue('Headings', 'h1-bold'),
    h2Bold: getTypographyValue('Headings', 'h2-bold'),
    h3Bold: getTypographyValue('Headings', 'h3-bold'),
    h4Bold: getTypographyValue('Headings', 'h4-bold'),
    h5Bold: getTypographyValue('Headings', 'h5-bold'),
  };

  return `import { Breakpoints, CustomTheme as Theme } from '../../types';
import { breakpoints } from './breakpoints';

// Currently, fontFamily and responsiveFontStyles are hardcoded in the theme generator
// This is a temporary fix to make the theme generator work.

export const fontFamily = {
  default:
    "Daimler CS, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Helvetica Neue', sans-serif",
};

interface ResponsiveStyle {
  minBound?: Breakpoints;
  maxBound?: Breakpoints;
  fontStyles: string;
}

const getTextResponsiveStyle = (styles: ResponsiveStyle[]) => {
  return styles
    .map((style) => {
      const minBoundStyle = style.minBound
        ? \` and (min-width:\${breakpoints[style.minBound]}px)\`
        : '';
      const maxBoundStyle = style.maxBound
        ? \` and (max-width:\${breakpoints[style.maxBound]}px)\`
        : '';
      return \`
      @media only screen\${minBoundStyle} \${maxBoundStyle} {
          \${style.fontStyles}
      }\`;
    })
    .join('');
};

export const fontStyles: Theme['fontStyles'] = ${formatObject(
    fontStyles
  )} as const;

const formattedResponsiveFontStyles = ${formatObject(
    responsiveFontStyles
  )} as const;

export const responsiveFontStyles = Object.fromEntries(
  Object.entries(formattedResponsiveFontStyles).map(([key, styleString]) => [
    key,
    getTextResponsiveStyle([
      { minBound: 'mq4', fontStyles: styleString }
    ])
  ])
);
`;
}
