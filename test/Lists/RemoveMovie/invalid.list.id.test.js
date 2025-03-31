require('dotenv').config();
const { spec } = require('pactum');
const { listIdTestData } = require('../../../data/Lists/RemoveMovie/invalid.list.id.testData');
const { expectedErrorSchema } = require('../../../schema/Lists/RemoveMovie/error.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Remove Movie - Invalid or Non-Existing List ID', () => {
  describe.each(listIdTestData)('$description', (data) => {
    let response;
    let body;

    beforeAll(async () => {
      response = spec()
        .post(`/list/${data.listId}/remove_item`)
        .withQueryParams('session_id', SESSION_ID)
        .withJson(data.requestBody);
        
      body = await response.expectStatus(data.expectedStatus);
    });

    it('should return status code 404', async () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it(`should return status code ${data.responseStatusCode} in the response body`, () => {
      expect(body.body.status_code).toBe(data.responseStatusCode);
    });

    it('should return a valid schema', () => {
      response.response().to.have.jsonSchema(expectedErrorSchema);
    });
  });
});
