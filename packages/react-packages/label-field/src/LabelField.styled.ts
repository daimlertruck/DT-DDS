import { CustomTheme as Theme } from '@dt-dds/themes';
import styled from '@emotion/styled';

export interface LabelFieldProps {
  isActive: boolean;
  disabled?: boolean;
  hasError?: boolean;
  isFloating?: boolean;
}

const labelColorState = (
  isDisabled: boolean,
  hasError: boolean,
  isFloating: boolean,
  theme: Theme
) => {
  if (isDisabled) {
    return theme.palette.content.light;
  }
  if (hasError) {
    return theme.palette.error.default;
  }
  return isFloating
    ? theme.palette.content.medium
    : theme.palette.content.default;
};

const floatingLabel = (isActive: boolean, theme: Theme) => {
  return `${isActive ? theme.fontStyles.body3 : theme.fontStyles.body2}

  left: 12px;
  top: 16px;
  position: absolute;

  transform: ${isActive ? 'translateY(-45%)' : 'translateY(0)'};
  transition: transform 150ms ease-out, font-size 150ms ease-out;
  `;
};

export const LabelFieldStyled = styled.label<LabelFieldProps>`
  ${({ theme, isActive, isFloating, disabled, hasError }) => `
   ${theme.fontStyles.body2Bold};

    color: ${labelColorState(disabled!, hasError!, isFloating!, theme)};
    cursor: inherit;

    ${isFloating && floatingLabel(isActive, theme)}
  `};
`;
