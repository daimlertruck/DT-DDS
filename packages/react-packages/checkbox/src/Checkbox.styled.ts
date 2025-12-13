import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

import { Theme } from '@dt-dds/themes';

import { SIZES } from './constants';
import { CheckboxSize } from './types';

interface CheckboxBoxStyledProps {
  $checked: boolean;
  $disabled: boolean;
  $error: boolean;
  $indeterminate: boolean;
  $size: CheckboxSize;
}

interface CheckboxLabelStyledProps {
  $disabled: boolean;
  $size: CheckboxSize;
}

const getCheckboxColors = (theme: Theme) => ({
  disabled: {
    active: {
      bg: theme.palette.informative.light,
      border: 'transparent',
    },
    inactive: {
      bg: theme.palette.informative.light,
      border: theme.palette.informative.medium,
    },
  },
  default: {
    active: {
      normal: {
        bg: theme.palette.informative.default,
        border: 'transparent',
        hover: theme.palette.informative.dark,
      },
      error: {
        bg: theme.palette.error.default,
        border: 'transparent',
        hover: theme.palette.error.dark,
      },
    },
    inactive: {
      normal: {
        bg: theme.palette.surface.contrast,
        border: theme.palette.informative.default,
        hover: theme.palette.informative.light,
      },
      error: {
        bg: theme.palette.surface.contrast,
        border: theme.palette.error.default,
        hover: theme.palette.error.light,
      },
    },
  },
});

export const CheckboxStyled = styled('label', {
  shouldForwardProp: (prop) => isPropValid(prop) && !prop.startsWith('$'),
})<{ $disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  position: relative;
`;

export const CheckboxInputStyled = styled.input`
  appearance: none;
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
`;

export const CheckboxBoxStyled = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && !prop.startsWith('$'),
})<CheckboxBoxStyledProps>`
  pointer-events: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.shape.checkbox};

  ${({ theme, $checked, $indeterminate, $disabled, $error, $size }) => {
    const colors = getCheckboxColors(theme);
    const active = $checked || $indeterminate;

    const state = $disabled
      ? colors.disabled[active ? 'active' : 'inactive']
      : colors.default[active ? 'active' : 'inactive'][
          $error ? 'error' : 'normal'
        ];

    return `
      height: ${SIZES[$size]}px;
      min-height: ${SIZES[$size]}px;
      width: ${SIZES[$size]}px;
      min-width: ${SIZES[$size]}px;

      background-color: ${state.bg};
      border: 1px solid ${state.border};

      ${
        !$disabled && 'hover' in state
          ? `
            label:hover & {
              background-color: ${state.hover};
            }
          `
          : ''
      }
    `;
  }}

  input:focus-visible + & {
    outline: 2px solid ${({ theme }) => theme.palette.primary.default};
    outline-offset: 2px;
  }
`;

export const CheckboxLabelStyled = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && !prop.startsWith('$'),
})<CheckboxLabelStyledProps>`
  user-select: none;
  display: flex;
  align-items: center;

  ${({ theme, $disabled, $size }) => `
    padding-left: ${theme.spacing.spacing_30};
    ${
      $size === 'small'
        ? theme.fontStyles.bodyMdRegular
        : theme.fontStyles.bodyLgRegular
    };
    color: ${
      $disabled ? theme.palette.content.light : theme.palette.content.default
    };
  `}
`;
