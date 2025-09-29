export default {
  testEnvironment: 'node',
  transform: {},
  setupFilesAfterEnv: ['<rootDir>/testSetup.js'],
  globalSetup: './src/tests/globalSetup.js',
  globalTeardown: './src/tests/globalTeardown.js'
};
