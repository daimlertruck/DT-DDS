import styled from '@emotion/styled';

export interface FooterProps {
  hasBackgroundColor: boolean;
  hasBorder: boolean;
}

export const FooterStyled = styled.div<FooterProps>`
  display: flex;
  justify-content: end;
  align-items: center;
  border-radius: inherit;

  ${({ theme, hasBackgroundColor, hasBorder }) => `
      background-color: ${
        hasBackgroundColor ? theme.palette.surface.default : 'transparent'
      };
      border-top: ${
        hasBorder ? `1px solid ${theme.palette.border.default}` : 'none'
      };
      gap: ${theme.spacing.spacing_40};
      padding: ${theme.spacing.xs};
      @media only screen and (max-width: ${theme.breakpoints.mq32}px) {
        flex-direction: column-reverse;
      }
  `}
`;
