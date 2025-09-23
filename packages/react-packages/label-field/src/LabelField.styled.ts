import { CustomTheme as Theme } from '@dt-dds/themes';
import styled from '@emotion/styled';

export interface LabelFieldProps {
  isActive: boolean;
  disabled: boolean;
  hasError: boolean;
  isFloating: boolean;
  isInputFilled: boolean;
}

const labelColorState = ({
  isDisabled,
  hasError,
  isFloating,
  isActive,
  theme,
}: {
  isDisabled: boolean;
  hasError: boolean;
  isFloating: boolean;
  isActive: boolean;
  theme: Theme;
}) => {
  if (isDisabled) {
    return theme.palette.content.light;
  }

  if (hasError) {
    return theme.palette.error.default;
  }

  if (isActive && !isFloating) {
    return theme.palette.informative.default;
  }

  return isFloating
    ? theme.palette.content.medium
    : theme.palette.content.default;
};

const floatingLabel = (
  isActive: boolean,
  isInputFilled: boolean,
  theme: Theme
) => {
  return `
  
  ${theme.fontStyles.bodySmRegular}

  left: 12px;
  top: 16px;
  position: absolute;

  transform: ${
    isActive || isInputFilled ? 'translateY(-45%)' : 'translateY(0)'
  };
  transition: transform 150ms ease-out, font-size 150ms ease-out;
  `;
};

export const LabelFieldStyled = styled.label<LabelFieldProps>`
  ${({ theme, isActive, isFloating, disabled, hasError, isInputFilled }) => `
   ${theme.fontStyles.bodyMdBold};

    color: ${labelColorState({
      isDisabled: disabled,
      hasError,
      isFloating,
      isActive,
      theme,
    })};
    cursor: inherit;

    ${isFloating && floatingLabel(isActive, isInputFilled, theme)}
  `};
`;
