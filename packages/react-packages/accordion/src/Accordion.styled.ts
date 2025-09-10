import styled from '@emotion/styled';

interface AccordionStyledProps {
  isDisabled: boolean;
  hasBackground?: boolean;
  hasBorderBottom?: boolean;
}

export const AccordionStyled = styled.div<AccordionStyledProps>`
  ${({ theme, hasBackground, isDisabled, hasBorderBottom }) => `
    position: relative;
    width: 100%;
    background-color: ${
      hasBackground ? theme.palette.surface.light : 'transparent'
    };
    border-bottom: ${
      hasBorderBottom ? `1px solid ${theme.palette.border.default}` : 'none'
    };

    ${
      isDisabled
        ? `
          background-color: ${theme.palette.surface.light};
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
