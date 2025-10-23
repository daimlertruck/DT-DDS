import styled from '@emotion/styled';

import {
  TextFieldVariant,
  TextFieldScale,
  TextFieldBackgroundFill,
  getThemedBackgroundFill,
} from './constants';

export interface InputFieldStyledProps {
  isFloatingLabel: boolean;
  isSearchType: boolean;
}

export interface InputWrapperStyledProps {
  isFloatingLabel: boolean;
  variant: TextFieldVariant;
  scale: TextFieldScale;
  backgroundFill: TextFieldBackgroundFill;
  hasError: boolean;
}

export const TextFieldStyled = styled.div<{
  isFloatingLabel?: boolean;
  hasPrefix?: boolean;
}>`
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

    :has(input[readonly]:not(input[disabled])) {
      i, label, label > span {
        color: ${theme.palette.content.medium};
      }
    }

    &:has(input[readonly]:not(input[disabled])) {
      &:hover {
        label {
          color: ${
            isFloatingLabel
              ? theme.palette.content.medium
              : theme.palette.informative.default
          };
        }
      }
    }
  `}

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
`;

export const InputFieldStyled = styled.input<InputFieldStyledProps>`
  ${({ theme, isFloatingLabel, isSearchType }) => `
    ${theme.fontStyles.bodyMdRegular}
    border: 0;
    outline: 0;
    width: 100%;
    background-color: inherit;
    color: ${theme.palette.content.default};
  
    &:read-only {
      color: ${theme.palette.content.medium};
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
    }

    &::placeholder {
      color: ${isFloatingLabel ? 'transparent' : theme.palette.content.medium};
    }

    &:not(:focus)::placeholder {
      color: 'transparent';
    }

    &:focus::placeholder {
      color: ${theme.palette.content.medium}; 
    }

    &:disabled {
      color: ${theme.palette.content.light};
    }

    padding: ${
      isFloatingLabel && !isSearchType
        ? `${theme.spacing.spacing_50} 0 0 0`
        : ''
    };
  `}
`;

export const InputExtraPrefixStyled = styled.div<{ isClickable?: boolean }>`
  ${({ theme, onClick }) => {
    const isClickable = !!onClick;

    return `
    display: flex;
    cursor: ${isClickable ? 'pointer' : 'default'};

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

export const TextFieldMessageStyled = styled.div`
  padding-left: ${({ theme }) => theme.spacing.spacing_40};
`;

export const ResetInputIconStyled = styled.div`
  ${({ theme }) => `
    cursor: pointer;
    display: flex;

    :hover > i {
      color: ${theme.palette.content.dark}
    }
  `}
`;

export const InputWrapperStyled = styled.div<InputWrapperStyledProps>`
  ${({ theme, isFloatingLabel, variant, backgroundFill, hasError, scale }) => {
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
    height: ${scale === 'compact' ? '44px' : '56px'};
    color: ${theme.palette.content.default};
    gap: ${theme.spacing.spacing_30};
    background-color: ${getThemedBackgroundFill(backgroundFill, theme)};
    
    padding-inline: ${theme.spacing.spacing_40};

    ${!isFloatingLabel && 'margin-top: 8px'};

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
      background-color: ${theme.palette.surface.contrast};

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
