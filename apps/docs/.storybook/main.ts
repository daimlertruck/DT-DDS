import path, { join, dirname } from 'path';
import { InlineConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

const getAbsolutePath = (value: string) => {
  return dirname(require.resolve(join(value, 'package.json')));
};

type PathAlias = {
  [key: string]: string;
};

const resolveComponentsPath = (components: string[]): PathAlias =>
  components.reduce((acc: PathAlias, curr: string) => {
    const keyName = `@dt-dds/react-${curr}`;
    return {
      ...acc,
      [keyName]: path.resolve(
        __dirname,
        `../../../packages/react-packages/${curr}/index.ts`
      ),
    };
  }, {});

const config: StorybookConfig = {
  stories: [
    '../../../packages/react-packages/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/**/*.mdx',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-themes'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  staticDirs: ['../static'],

  docs: {
    defaultName: 'Specs',
  },

  viteFinal: async (config: InlineConfig) => {
    if (config.resolve) {
      const components = [
        'link',
        'icon-button',
        'pagination',
        'form',
        'toggle',
        'date-picker',
        'text-area',
        'dropdown',
        'segmented-control',
        'modal',
        'card',
        'stepper',
        'select',
        'progress-bar',
        'button',
        'label-field',
        'text-field',
        'table',
        'typography',
        'avatar',
        'accordion',
        'avatar',
        'breadcrumb',
        'checkbox',
        'tag',
        'backdrop',
        'breadcrumb',
        'box',
        'core',
        'divider',
        'drawer',
        'empty-state',
        'icon',
        'message',
        'tabs',
        'tag',
        'toast',
        'tooltip',
        'spinner',
        'radio',
      ];

      config.resolve.alias = {
        ...config.resolve.alias,
        '@storybook/blocks': getAbsolutePath('@storybook/blocks'),
        '@dt-dds/react': path.resolve(
          __dirname,
          `../../../packages/dt-dds-react/index.ts`
        ),
        '@dt-dds/themes': path.resolve(
          __dirname,
          `../../../packages/themes/src/index.ts`
        ),
        ...resolveComponentsPath(components),
      };
    }

    config.esbuild = {
      ...config.esbuild,
      keepNames: true,
    };

    config.build = {
      ...config.build,
      minify: 'esbuild',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
    };

    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
