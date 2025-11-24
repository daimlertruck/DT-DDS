import { Scale } from '@dt-dds/react-core';
import { Dropdown } from '@dt-dds/react-dropdown';
import { Typography } from '@dt-dds/react-typography';
import { CustomTheme as Theme } from '@dt-dds/themes';
import styled from '@emotion/styled';

import { SelectFill, SelectVariant } from './types';

export const SelectStyled = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing_30};
`;

export interface SelectContainerStyledProps {
  isOpen?: boolean;
  variant?: SelectVariant;
  fill?: SelectFill;
  scale?: Scale;
}

const getThemedBackgroundFill = (fill: SelectFill, theme: Theme) =>
  ({
    default: theme.palette.surface.default,
    contrast: theme.palette.surface.contrast,
    light: theme.palette.surface.light,
  }[fill]);

type TypographyValueStyledProps = {
  scale?: Scale;
  isFloatingLabel?: boolean;
};

export const TypographyValueStyled = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'scale' && prop !== 'isFloatingLabel',
})<TypographyValueStyledProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ theme, scale, isFloatingLabel }) => `
    ${
      isFloatingLabel
        ? `padding-top: ${
            scale === 'standard'
              ? theme.spacing.spacing_50
              : theme.spacing.spacing_40
          };`
        : `padding-block: ${
            scale === 'standard'
              ? theme.spacing.spacing_30
              : theme.spacing.spacing_20
          };`
    }
  `}
`;

export const SelectContainerStyled = styled.div<SelectContainerStyledProps>`
  transition: border 0.2s ease-in-out;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({
    theme,
    isOpen = false,
    variant = 'outlined',
    fill = 'default',
    scale,
  }) => `
    ${theme.fontStyles.bodyMdRegular}
    color: ${theme.palette.content.default};
    padding: ${
      scale === 'standard'
        ? theme.spacing.spacing_40
        : `${theme.spacing.spacing_30} ${theme.spacing.spacing_40}`
    };
    gap: ${theme.spacing.spacing_30};
    background-color: ${getThemedBackgroundFill(fill, theme)};
    border-radius: ${theme.shape.formField};
    cursor: pointer;
    user-select: none;



    border-width: ${variant === 'outlined' ? '1px' : '0 0 1px'};
    border-color: ${
      isOpen ? theme.palette.informative.default : theme.palette.border.medium
    };
    border-style: solid;

    &:not([disabled]){
      &:focus-visible {
        outline: 2px solid ${theme.palette.primary.default};
        outline-offset: 1px; 
      }

      &:not([aria-invalid="true"]){
        &:focus-visible, &:hover {
          border-color: ${theme.palette.informative.default};
        }
      }

      &[aria-invalid="true"]{
        border-color: ${theme.palette.error.default};

        i {
          color: ${theme.palette.error.default}
        } 
      }
    }

    &[disabled] {
      color: ${theme.palette.content.light};
      cursor: not-allowed;

      i {
        color: inherit;
      }
    }
  `};
`;

interface SelectActionContainerStyledProps
  extends Pick<SelectContainerStyledProps, 'scale'> {
  hasItems: boolean;
  isFloatingLabel: boolean;
}

export const SelectActionContainerStyled = styled.div<SelectActionContainerStyledProps>`
  display: flex;

  ${({ scale, hasItems, isFloatingLabel, theme }) => `
    gap: ${theme.spacing.spacing_30};

    ${
      (!hasItems || !isFloatingLabel) &&
      `padding-block: ${
        scale === 'standard'
          ? theme.spacing.spacing_20
          : theme.spacing.spacing_10
      }`
    }
  `}
`;
export const TypographyHelperTextStyled = styled(Typography)`
  ${({ theme }) => `
    padding-left: ${theme.spacing.spacing_40};
  `}
`;

export const SelectDropdownStyled = styled(Dropdown)`
  max-height: 200px;

  ${({ theme }) => `
    padding: ${theme.spacing.spacing_50} ${theme.spacing.spacing_0};
    background-color: ${theme.palette.surface.contrast};
    border-radius: ${theme.shape.dropdown};
    border: 1px solid ${theme.palette.border.medium};
  `}
`;
