export default {
  testEnvironment: 'node',
  transform:{},
  setupFilesAfterEnv: ["<rootDir>/testSetup.js"],
};


module.exports={
  globalSetup:'./test/globalSetup.js',
  globalTearDown:'./test/globalTearDown.js'
}