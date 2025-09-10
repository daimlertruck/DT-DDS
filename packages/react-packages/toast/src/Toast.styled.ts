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

export const ToastIconStyled = styled.div<ToastIconStyledProps>`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  ${({ theme, type }) => `
    background-color: ${theme.palette[type].default};  
    color: ${theme.palette.content.contrast}
`}
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const ToastStyled = styled.div<ToastStyledProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 360px;
  animation: ${fadeIn} 0.75s ease-in;
  transition: all 0.75s ease-in-out;
  overflow: hidden;
  ${({ theme, isVisible }) => `
    background-color: ${theme.palette.surface.contrast};  
    opacity: ${isVisible ? 1 : 0};
    color: ${theme.palette.content.default};
    border-radius: ${theme.shape.toast};
    box-shadow: ${theme.shadows.elevation_200};
  `}
`;

export const ToastContentStyled = styled.div`
  ${({ theme }) => `
    height: 100%;
    flex-grow: 1;
    padding: ${theme.spacing.spacing_50} ${theme.spacing.spacing_50};
  `}
`;

export const ToastTitleStyled = styled.div`
  ${({ theme }) => `
      ${theme.fontStyles.h6};
      color: ${theme.palette.content.dark};
      margin-bottom: ${theme.spacing.spacing_20};
      text-transform: capitalize;
  `}
`;

export const ToastMessageStyled = styled.div`
  ${({ theme }) => `
    ${theme.fontStyles.bodyMdRegular};
    color: ${theme.palette.content.default};
    overflow: hidden;
    word-break: break-word;
    hyphens: auto;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  `}
`;

export const ToastButtonCloseStyled = styled.button`
  ${({ theme }) => `
    color: ${theme.palette.content.default};
    border: 0;
    cursor: pointer;
    background: transparent;
    align-self: flex-start;
    font-size: 0;
    line-height: 0;
  
    &:hover {
      background-color: ${theme.palette.surface.contrast};
    }
  `}
`;

interface ToastTextContainerProps {
  hasCloseButton: boolean;
}

export const ToastTextContainer = styled.div<ToastTextContainerProps>`
  ${({ theme, hasCloseButton }) => `
    display: grid;
    ${
      hasCloseButton
        ? 'grid-template-columns: auto 24px;'
        : 'grid-template-rows: auto auto;'
    }
    column-gap: ${theme.spacing.spacing_50};
  `}
`;

interface ToastActionsProps {
  hasChildren: boolean;
}

export const ToastActionsStyled = styled.div<ToastActionsProps>`
  ${({ theme, hasChildren }) => `
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: ${hasChildren ? theme.spacing.spacing_20 : 0};
  `}
`;
