module.exports = {
  ...require('jest-config/jest.config.js'),
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/mocks/imageMock.js',
  },
};
