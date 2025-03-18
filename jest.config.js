const config = {
  testMatch: [
    //'**/test/Discover/**/*.test.js',
    //'**/test/Lists/**/*.test.js',
    '**/test/Lists/Details/lists.test.js',
  ],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./setup-pactum.js'],
  verbose: true,
};

module.exports = config;
