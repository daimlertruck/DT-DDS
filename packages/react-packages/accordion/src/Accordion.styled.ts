import styled from '@emotion/styled';

import { CustomTheme } from '@dt-dds/themes';

import { Background } from './Accordion';

interface AccordionStyledProps {
  isDisabled: boolean;
  background: Background;
  hasBorderBottom?: boolean;
}

const backgroundColorMap: Record<Background, (theme: CustomTheme) => string> = {
  transparent: () => 'transparent',
  light: (theme) => theme.palette.surface.light,
  contrast: (theme) => theme.palette.surface.contrast,
};

export const AccordionStyled = styled.div<AccordionStyledProps>`
  ${({ theme, background, isDisabled, hasBorderBottom }) => `
    position: relative;
    width: 100%;
    background-color: ${backgroundColorMap[background](theme)};
    border-bottom: ${
      hasBorderBottom ? `1px solid ${theme.palette.border.default}` : 'none'
    };

    ${
      isDisabled
        ? `
          color: ${theme.palette.content.light};

          * {
            cursor: not-allowed;
            user-select: none;
            color: inherit;
          }
        `
        : `
          &:hover {
            background-color: ${theme.palette.surface.default};
            box-shadow: ${theme.shadows.elevation_100};
          }
        `
    }
  `}
`;
