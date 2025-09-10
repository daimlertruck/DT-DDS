import styled from '@emotion/styled';

import { TagBorder, TagColor, TagSize, TagVariant } from './constants';
import { tagVariantColors, tagSizeStyles } from './utils';

interface TagStyledProps {
  hasHover: boolean;
  isClickable: boolean;
  isDisabled: boolean;
  isDismissible: boolean;
  variant: TagVariant;
  color: TagColor;
  border: TagBorder;
  size: TagSize;
}

export const TagStyled = styled.div<TagStyledProps>(
  ({
    theme,
    border,
    isDisabled,
    isClickable,
    isDismissible,
    size,
    variant,
    color,
    hasHover,
  }) => ({
    ...tagSizeStyles(theme, size),
    ...tagVariantColors({ theme, variant, color, hasHover, isDisabled }),

    display: 'flex',
    textTransform: 'uppercase',
    alignItems: 'center',
    maxWidth: 'max-content',
    gap: theme.spacing.spacing_20,
    borderRadius: theme.radius[border === 'rounded' ? 'radius_70' : 'radius_0'],
    width: '150px',

    ['> :first-child']: {
      whiteSpace: 'nowrap',
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },

    ...((isClickable || isDismissible) && { userSelect: 'none' }),
    ...(isClickable && { cursor: 'pointer' }),
    ...(isDisabled && { cursor: 'not-allowed' }),

    ['&:focus-visible']: {
      outline: `2px solid ${theme.palette.border.dark}`,
      outlineOffset: '1px',
    },
  })
);

export const TagButtonCloseStyled = styled.button`
  ${({ theme }) => ({
    backgroundColor: 'transparent',
    color: 'currentColor',
    display: 'inherit',
    border: 0,
    cursor: 'pointer',

    ['&:disabled']: { cursor: 'not-allowed' },

    ['&:focus-visible']: {
      outline: `2px solid ${theme.palette.border.dark}`,
      outlineOffset: '1px',
    },
  })}
`;
