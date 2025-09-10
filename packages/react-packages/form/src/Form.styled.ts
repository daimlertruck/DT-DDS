import styled from '@emotion/styled';

interface GroupItemsStyledProps {
  disabled?: boolean;
}

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: ${({ theme }) => theme.spacing.spacing_60};
`;

export const GroupStyled = styled.div`
  ${({ theme }) => `
    row-gap: ${theme.spacing.spacing_50};
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${theme.palette.content.default};
  `}
`;

export const LabelStyled = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  align-items: center;
`;

export const GroupItemsStyled = styled.div<GroupItemsStyledProps>`
  ${({ theme, disabled }) => `
    display: flex;
    gap: ${theme.spacing.spacing_50};
    justify-content: stretch;
    align-items: start;
    flex-direction: column;

    @media only screen and (min-width: ${theme.breakpoints.mq3}px) {
      flex-direction: row;
    }

    ${
      disabled &&
      `
        opacity: 0.5;
        pointer-events: none;
      `
    }
  `}
`;
