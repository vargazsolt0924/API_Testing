const { spec } = require("pactum");
const testData = require("../../../data/Discover/Movie/movie.discover.testData");

describe('Pagination tests', () => {
  let paginationCaseOne, paginationCaseTwo;

  beforeAll(async () => {
    const paginationCase1 = testData.paginationCases[0];
    const paginationCase2 = testData.paginationCases[1];

    paginationCaseOne = await spec().get('/discover/movie')
      .withQueryParams('page', paginationCase1.query.page)
      .expectStatus(paginationCase1.expectedStatus)
      .toss();

    paginationCaseTwo = await spec().get('/discover/movie')
      .withQueryParams('page', paginationCase2.query.page)
      .expectStatus(paginationCase2.expectedStatus)
      .toss();
  });

  describe('When valid pagination is used', () => {
    it('should return corresponding results for the given page', () => {
      expect(paginationCaseOne.body.page).toBe(testData.paginationCases[0].expectedPage);
    });
  });

  describe('When invalid pagination is used', () => {
    it('should return HTTP 400 for invalid pagination query', () => {
      expect(paginationCaseTwo.statusCode).toBe(400);
    });
  });
});
