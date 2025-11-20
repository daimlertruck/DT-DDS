import { ComponentSize } from '@dt-dds/react-core';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { IconButtonVariant } from './constants';

export interface IconButtonStyledProps {
  variant?: IconButtonVariant;
  size?: ComponentSize;
  cssOverrides?: ReturnType<typeof css>;
}

const iconButtonSizeStyles: Record<ComponentSize, string> = {
  'extra-small': `
    font-size: 12px;
  `,
  small: `
    font-size: 16px;
  `,
  medium: `
    font-size: 20px;
  `,
  large: `
    font-size: 24px;
  `,
  'extra-large': `
    font-size: 32px;
  `,
};

export const IconButtonStyled = styled.button<IconButtonStyledProps>(
  ({ theme, disabled, variant = 'default', size = 'large', cssOverrides }) => {
    const isDefaultVariant = variant === 'default';

    const baseColor = () => {
      if (disabled) {
        return isDefaultVariant
          ? theme.palette.content.light
          : theme.palette.content.default;
      }

      return isDefaultVariant
        ? theme.palette.content.default
        : theme.palette.content.contrast;
    };

    const hoverColor = isDefaultVariant
      ? theme.palette.accent.default
      : theme.palette.accent.medium;

    const baseStyles = `
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: ${disabled ? 'not-allowed' : 'pointer'};

      > i {
        ${iconButtonSizeStyles[size]};
        color: ${baseColor()};
      }

      &:not(:disabled) > i {
        &:hover, &:active {
          color: ${hoverColor};
        }
      }

      &:focus-visible {
        outline: 2px solid ${theme.palette.primary.default};
      }

      &:hover:not(:disabled) {
        [data-avatar-type='letter'] {
          background-color: ${theme.palette.primary.dark};
        }

        [data-avatar-type='collapsed'] {
          background-color: ${theme.palette.primary.light};
        }

        [data-avatar-type='thumbnail'] {
          background-color: ${theme.palette.primary.dark};
        }
      }

    ${
      disabled &&
      `
        [data-avatar-type='letter'] {
          background-color: ${theme.palette.primary.light};
        }

        [data-avatar-type='collapsed'] {
          background-color: ${theme.palette.surface.contrast};
        }

        [data-avatar-type='thumbnail'] {
          background-color: ${theme.palette.primary.light};
        }

        [data-avatar-type='photo'] {
          opacity: 0.38;
        }
      `
    }
    `;

    return cssOverrides ? [baseStyles, cssOverrides] : baseStyles;
  }
);
