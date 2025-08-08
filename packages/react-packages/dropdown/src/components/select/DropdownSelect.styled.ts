import { CustomTheme as Theme } from '@dt-dds/themes';
import styled from '@emotion/styled';

import { DropdownFill, DropdownVariant } from '../../types';

interface SelectDropdownStyledProps {
  hasBorder?: boolean;
  hasError?: boolean;
  isOpen?: boolean;
  variant?: DropdownVariant;
  fill?: DropdownFill;
}

const getThemedBackgroundFill = (fill: DropdownFill, theme: Theme) =>
  ({
    default: theme.palette.surface.default,
    contrast: theme.palette.surface.contrast,
    light: theme.palette.surface.light,
  }[fill]);

export const SelectDropdownStyled = styled.button<SelectDropdownStyledProps>`
  ${({
    theme,
    hasBorder = true,
    hasError = false,
    isOpen = false,
    variant = 'outlined',
    fill = 'default',
  }) => {
    const borderColor = theme.palette.border.medium;
    const activeBorderColor = theme.palette.content.dark;
    const errorBorderColor = theme.palette.error.default;

    return `
      background: ${theme.palette.surface.contrast};
      padding: ${theme.spacing.xsmall} ${
      hasBorder ? theme.spacing.xmedium : '0'
    };
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      width: 100%;
      height: 53px;
      cursor: pointer;
      outline: none;

      background-color: ${getThemedBackgroundFill(fill, theme)};

      border-width: ${variant === 'outlined' ? '1px' : '0 0 1px'};
      border-color: ${isOpen ? activeBorderColor : borderColor};
      border-style: solid;

      &:focus, &:hover {
        border-color: ${hasError ? errorBorderColor : activeBorderColor};
      }

      ${hasError && `border-color: ${errorBorderColor}`};
      ${!hasBorder && 'border: none'};

      &:disabled {
        pointer-events: none;
      }
    `;
  }}
`;
