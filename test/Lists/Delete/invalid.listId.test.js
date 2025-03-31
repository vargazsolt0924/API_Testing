require('dotenv').config();
const { spec } = require('pactum');
const { listIdTestData } = require('../../../data/Lists/Delete/invalid.listId.testData');
const { expectedSchema } = require('../../../schema/Lists/Delete/response.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Delete - Invalid or Non-Existing List ID test', () => {
  describe.each(listIdTestData)('$description', (data) => {
    let deleteList;
    let body;

    beforeAll(async () => {
      deleteList = spec()
        .delete(`/list/${data.listId}`)
        .withQueryParams('session_id', SESSION_ID);

      body = await deleteList.expectStatus(data.expectedStatus).toss();
    });

    it('should return status code 404', async () => {
        expect(body.statusCode).toBe(data.expectedStatus);
      });
  
    it(`should return status code ${data.responseStatusCode} in the response body`, () => {
        expect(body.body.status_code).toEqual(data.responseStatusCode);
    });
  
    it('should return a valid schema', () => {
        deleteList.response().to.have.jsonSchema(expectedSchema);
    });
  });
});
