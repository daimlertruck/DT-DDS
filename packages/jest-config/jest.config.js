// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const config = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['node_modules'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  testMatch: ['<rootDir>/**/*.test.{tsx,ts}'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '.+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'],
  setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.ts')],
  snapshotSerializers: ['@emotion/jest/serializer'],
  coveragePathIgnorePatterns: ['node_modules', '.test.', '.stories.', 'dist'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/tokens/**',
    '!src/**/*.d.ts',
    '!src/types.ts',
    '!src/types/*.ts',
    '!src/index.ts',
    '!src/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 70,
      functions: 75,
      lines: 75,
    },
  },
  coverageDirectory: 'jest-coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: 'jest-coverage', outputName: 'report.xml' },
    ],
  ],
};

module.exports = config;
