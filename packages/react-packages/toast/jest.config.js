// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('jest-config/jest.config.js');

module.exports = {
  ...config,
  collectCoverageFrom: [...config.collectCoverageFrom, '!src/constants/**'],
  coverageThreshold: {
    global: {
      ...config.coverageThreshold.global,
      functions: 70,
    },
  },
};
