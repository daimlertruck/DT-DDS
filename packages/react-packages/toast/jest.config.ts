import type { Config } from 'jest';

import baseConfig from '../../jest-config/jest.config';

const config: Config = {
  ...baseConfig,
  moduleNameMapper: {
    '^@dt-dds/react-(.*)$': ['<rootDir>/../$1/index.ts'],
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
  setupFilesAfterEnv: ['<rootDir>/../../jest-config/jest.setup.ts'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'index.ts',
    'types',
    'themes',
    'core',
    'constants',
    '.stories.tsx',
    'dist',
  ],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 50,
      functions: 65,
      lines: 70,
    },
  },
  coverageDirectory: 'jest-coverage',
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: 'jest-coverage', outputName: 'report.xml' },
    ],
  ],
};

export default config;
