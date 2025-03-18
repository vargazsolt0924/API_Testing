const { spec } = require('pactum');
const { generalResponse } = require('../../../data/Lists/Details/general.response.testData');
const { detailsSchema } = require('../../../schema/Lists/Details/schema');

describe('Details - General Response Test', () => {
  describe.each(generalResponse)('$description', (data) => {
    let detailsResponse;
    let body;

    beforeAll(async () => {
      detailsResponse = spec().get('/movie/{id}').withPathParams('id', data.id);
      body = await detailsResponse.expectStatus(data.expectedStatus).toss();
    });

    it('should return status code 200', () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return a valid schema', () => {
      detailsResponse.response().to.have.jsonSchema(detailsSchema);
    });

    it('should return a non-empty title', () => {
      expect(body.body.title).not.toBe('');
    });

    it('should return an array of genres', () => {
      expect(Array.isArray(body.body.genres)).toBe(true);
      expect(body.body.genres.length).toBeGreaterThan(0);
    });

    it('should have a valid release date', () => {
      expect(body.body.release_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });
});
