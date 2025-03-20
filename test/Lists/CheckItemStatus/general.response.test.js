const { spec } = require('pactum');
const { generalResponse } = require('../../../data/Lists/CheckItemStatus/general.response.testData');
const { expectedSchema } = require('../../../schema/Lists/CheckItemStatus/schema');

describe('Check Item Status - General Response Test', () => {
  describe.each(generalResponse)('$description', (data) => {
    let checkItemStatus;
    let body;

    beforeAll(async () => {
      checkItemStatus = spec().get('/list/{list_id}/item_status').withPathParams('list_id', data.listId);
      body = await checkItemStatus.expectStatus(data.expectedStatus).toss();
    });

    it(`should return status code ${data.expectedStatus}`, () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return a valid schema', () => {
      checkItemStatus.response().to.have.jsonSchema(expectedSchema);
    });

    it('should return a valid response body', () => {
      expect(body.body).toHaveProperty('item_present');
    });
  });
});
