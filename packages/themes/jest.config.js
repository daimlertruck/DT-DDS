module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.{ts,tsx}',
    '!src/tokens/**',
    '!src/**/runner.ts',
    '!src/**/index.ts',
  ],
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
