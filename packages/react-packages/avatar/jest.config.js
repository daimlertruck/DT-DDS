module.exports = {
  ...require('jest-config/jest.config.js'),
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/imageMock.js',
  },
};
