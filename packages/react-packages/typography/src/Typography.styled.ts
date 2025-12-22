import styled from '@emotion/styled';

import { getContextualColor, CustomTheme as Theme } from '@dt-dds/themes';

import { Colors } from './types';

interface TypographyStyledProps {
  color: Colors;
  fontStyles: keyof Theme['fontStyles'];
}

export const TypographyStyled = styled.p<TypographyStyledProps>`
  ${({ theme, fontStyles, color }) => {
    const themeColor = theme.colors?.[color as keyof Theme['colors']];
    const paletteColor = getContextualColor(color, theme);
    const finalColor = themeColor || paletteColor || color;

    return `
      ${theme.fontStyles[fontStyles]};
      color: ${finalColor};
      ${theme.responsiveFontStyles[fontStyles]};
    `;
  }}
`;
