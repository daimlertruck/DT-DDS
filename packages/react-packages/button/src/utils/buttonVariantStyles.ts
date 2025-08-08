import { CustomTheme as Theme } from '@dt-dds/themes';

import { ButtonVariant, ButtonAppearance } from '../constants';

const getOutlinedButtonStyles = (
  theme: Theme
): Partial<Record<ButtonAppearance, string>> => ({
  primary: `
    color: ${theme.palette.primary.default};
    border-color: ${theme.palette.primary.default};
    background-color: transparent;

    &:hover {
      color: ${theme.palette.primary.default};
      border-color: ${theme.palette.primary.default};
      background-color: ${theme.palette.primary.light};
    }

    &:active {
      color: ${theme.palette.primary.default};
      border-color: ${theme.palette.primary.default};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${theme.palette.primary.light};
      border-color: ${theme.palette.primary.light};
      background-color: transparent;
    }
  `,
  error: `
    color: ${theme.palette.error.default};
    background-color: transparent;
    border-color: ${theme.palette.error.default};

    &:hover {
      color: ${theme.palette.error.default};
      border-color: ${theme.palette.error.default};
      background-color: ${theme.palette.error.light};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${theme.palette.error.light};
      border-color: ${theme.palette.error.light};
    }
  `,
  secondary: `
    color: ${theme.palette.secondary.default};
    border-color: ${theme.palette.secondary.default};
    background-color: transparent;
    
    &:hover {
      color: ${theme.palette.secondary.default};
      border-color: ${theme.palette.secondary.default};
      background-color: ${theme.palette.secondary.light};
    }
    &:active {
      color: ${theme.palette.secondary.default};
      border-color: ${theme.palette.secondary.default};
      background-color: ${theme.palette.secondary.light};
    }
    &:disabled {
      cursor: not-allowed;
      color: ${theme.palette.secondary.light};
      border-color: ${theme.palette.secondary.light};
      background-color: transparent;
    }
  `,
  accent: `
    color: ${theme.palette.accent.default};
    border-color: ${theme.palette.accent.default};
    background-color: transparent;
    
    &:hover {
      color: ${theme.palette.accent.default};
      border-color: ${theme.palette.accent.default};
      background-color: ${theme.palette.accent.light};
    }
    &:active {
      color: ${theme.palette.accent.default};
      border-color: ${theme.palette.accent.default};
      background-color: ${theme.palette.accent.light};
    }
    &:disabled {
      cursor: not-allowed;
      color: ${theme.palette.accent.light};
      border-color: ${theme.palette.accent.light};
      background-color: transparent;
    }`,
});

export const buttonVariantStyles = (
  variant: ButtonVariant,
  theme: Theme,
  color: ButtonAppearance
) => {
  if (color === 'contrast') {
    return {
      solid: `
        color: ${theme.palette.content.dark};
        background-color: ${theme.palette.surface.contrast};
        border: 0;

        &:hover {
          background-color: ${theme.palette.secondary.light};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${theme.palette.secondary.medium};
          background-color: ${theme.palette.surface.contrast};
        }
      `,
      outlined: `
        color: ${theme.palette.content.contrast};
        border-color: ${theme.palette.surface.contrast};
        background-color: transparent;

        &:hover {
          color: ${theme.palette.content.dark};
          border-color: ${theme.palette.surface.contrast};
          background-color: ${theme.palette.surface.contrast};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${theme.palette.secondary.default};
          border-color: ${theme.palette.secondary.default};
          background-color: transparent;
        }
      `,
      text: `
        color: ${theme.palette.content.contrast};
        background-color: transparent;

        &:hover {
          color: ${theme.palette.content.dark};
          background-color: ${theme.palette.secondary.light};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${theme.palette.secondary.medium};
          background-color: transparent;
        }
      `,
    }[variant];
  } else {
    const hoverShade = 'dark';
    const disabledShade = 'light';

    return {
      solid: `
        border: 0;
        color: ${theme.palette.content.contrast};
        background-color: ${theme.palette[color].default};
        
        &:hover {
          color: ${theme.palette.content.contrast};
          background-color: ${theme.palette[color][hoverShade]};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${theme.palette.content.contrast};
          background-color: ${theme.palette[color][disabledShade]};
        }
    `,
      outlined: getOutlinedButtonStyles(theme)[color],
      text: `
        color: ${theme.palette[color].default};
        background-color: transparent;
        border: 0;
        
        &:hover {
          color: ${theme.palette[color].default};
          background-color: ${theme.palette[color].light};
        }
        
        &:disabled {
          cursor: not-allowed;
          color: ${theme.palette[color][disabledShade]};
          background-color: transparent;
        }
    `,
    }[variant];
  }
};
