import { CustomTheme as Theme } from '@dt-dds/themes';

export const checkboxStyles = (
  theme: Theme,
  isChecked: boolean,
  isDisabled: boolean
) => {
  if (isChecked) {
    return `
        border: none;
        background-color: ${
          isDisabled
            ? theme.palette.primary.light
            : theme.palette.accent.default
        };
    `;
  }
  return ` 
        border: 1px solid ${theme.palette.border.default};
        background-color: ${theme.palette.surface.contrast};
    `;
};
