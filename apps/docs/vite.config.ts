/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    // Some Storybook packages nest React 19; keep a single React copy.
    dedupe: ['react', 'react-dom'],
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
          // addon-vitest 10.6.2 pre-bundles its Node-only global-setup for the browser
          // even without storybookScript; remove once fixed upstream.
          {
            name: 'storybook-browser-only-dependencies',
            enforce: 'post',
            config(config) {
              if (config.optimizeDeps?.include) {
                config.optimizeDeps.include =
                  config.optimizeDeps.include.filter(
                    (dependency) =>
                      dependency !==
                      '@storybook/addon-vitest/internal/global-setup'
                  );
              }
            },
          },
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
});
