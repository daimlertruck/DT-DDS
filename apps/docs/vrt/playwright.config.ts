import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: 'stories.spec.ts',
  outputDir: '../test-results/vrt',
  snapshotPathTemplate: '{testDir}/__snapshots__/{arg}{ext}',
  updateSnapshots: 'none',
  fullyParallel: true,
  retries: 0,
  // eslint-disable-next-line turbo/no-undeclared-env-vars -- vrt is not a turbo task
  forbidOnly: !!process.env.CI,
  reporter: [
    ['list'],
    ['html', { outputFolder: '../test-results/vrt-report', open: 'never' }],
    ['json', { outputFile: '../test-results/vrt.json' }],
  ],
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      threshold: 0.2,
      maxDiffPixels: 0,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
      },
    },
  ],
});
