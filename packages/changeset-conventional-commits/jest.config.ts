import type { Config } from 'jest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('jest-config/jest.config.js');

const config: Config = {
  ...baseConfig,
  testEnvironment: 'node',
  setupFilesAfterEnv: undefined,
  collectCoverage: false,
};

export default config;
