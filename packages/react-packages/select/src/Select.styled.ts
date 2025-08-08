import { DROPDOWN_MENU_Z_INDEX } from '@dt-dds/react-core';
import { CustomTheme as Theme } from '@dt-dds/themes';
import styled from '@emotion/styled';

import { SelectFill, SelectVariant } from './types';

export const SelectStyled = styled.div`
  position: relative;
  width: 100%;
`;

export interface SelectContainerStyledProps {
  hasError: boolean;
  disabled?: boolean;
  isOpen?: boolean;
  variant?: SelectVariant;
  fill?: SelectFill;
}

const getThemedBackgroundFill = (fill: SelectFill, theme: Theme) =>
  ({
    default: theme.palette.surface.default,
    contrast: theme.palette.surface.contrast,
    light: theme.palette.surface.light,
  }[fill]);

export const SelectFieldStyled = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  position: relative;
  flex-direction: column;
  overflow: hidden;
`;

export interface LabelFieldProps {
  isActive: boolean;
  disabled?: boolean;
}

export const SelectMenuStyled = styled.ul<{ isOpen: boolean }>`
  list-style-type: none;
  position: absolute;
  z-index: ${DROPDOWN_MENU_Z_INDEX};
  width: 100%;
  max-height: 180px;
  overflow: auto;

  ${({ isOpen, theme }) => `
    margin-top:${theme.spacing['5xs']};
    padding:  ${theme.spacing['2xs']} ${theme.spacing.none};
    background-color: ${theme.palette.surface.contrast};
    display: ${isOpen ? 'block' : 'none'};
    border-radius: ${theme.shape.formField};
    box-shadow: ${theme.shadows.s};
  `}
`;

export const SelectValueContainerStyled = styled.div`
  display: flex;
  flex: 1;
  align-self: end;
  overflow: hidden;
`;

export const SelectValueStyled = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ theme }) => `
    ${theme.fontStyles.body2}
    color: ${theme.palette.content.default};
  `}
`;

export const SelectContainerStyled = styled.div<SelectContainerStyledProps>`
  transition: all 0.2s ease-in-out;
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({
    theme,
    hasError,
    disabled,
    isOpen = false,
    variant = 'outlined',
    fill = 'default',
  }) => `
    ${theme.fontStyles.body2}
    color: ${
      disabled ? theme.palette.content.light : theme.palette.content.default
    };
    padding: ${theme.spacing['4xs']} ${theme.spacing['3xs']};
    gap: ${theme.spacing['4xs']} ;
    background-color: ${getThemedBackgroundFill(fill, theme)};
    border-radius: ${theme.shape.formField};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};

    border-width: ${variant === 'outlined' ? '1px' : '0 0 1px'};
      border-color: ${
        isOpen ? theme.palette.content.dark : theme.palette.border.medium
      };
      border-style: solid;

      &:focus, &:hover {
        border-color: ${
          hasError ? theme.palette.error.default : theme.palette.content.dark
        };
      }

      ${hasError && `border-color: ${theme.palette.error.default}`};
  `};
`;

export const SelectActionContainerStyled = styled.div`
  display: flex;
`;

export const HelperSelectFieldMessageStyled = styled.div`
  ${({ theme }) => `
    padding-left: ${theme.spacing['2xs']};
  `}
`;
