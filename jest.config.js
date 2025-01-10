process.env.NODE_ENV = 'test';

module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  setupFiles: ['./tests/test_helper.js'],
  setupFilesAfterEnv: ['./tests/runtime.js'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
};
