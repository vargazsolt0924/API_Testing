const config = {
  testMatch: [
    '**/test/Discover/**/*.test.js',
    '**/test/Lists/**/*.test.js',
    //'**/test/Lists/Delete/auth.error.test.js',
    //'**/test/Discover/Movie/filtering.test.js',
  ],
  /* testPathIgnorePatterns: [
    '/test/Lists/AddMovie/', // AddMovie-mappában lévő teszteket nem futtatja
  ],*/
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./setup-pactum.js'],
  verbose: true,
};

module.exports = config;
