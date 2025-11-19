import { Scale } from '@dt-dds/react-core';
import styled from '@emotion/styled';

import {
  TextFieldVariant,
  TextFieldBackgroundFill,
  getThemedBackgroundFill,
} from './constants';

export interface TextFieldStyledProps {
  isFloatingLabel?: boolean;
  hasPrefix?: boolean;
}

export interface InputFieldStyledProps {
  isFloatingLabel: boolean;
  scale: Scale;
}

export interface InputWrapperStyledProps {
  isFloatingLabel: boolean;
  variant: TextFieldVariant;
  backgroundFill: TextFieldBackgroundFill;
  hasError: boolean;
}

export const TextFieldStyled = styled.div<TextFieldStyledProps>`
  ${({ theme, isFloatingLabel = true, hasPrefix = false }) => `
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.spacing_20};
    width: 100%;
    position: relative;
    
    ${
      hasPrefix
        ? `
    label {
      left: 0;
      padding-left: ${isFloatingLabel ? theme.spacing.l : ''};
    }
    `
        : ''
    }

    :has(input[disabled]) {
      i, label > span {
        color: ${theme.palette.content.light};
      }
    }

    &:has(input[readonly]:not(input[disabled])) {
      i, label, label > span {
        color: ${theme.palette.content.medium};
      }
    }

    ${
      !isFloatingLabel &&
      `
        &:has(input[readonly]:not([disabled]):focus) {
          label {
            color: ${theme.palette.informative.default};
          }
        }
      `
    }
  `}

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`;

export const InputContainerStyled = styled.div<{
  isFloatingLabel: boolean;
}>`
  ${({ theme, isFloatingLabel }) => `
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${isFloatingLabel ? '0' : theme.spacing.spacing_30};
  `}
`;

export const InputFieldStyled = styled.input<InputFieldStyledProps>`
  ${({ theme, isFloatingLabel, scale }) => `
    ${theme.fontStyles.bodyMdRegular}
    border: 0;
    outline: 0;
    width: 100%;
    background-color: inherit;

    &:focus {
      outline: none;
    }
  
    &:read-only {
      color: ${theme.palette.content.medium};
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    }

    &[readonly]::placeholder,
    &[readonly]:focus::placeholder {
      color: transparent;
    }

    &::placeholder {
      color: ${isFloatingLabel ? 'transparent' : theme.palette.content.medium};
    }

    &:focus::placeholder {
      color: ${theme.palette.content.medium}; 
    }

    &:disabled {
      color: ${theme.palette.content.light};
    }

    color: ${theme.palette.content.default};

    ${
      scale === 'compact'
        ? `
        padding: ${
          isFloatingLabel
            ? `${theme.spacing.spacing_60} ${theme.spacing.spacing_40} ${theme.spacing.spacing_30} ${theme.spacing.spacing_40}`
            : `14px ${theme.spacing.spacing_30}`
        };
      `
        : `
        padding: ${
          isFloatingLabel
            ? `28px ${theme.spacing.spacing_40} ${theme.spacing.spacing_40}`
            : `20px ${theme.spacing.spacing_40}`
        };
      `
    }
  `}
`;

export const InputExtraPrefixStyled = styled.div<{ isClickable?: boolean }>`
  ${({ theme, onClick }) => {
    const isClickable = !!onClick;

    return `
    display: flex;
    cursor: ${isClickable ? 'pointer' : 'default'};
    padding-left: ${theme.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${theme.palette.border.dark};
      outline-offset: 1px;
    }

    ${
      isClickable &&
      `
        &:hover > i  {
          color: ${theme.palette.content.dark};
        }
      `
    }
  
  `;
  }}
`;

export const InputExtraSuffixStyled = styled.div<{ isClickable?: boolean }>`
  ${({ theme, onClick }) => {
    const isClickable = !!onClick;

    return `
    display: flex;
    cursor: ${isClickable ? 'pointer' : 'default'};
    margin-right: ${theme.spacing.spacing_40}};

    &:focus-visible {
      outline: 2px solid ${theme.palette.border.dark};
      outline-offset: 1px;
    }

    ${
      isClickable &&
      `
        &:hover > i  {
          color: ${theme.palette.primary.default};
        }
      `
    }
  `;
  }}
`;

export const TextFieldMessageStyled = styled.div`
  padding-left: ${({ theme }) => theme.spacing.spacing_40};
`;

export const InputWrapperStyled = styled.div<InputWrapperStyledProps>`
  ${({ theme, isFloatingLabel, variant, backgroundFill, hasError }) => {
    const borderColor = hasError
      ? theme.palette.error.default
      : theme.palette.border.medium;

    const borderFocusColor = hasError
      ? theme.palette.error.default
      : theme.palette.informative.default;

    return `
    display:flex;
    flex-direction: row;
    align-items: center;
    min-width: 198px;
    width: 100%;
    color: ${theme.palette.content.default};
    background-color: ${getThemedBackgroundFill(backgroundFill, theme)};
  
    ${
      variant === 'outlined'
        ? `border-radius: ${theme.shape.formField};
        border: 1px solid ${borderColor};

        &:focus-within,
        &:hover:not([disabled]) { 
          border: 1px solid ${borderFocusColor};
        }

        &:hover:([disabled]) { 
          border: 1px solid ${borderColor};
        }
      `
        : `border-radius: ${theme.shape.formField} ${theme.shape.formField} 0 0;
        border-bottom: 1px solid ${borderColor};
        
        &:focus-within,
        &:hover:not([disabled]) { 
          border-bottom: 1px solid  ${borderFocusColor};
        }
      `
    };

    &:has(input[readonly]:not([disabled])) {
      background-color: ${theme.palette.surface.light};
      border: 1px solid ${theme.palette.surface.default};

      &:focus-within, &:hover { 
          border: 1px solid  ${theme.palette.informative.default};
        }
    }

    &:has(input[disabled]), &:has(input[disabled]) > * {
      cursor: not-allowed;

      &:hover {
        border-color: ${borderColor};
      }

      input::placeholder {
        color: ${isFloatingLabel ? 'transparent' : theme.palette.content.light};
      }
    }
  `;
  }}
`;
