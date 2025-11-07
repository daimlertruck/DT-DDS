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
            ? theme.palette.informative.light
            : theme.palette.informative.default
        };
    `;
  }
  return ` 
        border: 1px solid ${theme.palette.informative.medium};
        background-color: ${
          isDisabled
            ? theme.palette.informative.light
            : theme.palette.surface.contrast
        };
    `;
};
