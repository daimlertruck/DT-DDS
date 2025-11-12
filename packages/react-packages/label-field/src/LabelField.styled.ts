import styled from '@emotion/styled';

import { Scale } from '@dt-dds/react-core';
import { CustomTheme as Theme } from '@dt-dds/themes';

export interface LabelFieldProps {
  isActive: boolean;
  disabled: boolean;
  hasError: boolean;
  isFloating: boolean;
  isInputFilled: boolean;
  isCentered?: boolean;
  scale?: Scale;
}

interface labelColorStateProps {
  isDisabled: boolean;
  hasError: boolean;
  isFloating: boolean;
  isActive: boolean;
  theme: Theme;
}

const labelColorState = ({
  isDisabled,
  hasError,
  isFloating,
  isActive,
  theme,
}: labelColorStateProps) => {
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
  isCentered: boolean,
  scale: Scale,
  theme: Theme
) => {
  const activeTop =
    scale === 'compact' ? theme.spacing.spacing_30 : theme.spacing.spacing_40;

  return `
    ${
      isActive || isInputFilled
        ? theme.fontStyles.bodySmRegular
        : theme.fontStyles.bodyMdRegular
    }

  left: 12px;
  position: absolute;
  top: ${!isActive && isCentered ? '50%' : activeTop};
  transform: ${!isActive && isCentered ? 'translateY(-50%)' : 'translateY(0)'};
  transition: all 150ms ease-out;
  `;
};

export const LabelFieldStyled = styled.label<LabelFieldProps>`
  ${({
    theme,
    isActive,
    isFloating,
    disabled,
    hasError,
    isInputFilled,
    isCentered = false,
    scale = 'standard',
  }) => `
   ${theme.fontStyles.bodyMdBold};

    color: ${labelColorState({
      isDisabled: disabled,
      hasError,
      isFloating,
      isActive,
      theme,
    })};
    cursor: inherit;

    ${
      isFloating &&
      floatingLabel(isActive, isInputFilled, isCentered, scale, theme)
    }
  `};
`;
