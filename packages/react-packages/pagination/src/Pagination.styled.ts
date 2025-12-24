import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

import { PAGINATION_BUTTON_SIZES, ITEMS_PER_PAGE_WIDTH } from './constants';

interface PaginationPageButtonStyledProps {
  $isActive?: boolean;
}

export const PaginationStyled = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100%;
  gap: 12px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mq3}px) {
    flex-direction: row;
    justify-content: center;

    &:has(> *:nth-of-type(2)) {
      justify-content: space-between;
    }
  }
`;

export const InfoWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.mq3}px) {
    width: auto;
    flex-shrink: 0;
  }
`;

export const NavigationWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
  flex-shrink: 0;
  flex-wrap: nowrap;
`;

export const PaginationButtonStyled = styled.button`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${PAGINATION_BUTTON_SIZES}px;
    height: ${PAGINATION_BUTTON_SIZES}px;
    padding: 0;
    border: none;
    position: relative;
    background-color: transparent; 
    color: ${theme.palette.content.default};
    cursor: pointer;

    &:disabled {
      i {
        color: ${theme.palette.content.light};
      }
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: ${theme.palette.informative.light};
    }

    &:focus-visible {
      outline: 2px solid ${theme.palette.primary.default};
      outline-offset: 1px;
    }
  `}
`;

export const PaginationPageButtonStyled = styled('button', {
  shouldForwardProp: (prop) => isPropValid(prop) && !prop.startsWith('$'),
})<PaginationPageButtonStyledProps>`
  ${({ theme, $isActive }) => `
    ${theme.fontStyles.bodyXsBold};
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${PAGINATION_BUTTON_SIZES}px;
    height: ${PAGINATION_BUTTON_SIZES}px;
    border: none;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    background-color: transparent; 
    color: ${theme.palette.content.default};
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid ${theme.palette.primary.default};
      outline-offset: 1px;
      transition: none;
    }

    &:hover {
      background-color: ${theme.palette.informative.light};
    }

    ${
      $isActive &&
      `
        background-color: ${theme.palette.primary.default};
        color: ${theme.palette.content.contrast};
        cursor: default;

        &:hover {
          background-color: ${theme.palette.primary.default};
        }
      `
    }
  `}
`;

export const TruncationTextStyled = styled.span`
  ${({ theme }) => `
    ${theme.fontStyles.bodyMdRegular};
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${PAGINATION_BUTTON_SIZES}px;
    height: ${PAGINATION_BUTTON_SIZES}px;
    color: ${theme.palette.content.default};
    user-select: none;
  `}
`;

export const ItemsPerPageWrapperStyled = styled.div`
  ${({ theme }) => `
    label:empty {
      display: none;
    }

    @media screen and (min-width: ${theme.breakpoints.mq3}px) {
      min-width: ${ITEMS_PER_PAGE_WIDTH}px;
    }
  `}
`;

export const ItemsInfoTextStyled = styled.span`
  ${({ theme }) => `
    ${theme.fontStyles.bodySmRegular};
    white-space: nowrap;
  `}
`;
