process.env.NODE_ENV = 'test';

// Load environment variables
try {
  process.loadEnvFile(process.cwd() + '/.env.test');
} catch (_error) {
  logger.info('No se encontró el archivo de variables de entorno .env.test');
}

module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
};
