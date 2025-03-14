const { spec } = require("pactum");
const testData = require("../../../data/Discover/Movie/movie.discover.testData");

describe(testData.general.mainDescribe, () => {
  let discoverMovie;
  let response;

  beforeAll(async () => {
    discoverMovie = spec().get('/discover/movie');
    response = await discoverMovie.expectStatus(200).toss();
  });

  describe(testData.general.successDescribe, () => {
    it(testData.general.statusCodeTest, () => {
      expect(response.statusCode).toBe(200);
    });

    it(testData.general.schemaValidationTest, () => {
      discoverMovie.response().to.have.jsonSchema(testData.expectedSchema);
    });

    it(testData.general.nonEmptyResultsTest, () => {
      expect(response.body.results.length).toBeGreaterThan(0);
    });
  });
});
