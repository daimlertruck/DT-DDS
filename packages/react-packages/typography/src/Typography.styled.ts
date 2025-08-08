import {
  getContextualColor,
  CustomTheme as Theme,
  PaletteKeys,
} from '@dt-dds/themes';
import styled from '@emotion/styled';

import { Colors } from './types';

interface TypographyStyledProps {
  color: Colors;
  fontStyles: keyof Theme['fontStyles'];
}

export const TypographyStyled = styled.p<TypographyStyledProps>`
  ${({ theme, fontStyles, color }) => `
    ${theme.fontStyles[fontStyles]};
    color: ${
      color === 'unset' || color === 'inherit'
        ? color
        : theme.colors[color as keyof Theme['colors']] ||
          getContextualColor(color as PaletteKeys, theme)
    };
   ${theme.responsiveFontStyles[fontStyles]}
  `};
`;
