const testCases = {
  general: {
    mainDescribe: 'General response test from TMDB Discover',
    successDescribe: 'When the request is successful',
    statusCodeTest: 'should return status code 200',
    schemaValidationTest: 'should return a valid schema',
    nonEmptyResultsTest: 'should return non-empty results',
  },

  pagination: {
    describe: 'Pagination tests',
    validDescribe: 'When valid pagination is used',
    invalidDescribe: 'When invalid pagination is used',
    validTest: 'should return corresponding results for the given page',
    invalidTest: 'should return HTTP 400 for invalid pagination query',
    cases: [
      { query: { page: 2 }, expectedPage: 2, expectedStatus: 200 },
      { query: { page: -1 }, expectedStatus: 400 },
    ],
  },

  filters: {
    describe: 'Movie filtering tests',
    yearDescribe: 'When filtering by release year (2020)',
    genreDescribe: 'When filtering by genre (Action - ID: 28)',
    yearTest: 'should return movies released in 2020',
    genreTest: 'should return only action movies',
    cases: [
      { query: { primary_release_year: 2020 }, check: (movie) => movie.release_date.startsWith('2020') },
      { query: { with_genres: 28 }, check: (movie) => movie.genre_ids.includes(28) },
    ],
  },

  authErrors: {
    describe: 'Authentication Error tests',
    emptyDescribe: 'When token is missing',
    invalidDescribe: 'When token is invalid',
    emptyTest: 'should return 401 status code for missing token',
    invalidTest: 'should return 401 status code for invalid token',
    cases: [
      { headers: { Authorization: null }, expectedStatus: 401 },
      { headers: { Authorization: 'Bearer invalid_token_example' }, expectedStatus: 401 },
    ],
  },

  expectedSchema: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      results: { type: 'array' },
      total_pages: { type: 'number' },
      total_results: { type: 'number' },
    },
    required: ['page', 'results', 'total_pages', 'total_results'],
  },
};

module.exports = testCases;
