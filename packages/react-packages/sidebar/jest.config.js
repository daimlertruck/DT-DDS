// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('jest-config/jest.config.js');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^@dt-dds/react-(.*)$': ['<rootDir>/../$1/index.ts'],
    '^@dt-dds/themes$': '<rootDir>/../../themes/src/index.ts',
  },
};
