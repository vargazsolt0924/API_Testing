require('dotenv').config();
const { spec } = require('pactum');
const { request, generalResponse } = require('../../../data/Lists/Details/general.response.testData');
const { detailsSchema } = require('../../../schema/Lists/Details/schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Details - General Response Test', () => {
  describe.each(generalResponse)('$description', (data) => {
    let createList;
    let listId;
    let response;
    let responseBody;

    beforeAll(async () => {
      createList = await spec()
        .post('/list')
        .withQueryParams('session_id', SESSION_ID)
        .withJson(request)
        .toss();

      listId = createList.body.list_id;

      response = spec().get(`/list/${listId}`).withQueryParams('session_id', SESSION_ID);
      responseBody = await response.expectStatus(data.expectedStatus).toss();
    });

    it('should return status code 200', () => {
      expect(responseBody.statusCode).toBe(data.expectedStatus);
    });

    it('should return a valid schema', () => {
      response.response().to.have.jsonSchema(detailsSchema);
    });

    afterAll(async () => {
      await spec().delete(`/list/${listId}`).withQueryParams('session_id', SESSION_ID).toss();
    });
  });
});
