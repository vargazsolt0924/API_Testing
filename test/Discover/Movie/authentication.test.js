const { spec } = require("pactum");
const testData = require("../../../data/Discover/Movie/movie.discover.testData");

describe('Authentication Error tests', () => {
  let responseWithoutToken;
  let responseWithInvalidToken;

  beforeAll(async () => {
    const errorCaseMissing = testData.authenticationErrorCases[0];
    const errorCaseInvalid = testData.authenticationErrorCases[1];

    responseWithoutToken = await spec().get('/discover/movie')
      .withHeaders('Authorization', errorCaseMissing.headers.Authorization)
      .expectStatus(errorCaseMissing.expectedStatus)
      .toss();

    responseWithInvalidToken = await spec().get('/discover/movie')
      .withHeaders('Authorization', errorCaseInvalid.headers.Authorization)
      .expectStatus(errorCaseInvalid.expectedStatus)
      .toss();
  });

  describe('When token is missing', () => {
    it('should return 401 status code for missing token', () => {
      expect(responseWithoutToken.statusCode).toBe(401);
    });
  });

  describe('When token is invalid', () => {
    it('should return 401 status code for invalid token', () => {
      expect(responseWithInvalidToken.statusCode).toBe(401);
    });
  });
});
