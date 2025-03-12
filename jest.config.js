const config = {
    testMatch: ['**/test/**/*.test.js'],
    setupFiles: ['dotenv/config'],
    setupFilesAfterEnv: ['./setup-pactum.js'],
};

module.exports = config;
