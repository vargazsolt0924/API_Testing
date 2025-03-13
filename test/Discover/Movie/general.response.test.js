const { spec } = require("pactum");
const testData = require("../../../data/Discover/Movie/movie.discover.testData");

describe('General response test from TMDB Discover', () => {
  let discoverMovie;
  let response;

  beforeAll(async () => {
    discoverMovie = spec().get('/discover/movie');
    response = await discoverMovie.expectStatus(200).toss();
  });

  describe('When the request is successful', () => {
    it('should return status code 200', () => {
      expect(response.statusCode).toBe(200);
    });

    it('should return a valid schema', () => {
      discoverMovie.response().to.have.jsonSchema(testData.expectedSchema);
    });

    it('should return non-empty results', () => {
      expect(response.body.results.length).toBeGreaterThan(0);
    });
  });
});