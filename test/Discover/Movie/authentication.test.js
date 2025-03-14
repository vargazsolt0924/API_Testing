const { spec } = require("pactum");
const testData = require("../../../data/Discover/Movie/movie.discover.testData");

describe(testData.authErrors.describe, () => {
  let responseWithoutToken, responseWithInvalidToken;

  beforeAll(async () => {
    const [missingCase, invalidCase] = testData.authErrors.cases;

    responseWithoutToken = await spec().get('/discover/movie')
      .withHeaders('Authorization', missingCase.headers.Authorization)
      .expectStatus(missingCase.expectedStatus)
      .toss();

    responseWithInvalidToken = await spec().get('/discover/movie')
      .withHeaders('Authorization', invalidCase.headers.Authorization)
      .expectStatus(invalidCase.expectedStatus)
      .toss();
  });

  describe(testData.authErrors.missingDescribe, () => {
    it(testData.authErrors.missingTest, () => {
      expect(responseWithoutToken.statusCode).toBe(401);
    });
  });

  describe(testData.authErrors.invalidDescribe, () => {
    it(testData.authErrors.invalidTest, () => {
      expect(responseWithInvalidToken.statusCode).toBe(401);
    });
  });
});
