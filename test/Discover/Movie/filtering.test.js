const { spec } = require('pactum');
const { filterCases } = require('../../../data/Discover/Movie/filtering.testData');

describe('Discover - Movie - Filtering test', () => {
  describe.each(filterCases)('$description', (data) => {
    let discoverMovies;
    let body;

    beforeAll(async () => {
      discoverMovies = spec().get('/discover/movie').withQueryParams(data.query);
      body = await discoverMovies.expectStatus(200).toss();
    });

    it(`status code should be ${data.expectedStatus}`, () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    if (data.query.primary_release_year) {
      it(`all movies should have a release date starting with ${data.query.primary_release_year}`, () => {
        body.body.results.forEach((movie) => {
          expect(movie.release_date.startsWith(data.query.primary_release_year)).toBe(true);
        });
      });
    }

    if (data.query.with_genres) {
      it(`and all movies should include genre ID ${data.query.with_genres}`, () => {
        body.body.results.forEach((movie) => {
          expect(movie.genre_ids.includes(data.query.with_genres)).toBe(true);
        });
      });
    }
  });
});
