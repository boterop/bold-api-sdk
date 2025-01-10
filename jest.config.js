const logger = require('./config/logger');

// Load environment variables
try {
  process.loadEnvFile(process.cwd() + '/.env.test');
} catch (_error) {
  logger.info('No se encontró el archivo de variables de entorno .env.test');
}

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRES_IN = '5s';

module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  setupFiles: ['./tests/test_helper.js'],
  setupFilesAfterEnv: ['./tests/runtime.js'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'features/**/*.js',
    'utils/**/*.js',
    'errors/**/*.js',
    'tasks/**/*.js',
  ],
};
