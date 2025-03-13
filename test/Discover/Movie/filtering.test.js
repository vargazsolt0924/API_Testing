const { spec } = require("pactum");
const testData = require("../../../data/Discover/Movie/movie.discover.testData");

describe('Movie filtering tests', () => {
  let filteredByYear, filteredByGenre;

  beforeAll(async () => {
    const filterCase1 = testData.filterCases[0];
    const filterCase2 = testData.filterCases[1];

    filteredByYear = await spec().get('/discover/movie')
      .withQueryParams('primary_release_year', filterCase1.query.primary_release_year)
      .expectStatus(200)
      .toss();

    filteredByGenre = await spec().get('/discover/movie')
      .withQueryParams('with_genres', filterCase2.query.with_genres)
      .expectStatus(200)
      .toss();
  });

  describe('When filtering by release year (2020)', () => {
    it('should return movies released in 2020', () => {
      filteredByYear.body.results.forEach(movie => {
        expect(testData.filterCases[0].check(movie)).toBe(true);
      });
    });
  });

  describe('When filtering by genre (Action - ID: 28)', () => {
    it('should return only action movies', () => {
      filteredByGenre.body.results.forEach(movie => {
        expect(testData.filterCases[1].check(movie)).toBe(true);
      });
    });
  });
});
