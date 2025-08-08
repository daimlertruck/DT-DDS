import { CustomTheme as Theme } from '@dt-dds/themes';

import { TagColor, TagVariant } from '../constants';

interface TagVariantColors {
  border: string | number;
  color: string;
  borderColor?: string;
  backgroundColor: string;
  '&:hover'?: {
    borderColor?: string;
    backgroundColor: string;
    color: string;
  };
}

interface TagVariantColorsProps {
  theme: Theme;
  color: TagColor;
  variant: TagVariant;
  hasHover: boolean;
  isDisabled: boolean;
}

const getColors = (
  variant: TagVariant,
  theme: Theme,
  isDisabled: boolean,
  color: TagColor
) => {
  const resolvedColor = (
    color === 'primary' ? 'accent' : color
  ) as keyof typeof theme.palette;

  if (variant === 'solid') {
    const palette = theme.palette[resolvedColor];

    return {
      bgColor: isDisabled ? palette.light : palette.default,
      hoveredBgColor: palette.dark,
    };
  }

  if (variant === 'outlined') {
    const palette = theme.palette[resolvedColor];
    return {
      bgColor: palette.light,
      hoveredBgColor: palette.medium,
      borderTextColor: isDisabled ? palette.medium : palette.default,
      hoveredBorderTextColor: palette.dark,
    };
  }
};

export const tagVariantColors = ({
  theme,
  color,
  variant,
  hasHover,
  isDisabled,
}: TagVariantColorsProps): TagVariantColors => {
  const colors = getColors(variant, theme, isDisabled, color);

  return {
    solid: {
      border: theme.spacing.none,
      color: theme.palette.content.contrast,
      backgroundColor: colors?.bgColor,
      ...(hasHover && {
        '&:hover': {
          backgroundColor: colors?.hoveredBgColor,
          color: theme.palette.content.contrast,
        },
      }),
    },
    outlined: {
      border: `1px solid ${colors?.borderTextColor}`,
      color: colors?.borderTextColor,
      backgroundColor: colors?.bgColor,
      ...(hasHover && {
        '&:hover': {
          borderColor: colors?.hoveredBorderTextColor,
          color: colors?.hoveredBorderTextColor,
          backgroundColor: colors?.hoveredBgColor,
        },
      }),
    },
  }[variant];
};
