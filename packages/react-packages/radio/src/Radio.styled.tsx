import styled from '@emotion/styled';

export const RadioInputStyled = styled.input`
  ${({ theme }) => `
    background: ${theme.palette.surface.contrast};
    border: 1px solid ${theme.palette.informative.default};
    border-radius: 50%;
    width: 24px;
    height: 24px;
    appearance: none;
    position: relative;
    cursor: pointer;

    &:disabled + label {
      color: ${theme.palette.content.light};
    }

    &:hover {
      background: ${theme.palette.informative.light};
    }

    &:checked:not(:disabled):hover {
      background: ${theme.palette.informative.dark};
      border-color: ${theme.palette.informative.dark};
    }

    &:checked {
      background: ${theme.palette.informative.default};
    }

    &:disabled {
      pointer-events: none;
      cursor: not-allowed;
      border-color: ${theme.palette.informative.light};
      background-color: ${theme.palette.informative.light};
    }

    &:checked:before {
      content: "";
      width: 10px;
      height: 10px;
      background: ${theme.palette.surface.contrast};
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &[data-error="true"] {
      border-color: ${theme.palette.error.default};
    }

    &[data-error="true"]:hover {
      background-color: ${theme.palette.error.light};
    }

    &[data-error="true"]:disabled {
      background-color: ${theme.palette.error.light};
      border-color: ${theme.palette.error.light};
    }

    &[data-error="true"]:checked {
      background-color: ${theme.palette.error.default};
    }

    &[data-error="true"]:checked:disabled {
      background-color: ${theme.palette.error.light};
      border-color: ${theme.palette.error.light};
    }
    
    &[data-error="true"]:checked:not(:disabled):hover {
      background-color: ${theme.palette.error.dark};
      border-color: ${theme.palette.error.dark};
    }
  `}
`;

export const RadioLabelStyled = styled.label`
  ${({ theme }) => `
    ${theme.fontStyles.bodyLgRegular};
    color: ${theme.palette.content.default};
    cursor: inherit;
  `}
`;
