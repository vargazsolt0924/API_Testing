require('dotenv').config();
const { spec } = require('pactum');
const { request, deleteList} = require('../../../data/Lists/Delete/general.response.testData');
const { expectedSchema } = require('../../../schema/Lists/Delete/response.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Delete - Test', () => {
  let listId;

  beforeAll(async () => {
    const { body } = await spec()
      .post('/list')
      .withQueryParams('session_id', SESSION_ID)
      .withJson(request)
      .toss();
    listId = body.list_id;
  });

  describe.each(deleteList)('$description', (movieData) => {
    let deleteList;
    let body;

    beforeAll(async () => {
      deleteList = spec()
        .delete(`/list/${listId}`)
        .withQueryParams('session_id', SESSION_ID);

      body = await deleteList.expectStatus(200).toss();
    });

    it('should return the expected status code for movie removal', () => {
      expect(body.statusCode).toBe(200);
    });

    it('should return a valid schema for the removal', () => {
      deleteList.response().to.have.jsonSchema(expectedSchema);
    });

    it(`should return the expected response body status code: ${movieData.status_code}`, () => {
      expect(body.body.status_code).toBe(movieData.status_code);
    });

    it(`should return the expected response body status message: ${movieData.status_message}`, () => {
      expect(body.body.status_message).toBe(movieData.status_message);
    });
  });
});
