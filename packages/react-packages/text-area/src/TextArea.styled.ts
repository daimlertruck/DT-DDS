import styled from '@emotion/styled';

import {
  TextAreaVariant,
  TextAreaBackgroundFill,
  getThemedBackgroundFill,
} from './constants';

export interface TextAreaStyledProps {
  backgroundFill: TextAreaBackgroundFill;
  enableResize: boolean;
  variant: TextAreaVariant;
  hasError: boolean;
  isFloatingLabel: boolean;
  hasLabel: boolean;
}

export const TextAreaStyled = styled.textarea<TextAreaStyledProps>`
  ${({
    theme,
    enableResize,
    backgroundFill,
    variant,
    hasError,
    isFloatingLabel,
    hasLabel,
  }) => {
    const borderColor = hasError
      ? theme.palette.error.default
      : theme.palette.informative.default;

    return `
    ${theme.fontStyles.bodyMdRegular}

    background-color: ${getThemedBackgroundFill(backgroundFill, theme)};
    min-height: 100px;
    width: 100%;
    outline: none;
    color: ${theme.palette.content.default};
    resize: ${enableResize ? 'vertical' : 'none'};
    padding: ${isFloatingLabel && hasLabel ? '24px 12px 12px 12px' : '12px'};
    border: 0;

    ${!isFloatingLabel && hasLabel && 'margin-top: 8px'};

    ::placeholder {
      color: ${theme.palette.content.medium};
    }

    ${
      variant === 'outlined'
        ? `border-radius: ${theme.shape.formField};
            border: 1px solid ${
              hasError
                ? theme.palette.error.default
                : theme.palette.border.medium
            };

            &:focus-within,
            &:hover:not([disabled]) { 
              border: 1px solid ${borderColor};
            }
          `
        : `border-radius: ${theme.shape.formField} ${theme.shape.formField} 0 0;
            border-bottom: 1px solid ${
              hasError
                ? theme.palette.error.default
                : theme.palette.border.medium
            };
           
            &:focus-within,
            &:hover:not([disabled]) { 
              border-bottom: 1px solid  ${borderColor};
            }
          `
    };

    &:read-only:not(:disabled) {
      border-color: ${theme.palette.border.default};
      color: ${theme.palette.content.medium};
      background-color: ${theme.palette.surface.light};

      &:focus-within,
      &:hover { 
       ${
         variant === 'outlined'
           ? `border: 1px solid ${borderColor};`
           : `border-bottom: 1px solid ${borderColor}`
       }
      }
    }

    &:disabled {
      cursor: not-allowed;
      color: ${theme.palette.content.light};
    } 
  `;
  }}
`;
