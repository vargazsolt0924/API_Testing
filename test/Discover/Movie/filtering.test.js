const { spec } = require('pactum');
const testData = require('../../../data/Discover/Movie/movie.discover.testData');

describe(testData.filters.describe, () => {
  let filterResponses = {};

  beforeAll(async () => {
    for (const testCase of testData.filters.cases) {
      filterResponses[testCase.label] = await spec().get('/discover/movie').withQueryParams(testCase.query).expectStatus(200).toss();
    }

    for (const genreCase of testData.filters.genreCases) {
      filterResponses[genreCase.label] = await spec().get('/discover/movie').withQueryParams(genreCase.query).expectStatus(200).toss();
    }
  });

  describe(testData.filters.yearDescribe, () => {
    testData.filters.cases.forEach(({ label, check }) => {
      it(`${testData.filters.yearTest} ${label}`, () => {
        filterResponses[label].body.results.forEach((movie) => {
          expect(check(movie)).toBe(true);
        });
      });
    });
  });

  describe(testData.filters.genreDescribe, () => {
    testData.filters.genreCases.forEach(({ label, check }) => {
      it(`${testData.filters.genreTest} ${label}`, () => {
        filterResponses[label].body.results.forEach((movie) => {
          expect(check(movie)).toBe(true);
        });
      });
    });
  });
});
