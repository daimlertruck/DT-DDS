import styled from '@emotion/styled';

export const RadioInputStyled = styled.input`
  ${({ theme }) => `
    background: ${theme.palette.surface.contrast};
    border: 1px solid ${theme.palette.border.default};
    border-radius: 50%;
    width: 24px;
    height: 24px;
    appearance: none;
    
    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
    }

    &:disabled + label {
      color: ${theme.palette.content.light};
    }

    &:checked {
      border-width: 7px;
      border-color: ${theme.palette.primary.default};
    }

    &:checked:disabled {
      border-color: ${theme.palette.primary.medium};
    }

    &:checked:before {
      content: '';
      height: 10px;
      width: 10px;
      border-radius: 50%;
      display: block;
    }
  `}
`;

export const RadioLabelStyled = styled.label`
  ${({ theme }) => `
    ${theme.fontStyles.bodyMdRegular};
    color: ${theme.palette.content.default};
    cursor: inherit;
  `}
`;
