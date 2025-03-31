const { spec } = require('pactum');
const { generalResponse } = require('../../../data/Discover/Movie/general.response.testData');
const { successfulSchema } = require('../../../schema/Discover/movie.schema');

describe('Discover - Movie - General Response test', () => {
  describe.each(generalResponse)('$description', (data) => {
    let discoverMovie;
    let body;

    beforeAll(async () => {
      discoverMovie = spec()
        .get('/discover/movie');
        
      body = await discoverMovie.expectStatus(200).toss();
    });

    it('should return status code 200', () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return a valid schema', () => {
      discoverMovie.response().to.have.jsonSchema(successfulSchema);
    });

    it('should return non-empty results', () => {
      expect(body.body.results.length).toBeGreaterThan(0);
    });
  });
});
