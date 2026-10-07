import { createRequire } from 'node:module';

import type { Config } from 'jest';

const baseConfig: Config = createRequire(`${process.cwd()}/package.json`)(
  'jest-config/jest.config.js'
);

const config: Config = {
  ...baseConfig,
  testEnvironment: 'node',
  setupFilesAfterEnv: undefined,
  collectCoverage: false,
};

export default config;
