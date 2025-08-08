import { defaultTheme, FontFace, CustomTheme as Theme } from '@dt-dds/themes';
import { ThemeProvider, Global } from '@emotion/react';
import React from 'react';

import { globalStyles } from '../utils/globalStyles';

type ThemeProviderType = {
  theme?: Theme;
  webFonts?: FontFace[];
  children: React.ReactNode;
};

// React ThemeProvider wrapper
export const Provider = ({
  theme = defaultTheme,
  webFonts = [],
  children,
}: ThemeProviderType) => {
  return (
    <>
      <Global styles={[globalStyles(theme), ...webFonts]} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
