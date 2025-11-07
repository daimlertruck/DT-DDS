import styled from '@emotion/styled';

import { checkboxStyles } from './utils/checkboxStyles';

export interface CheckBoxInputWrapperProps {
  isChecked: boolean;
  isDisabled: boolean;
}

export interface CheckboxLabelStyledProps {
  isDisabled: boolean;
  isChecked: boolean;
}

export const CheckboxStyled = styled.label<CheckBoxInputWrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;

  ${({ theme, isChecked, isDisabled }) => `
    & > div {
      border-radius: ${theme.shape.checkbox};
      ${checkboxStyles(theme, isChecked, isDisabled)}
    }
    cursor: ${isDisabled ? 'not-allowed' : 'pointer'};

    &:hover > div {
      ${
        !isDisabled &&
        !isChecked &&
        `
         border: 1px solid ${theme.palette.primary.default};
      `
      };
     }
  `}
`;

export const CheckBoxInputWrapper = styled.div`
  height: 20px;
  min-height: 20px;
  width: 20px;
  min-width: 20px;
  position: relative;
  display: flex;
`;

export const CheckboxInputStyled = styled.input`
  cursor: pointer;
  appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const CheckboxLabelStyled = styled.span<CheckboxLabelStyledProps>`
  user-select: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  ${({ theme, isDisabled }) => `
    padding-left: ${theme.spacing.spacing_30};
    ${theme.fontStyles.bodyMdRegular};
    color: ${
      isDisabled ? theme.palette.content.medium : theme.palette.content.default
    };
  `}
`;
