import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';

const configDirectory = dirname(fileURLToPath(import.meta.url));

const getAbsolutePath = (value: string) => {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
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
        configDirectory,
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
    getAbsolutePath('@storybook/addon-themes'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-vitest'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-mcp'),
  ],

  features: {
    componentsManifest: true,
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  staticDirs: ['../static'],

  docs: {
    defaultName: 'Specs',
  },

  viteFinal: async (config) => {
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
      'breadcrumb',
      'checkbox',
      'tag',
      'backdrop',
      'box',
      'core',
      'divider',
      'drawer',
      'empty-state',
      'icon',
      'message',
      'tabs',
      'toast',
      'tooltip',
      'spinner',
      'radio',
      'app-header',
      'sidebar',
    ];

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@dt-dds/react': path.resolve(
          configDirectory,
          '../../../packages/dt-dds-react/index.ts'
        ),
        '@dt-dds/themes': path.resolve(
          configDirectory,
          '../../../packages/themes/src/index.ts'
        ),
        ...resolveComponentsPath(components),
      },
    };

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
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(configDirectory, '../tsconfig.json'),
      include: [
        path.resolve(
          configDirectory,
          '../../../packages/react-packages/*/src/**/*.tsx'
        ),
      ],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/__tests__/**'],
    },
  },
};

export default config;
