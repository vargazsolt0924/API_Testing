const config = {
  testMatch: [
    '**/test/Discover/**/*.test.js',
    '**/test/Lists/**/*.test.js',
    //'**/test/Lists/Details/invalid.listId.test.js',
  ],
  testPathIgnorePatterns: [
    '/test/Lists/AddMovie/', // AddMovie-mappában lévő teszteket nem futtatja
  ],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['./setup-pactum.js'],
  verbose: true,
};

module.exports = config;
