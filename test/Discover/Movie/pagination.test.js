const { spec } = require('pactum');
const { paginationSuccessfulTestCases, paginationInvalidTestCases } = require('../../../data/Discover/Movie/pagination.testData');
const { successfulSchema } = require('../../../schema/Discover/movie.schema');

describe('Discover - Movie - Pagination test', () => {
  describe('with valid query', () => {
    describe.each(paginationSuccessfulTestCases)('$description', (data) => {
      let discoverMovies;
      let body;

      beforeAll(async () => {
        discoverMovies = spec()
          .get('/discover/movie')
          .withQueryParams(data.query);

        body = await discoverMovies.expectStatus(200).toss();
      });

      it(`status code should be ${data.expectedStatus}`, () => {
        expect(body.statusCode).toBe(data.expectedStatus);
      });

      it('response schema should be correct', () => {
        discoverMovies.response().to.have.jsonSchema(successfulSchema);
      });

      it('response body should be correct', () => {
        expect(body.body.page).toBe(data.expectedPage);
      });
    });
  });

  describe('with invalid query', () => {
    describe.each(paginationInvalidTestCases)('$description', (data) => {
      let discoverMovies;
      let body;

      beforeAll(async () => {
        discoverMovies = spec()
          .get('/discover/movie')
          .withQueryParams(data.query);

        body = await discoverMovies.expectStatus(400).toss();
      });

      it(`status code should be ${data.expectedStatus}`, () => {
        expect(body.statusCode).toBe(data.expectedStatus);
      });

      it('response body should be correct', () => {
        expect(body.body).toEqual(data.response);
      });
    });
  });
});
