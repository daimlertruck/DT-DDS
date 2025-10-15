import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { ToastType } from './constants';

interface ToastProps {
  type: ToastType;
}

interface ToastStyledProps extends ToastProps {
  isVisible: boolean;
}

interface ToastButtonCloseStyledProps {
  toastType: ToastType;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const ToastStyled = styled.div<ToastStyledProps>`
  display: flex;
  flex-direction: column;
  width: 360px;
  animation: ${fadeIn} 0.75s ease-in;
  transition: all 0.75s ease-in-out;
  overflow: hidden;
  ${({ theme, isVisible, type }) => `
    border: 1px solid ${theme.palette[type].default};
    border-left: 6px solid ${theme.palette[type].default};
    background-color: ${theme.palette[type].light};
    opacity: ${isVisible ? 1 : 0};
    border-radius: ${theme.shape.toast};
    padding: ${theme.spacing.spacing_50} ${theme.spacing.spacing_50} ${
    theme.spacing.spacing_50
  } ${theme.spacing.spacing_30};
  `}
`;

export const ToastMessageStyled = styled.div<ToastProps>`
  ${({ theme, type }) => `
    ${theme.fontStyles.bodyMdRegular};
    color: ${theme.palette[type].dark};
    overflow: hidden;
    word-break: break-word;
    hyphens: auto;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    margin-inline: calc(24px + ${theme.spacing.spacing_30})
  `}
`;

export const ToastButtonCloseStyled = styled.button<ToastButtonCloseStyledProps>`
  ${({ theme, toastType }) => `
    color: ${theme.palette[toastType].dark};
    border: 0;
    cursor: pointer;
    background: transparent;
    align-self: flex-start;
    margin-left: auto;
    font-size: 0;
    line-height: 0;

    &:focus-visible {
      outline: 2px solid ${theme.palette.primary.default};
      outline-offset: 1px;
    }
    
  `}
`;

export const ActionsContainer = styled.div<ToastProps>`
  ${({ theme, type }) => `
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: ${theme.spacing.spacing_20};
    margin-top: ${theme.spacing.spacing_30};

    button {
      color: ${theme.palette[type].dark};
      
      &:hover {
        background-color: ${theme.palette[type].medium};
        color: ${theme.palette[type].dark};
      }
    }
`}
`;
