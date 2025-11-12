import styled from '@emotion/styled';

interface HeaderProps {
  hasBorder: boolean;
}

export const HeaderStyled = styled.div<HeaderProps>`
  display: flex;
  flex-direction: column;
  border-radius: inherit;

  ${({ theme, hasBorder }) => `
    padding: ${theme.spacing.xs};

    border-bottom: ${
      hasBorder ? `1px solid ${theme.palette.border.default}` : 'none'
    };
    gap: ${theme.spacing.spacing_30};

    @media only screen and (min-width: ${theme.breakpoints.mq3}px) {
      padding-top: ${theme.spacing.s};
    }

    button {
      color: ${theme.palette.content.default};
    }

    svg {
      cursor: pointer;
    }
  `}
`;
