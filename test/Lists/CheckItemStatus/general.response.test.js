require('dotenv').config();
const { spec } = require('pactum');
const { request, generalResponse } = require('../../../data/Lists/CheckItemStatus/general.response.testData');
const { expectedSchema } = require('../../../schema/Lists/CheckItemStatus/response.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Check Item Status - General Response test', () => {
  describe.each(generalResponse)('$description', (data) => {
    let listId;
    let checkItemStatus;
    let checkItemStatusBody;

    beforeAll(async () => {
      const createListResponse = await spec()
        .post('/list')
        .withQueryParams('session_id', SESSION_ID)
        .withJson(request)
        .expectStatus(201)
        .toss();

      listId = createListResponse.body.list_id;

      checkItemStatus = spec()
        .get(`/list/${listId}/item_status`)
        .withQueryParams('session_id', SESSION_ID);

      checkItemStatusBody = await checkItemStatus.expectStatus(data.expectedStatus).toss();
    });

    it(`should return status code ${data.expectedStatus}`, () => {
      expect(checkItemStatusBody.statusCode).toBe(data.expectedStatus);
      expect(checkItemStatusBody.body).toHaveProperty('item_present');
    });

    it('should return the valid schema', () => {
      checkItemStatus.response().to.have.jsonSchema(expectedSchema);
    });

    afterAll(async () => {
      await spec()
        .delete(`/list/${listId}`)
        .withQueryParams('session_id', SESSION_ID);
    });
  });
});
