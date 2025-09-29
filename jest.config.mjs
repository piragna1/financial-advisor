export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
setupFilesAfterEnv: ['<rootDir>/testSetup.mjs'],
  globalSetup: './src/tests/globalSetup.mjs',
  globalTeardown: './src/tests/globalTeardown.mjs',
};
