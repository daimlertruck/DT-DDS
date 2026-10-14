import React from 'react';

import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { themes } from 'storybook/theming';

import { Global } from '@emotion/react';

import '@dt-dds/icons/index.css';
import { theme as defaultTheme, Provider } from '@dt-dds/react';

import { greenlaneTheme, truckAPITheme } from './themes';
import { webFonts } from './webFonts';

import type { Preview } from '@storybook/react-vite';

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
  // Icon ligatures read as text to axe until the font is loaded.
  loaders: [
    async () => {
      await Promise.all([
        document.fonts.load('24px DTUI-icons-outlined'),
        document.fonts.load('24px DTUI-icons-sharp'),
      ]);
    },
  ],

  parameters: {
    a11y: { test: 'todo' },
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
