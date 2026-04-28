import styled from '@emotion/styled';

import { CustomTheme as Theme } from '@dt-dds/themes';

import { LinkSize, LinkColor, LinkFontWeight, LinkVariant } from '.';

interface LinkStyledProps {
  $disabled?: boolean;
  $size?: LinkSize;
  $variant?: LinkVariant;
  $color?: LinkColor;
  $fontWeight?: LinkFontWeight;
}

const fontStyleMap: Record<
  LinkVariant,
  Record<LinkSize, Record<LinkFontWeight, keyof Theme['fontStyles']>>
> = {
  inline: {
    large: { regular: 'linkLgRegular', bold: 'linkLgBold' },
    medium: { regular: 'linkMdRegular', bold: 'linkMdBold' },
    small: { regular: 'linkSmRegular', bold: 'linkSmBold' },
  },
  standalone: {
    large: { regular: 'bodyLgRegular', bold: 'bodyLgBold' },
    medium: { regular: 'bodyMdRegular', bold: 'bodyMdBold' },
    small: { regular: 'bodySmRegular', bold: 'bodySmBold' },
  },
};

const colorMap = (
  palette: Theme['palette']
): Record<LinkVariant, Record<LinkColor, Record<string, string>>> => ({
  inline: {
    primary: {
      default: palette.accent.default,
      hover: palette.accent.dark,
      active: palette.accent.medium,
      disabled: palette.content.light,
    },
    secondary: {
      default: palette.accent.default,
      hover: palette.accent.dark,
      active: palette.accent.medium,
      disabled: palette.content.light,
    },
  },
  standalone: {
    primary: {
      default: palette.primary.default,
      hover: palette.accent.default,
      active: palette.accent.default,
      disabled: palette.primary.light,
    },
    secondary: {
      default: palette.secondary.default,
      hover: palette.secondary.dark,
      active: palette.secondary.medium,
      disabled: palette.secondary.light,
    },
  },
});

export const LinkStyled = styled.a<LinkStyledProps>`
  ${({
    theme,
    $disabled,
    $size = 'medium',
    $variant = 'standalone',
    $color = 'primary',
    $fontWeight = 'regular',
  }) => {
    const colors = colorMap(theme.palette)[$variant][$color];

    return `
      color: ${colors.default};
      display: inline-flex;
      align-items: center;
      gap: ${theme.spacing.spacing_10};

      ${theme.fontStyles[fontStyleMap[$variant][$size][$fontWeight]]};

      ${
        $disabled
          ? `
            color: ${colors.disabled};
            cursor: not-allowed;
          `
          : `
            &:hover {
              color: ${colors.hover};
            }

            &:active {
              color: ${colors.active};
            }
          `
      };

      &:focus-visible {
        outline: 2px solid ${theme.palette.primary.default};
      }
    `;
  }}
`;
