require('dotenv').config();
const { spec } = require('pactum');
const { listIdTestData } = require('../../../data/Lists/Clear/invalid.listId.testData');
const { expectedSchema } = require('../../../schema/Lists/Clear/response.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Clear List - Invalid or Non-Existing List ID test', () => {
  describe.each(listIdTestData)('$description', (data) => {
    let response;
    let body;

    beforeAll(async () => {
      response = spec()
        .post(`/list/${data.listId}/clear`)
        .withQueryParams({ session_id: SESSION_ID, confirm: true });

      body = await response.expectStatus(data.expectedStatus);
    });

    it('should return status code 404', async () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it(`should return status code ${data.responseStatusCode} in the response body`, () => {
      expect(body.body.status_code).toBe(data.responseStatusCode);
    });

    it('should return a valid schema', () => {
      response.response().to.have.jsonSchema(expectedSchema);
    });
  });
});
