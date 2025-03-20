const { spec } = require('pactum');
const { invalidTestCases } = require('../../../data/Lists/Details/invalid.listId.testData');
const { invalidSchema } = require('../../../schema/Lists/Details/invalid.schema');

describe('Lists - General Response Test', () => {
  describe.each(invalidTestCases)('$description', (data) => {
    let listResponse;
    let body;

    beforeAll(async () => {
      listResponse = spec().get('/list/{list_id}').withPathParams('list_id', data.list_id);
      body = await listResponse.expectStatus(data.expectedStatus).toss();
    });

    it(`should return status code ${data.expectedStatus}`, () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should match the expected response schema', () => {
      listResponse.response().to.have.jsonSchema(invalidSchema);
    });

    it(`should return correct status_message: "${data.status_message}"`, () => {
      expect(body.body.status_message).toEqual(data.status_message);
    });
  });
});
