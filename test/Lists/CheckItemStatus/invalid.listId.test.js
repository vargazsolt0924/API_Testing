const { spec } = require('pactum');
const { errorCases } = require('../../../data/Lists/CheckItemStatus/invalid.listId.testData');
const { invalidSchema } = require('../../../schema/Lists/CheckItemStatus/invalid.schema');

describe('Lists - Check Item Status - Error Cases', () => {
  describe.each(errorCases)('$description', (data) => {
    let checkItemStatus;
    let body;

    beforeAll(async () => {
      checkItemStatus = spec().get('/list/{list_id}/item_status').withPathParams('list_id', data.listId);
      body = await checkItemStatus.expectStatus(data.expectedStatus).toss();
    });

    it(`should return status code ${data.expectedStatus}`, () => {
      checkItemStatus.response().to.have.status(data.expectedStatus);
    });

    it('should match the expected response schema', () => {
      checkItemStatus.response().to.have.jsonSchema(invalidSchema);
    });

    it(`should return correct status_message: "${data.status_message}"`, () => {
      expect(body.body.status_message).toEqual(data.status_message);
    });
  });
});
