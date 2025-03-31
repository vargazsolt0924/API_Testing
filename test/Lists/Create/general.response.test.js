const { spec } = require('pactum');
const { generalResponse } = require('../../../data/Lists/Create/general.response.testData');
const { expectedSchema } = require('../../../schema/Lists/Create/response.schema');

describe('Lists - Create - General Response test', () => {
  describe.each(generalResponse)('$description', (data) => {
    let createList;
    let body;

    beforeAll(async () => {
      createList = spec()
        .post('/list')
        .withJson(data.requestBody);
        
      body = await createList.expectStatus(201).toss();
    });

    it('should return status code 201', () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return a valid schema', () => {
      createList.response().to.have.jsonSchema(expectedSchema);
    });

    it('should return a success status', () => {
      expect(body.body.success).toBe(true);
    });

    it('should return a valid list ID', () => {
      expect(body.body.list_id).toBeGreaterThan(0);
    });
  });
});
