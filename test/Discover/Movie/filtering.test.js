const { spec } = require("pactum");
const testData = require("../../../data/Discover/Movie/movie.discover.testData");

describe(testData.filters.describe, () => {
  let filteredByYear, filteredByGenre;

  beforeAll(async () => {
    const [yearCase, genreCase] = testData.filters.cases;

    filteredByYear = await spec().get('/discover/movie')
      .withQueryParams('primary_release_year', yearCase.query.primary_release_year)
      .expectStatus(200)
      .toss();

    filteredByGenre = await spec().get('/discover/movie')
      .withQueryParams('with_genres', genreCase.query.with_genres)
      .expectStatus(200)
      .toss();
  });

  describe(testData.filters.yearDescribe, () => {
    it(testData.filters.yearTest, () => {
      filteredByYear.body.results.forEach(movie => {
        expect(testData.filters.cases[0].check(movie)).toBe(true);
      });
    });
  });

  describe(testData.filters.genreDescribe, () => {
    it(testData.filters.genreTest, () => {
      filteredByGenre.body.results.forEach(movie => {
        expect(testData.filters.cases[1].check(movie)).toBe(true);
      });
    });
  });
});
