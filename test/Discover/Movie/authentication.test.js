const { spec } = require('pactum');
const { authErrors } = require('../../../data/Discover/Movie/authentication.testData');

describe('Discover - Movie - Authentication Errors test', () => {
  describe.each(authErrors)('$description', (data) => {
    let discoverMovies;
    let body;

    beforeAll(async () => {
      discoverMovies = spec().get('/discover/movie').withHeaders('Authorization', data.headersAuth);
      body = await discoverMovies.expectStatus(data.expectedStatus).toss();
    });

    it(`status code should be ${data.expectedStatus}`, () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('response body should be correct', () => {
      expect(body.body).toEqual(data.response);
    });
  });
});
