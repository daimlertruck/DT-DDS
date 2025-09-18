import styled from '@emotion/styled';

import {
  TextAreaVariant,
  TextAreaBackgroundFill,
  getThemedBackgroundFill,
} from './constants';

export interface TextAreaStyledProps {
  backgroundFill: TextAreaBackgroundFill;
  enableResize?: boolean;
  hasError?: boolean;
}

interface ContainerStyledProps {
  variant: TextAreaVariant;
  backgroundFill: TextAreaBackgroundFill;
  hasError?: boolean;
}

export const TextAreaWrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
    width: 100%;
    
    border-style: solid;
    border-width: 0;
    border-color: ${theme.palette.border.dark};
  `}
`;

export const TextAreaMessageStyled = styled.div`
  ${({ theme }) => `padding-left: ${theme.spacing.spacing_50}`};
`;

export const TextAreaMessages = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
`;

export const TextAreaStyled = styled.textarea<TextAreaStyledProps>`
  ${({ theme, enableResize = false, backgroundFill }) => `
    ${theme.fontStyles.bodyLgRegular}

    background-color: ${getThemedBackgroundFill(backgroundFill, theme)};

    border-style: none;
    width: 100%;
    color: ${theme.palette.content.dark};
    resize: ${enableResize ? 'vertical' : 'none'};
    outline: none;
    padding-right: 10px;
  `}
`;

export const ContainerStyled = styled.div<ContainerStyledProps>`
  ${({ theme, variant, hasError = false, backgroundFill }) => {
    const borderColor = hasError
      ? theme.palette.error.default
      : theme.palette.primary.default;

    return `
    background-color: ${getThemedBackgroundFill(backgroundFill, theme)};
    position: relative;
    padding: 25px 0px 0px 10px;
    width: 100%;

    ${
      variant === 'outlined'
        ? `border-radius: ${theme.shape.formField};
            border: 1px solid ${
              hasError
                ? theme.palette.error.default
                : theme.palette.border.default
            };
            &:focus-within, 
            &:hover { 
              border: 1px solid ${borderColor};
            }
          `
        : `border-radius: ${theme.shape.formField} ${theme.shape.formField} 0 0;
            border-bottom: 1px solid ${
              hasError
                ? theme.palette.error.default
                : theme.palette.border.default
            };
            &:focus-within, 
            &:hover { 
              border-bottom: 1px solid  ${borderColor};
            }
          `
    };

    ${variant === 'outlined' ? 'border-width: 1px' : 'border-width: 0 0 1px'};
  `;
  }}
`;
