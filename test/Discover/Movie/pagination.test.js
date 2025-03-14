const { spec } = require('pactum');
const testData = require('../../../data/Discover/Movie/movie.discover.testData');

describe(testData.pagination.describe, () => {
  let validResponse, invalidResponse;

  beforeAll(async () => {
    const [validCase, invalidCase] = testData.pagination.cases;

    validResponse = await spec().get('/discover/movie').withQueryParams('page', validCase.query.page).expectStatus(validCase.expectedStatus).toss();

    invalidResponse = await spec().get('/discover/movie').withQueryParams('page', invalidCase.query.page).expectStatus(invalidCase.expectedStatus).toss();
  });

  describe(testData.pagination.validDescribe, () => {
    it(testData.pagination.validTest, () => {
      expect(validResponse.body.page).toBe(testData.pagination.cases[0].expectedPage);
    });
  });

  describe(testData.pagination.invalidDescribe, () => {
    it(testData.pagination.invalidTest, () => {
      expect(invalidResponse.statusCode).toBe(400);
    });
  });
});
