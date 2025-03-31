const { spec } = require('pactum');
const {filterCases} = require('../../../data/Discover/Movie/filtering.testData');
const { successfulSchema } = require('../../../schema/Discover/movie.schema');

describe('Discover - Movie - Filtering test', () => {
  describe.each(filterCases)('$description', (data) => {
    let discoverMovies;
    let response;

    beforeAll(async () => {
      discoverMovies = spec()
        .get('/discover/movie')
        .withQueryParams(data.query);
        
      response = await discoverMovies.expectStatus(200).returns();
    });

    it(`status code should be ${data.expectedStatus}`, () => {
      expect(response.statusCode).toBe(data.expectedStatus);
    });

    if (data.query.primary_release_year) {
      it(`all movies should have a release date starting with ${data.query.primary_release_year}`, () => {
        response.body.results.forEach((movie) => {
          expect(movie.release_date.startsWith(data.query.primary_release_year)).toBe(true);
        });
      });
    }

    if (data.query.with_genres) {
      it(`all movies should include genre ID ${data.query.with_genres}`, () => {
        response.body.results.forEach((movie) => {
          expect(movie.genre_ids.includes(data.query.with_genres)).toBe(true);
        });
      });
    }

    if (data.query['vote_average.gte']) {
      it(`all movies should have a rating of at least ${data.query['vote_average.gte']}`, () => {
        response.body.results.forEach((movie) => {
          expect(movie.vote_average).toBeGreaterThanOrEqual(data.query['vote_average.gte'] - 0.1);
        });
      });
    }

    it('should return a valid schema', () => {
      discoverMovies.response().to.have.jsonSchema(successfulSchema);
    });
  });
});
