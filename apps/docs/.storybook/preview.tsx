import React from 'react';
import { Global } from '@emotion/react';

import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

import { daimlertruckTheme as defaultTheme, Provider } from '@dt-dds/react';
import '@dt-dds/icons/index.css';

import { greenlaneTheme, truckAPITheme } from './themes';
import { webFonts } from './webFonts';

const GlobalStyles = () => <Global styles={[...webFonts]} />;

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      Default: defaultTheme,
      Greenlane: greenlaneTheme,
      TruckAPI: truckAPITheme,
    },
    defaultTheme: 'Default',
    Provider,
    GlobalStyles,
  }),
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewMode: 'docs',
    previewTabs: {
      'storybook/docs/panel': {
        index: -1,
      },
      canvas: { title: 'Sandbox' },
    },
    options: {
      storySort: {
        order: ['Contribution Guidelines', 'Foundations', '*'],
      },
    },
    docs: {
      theme: themes.light,
      fontBase: 'Daimler CS',
    },
  },

  tags: ['autodocs'],
};

export default preview;
