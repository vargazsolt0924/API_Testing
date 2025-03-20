const { spec } = require('pactum');
const { listResponses } = require('../../../data/Lists/Details/lists.tesData');
const { listSchema } = require('../../../schema/Lists/Details/items.schema');

describe('Lists - General Response Test', () => {
  describe.each(listResponses)('$description', (data) => {
    let listResponse;
    let body;

    beforeAll(async () => {
      listResponse = spec().get('/list/{list_id}').withPathParams('list_id', data.list_id);
      body = await listResponse.expectStatus(data.expectedStatus).toss();
    });

    it(`should return status code ${data.expectedStatus}`, () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return a valid schema', () => {
      listResponse.response().to.have.jsonSchema(listSchema);
    });

    it('should return an array of movies', () => {
      expect(Array.isArray(body.body.items)).toBe(true);
    });
  });
});
