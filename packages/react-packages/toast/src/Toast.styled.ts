import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { ToastType } from './constants';

interface ToastStyledProps {
  type: ToastType;
  isVisible: boolean;
}

interface ToastIconStyledProps {
  type: ToastType;
}

interface ToastButtonCloseStyledProps {
  toastType: ToastType;
}

interface ToastMessageStyledProps {
  type: ToastType;
}

export const ToastIconStyled = styled.div<ToastIconStyledProps>`
  display: flex;
  align-self: start;
  ${({ theme, type }) => `
    color: ${theme.palette[type].dark};  
`}
`;

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
    gap: ${theme.spacing.spacing_30};
  `}
`;

export const ToastMessageStyled = styled.div<ToastMessageStyledProps>`
  ${({ theme, type }) => `
    ${theme.fontStyles.bodyMdRegular};
    color: ${theme.palette[type].dark};
    overflow: hidden;
    word-break: break-word;
    hyphens: auto;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
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
  `}
`;
