require('dotenv').config();
const { spec } = require('pactum');
const { invalidRequestBodyResponse } = require('../../../data/Lists/AddMovie/invalid.request.body.testData');
const { expectedSchema } = require('../../../schema/Lists/AddMovie/invalid.schema');

const SESSION_ID = process.env.SESSION_ID;
const request = {
  name: 'Invalid Request Body Test List',
  description: 'Testing adding a movie with invalid requestBody',
  language: 'en',
};

describe('Lists - Add Movie - Invalid Request Body', () => {
  describe.each(invalidRequestBodyResponse)('$description', (data) => {
    let listId;
    let addMovie;
    let body;

    beforeAll(async () => {
      ({ body } = await spec()
        .post('/list')
        .withQueryParams('session_id', SESSION_ID)
        .withJson(request)
        .toss());
      listId = body.list_id;
      addMovie = spec()
        .post(`/list/${listId}/add_item`)
        .withQueryParams('session_id', SESSION_ID)
        .withJson(data.requestBody);
      body = await addMovie.expectStatus(data.expectedStatus).toss();
    });

    it('should return the status code 400', async () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return status code 5 in the request body', async () => {
      expect(body.body.status_code).toBe(5);
    });

    it('should return a message', () => {
      expect(body.body.status_message).toBe(data.responseStatusMessage);
    });

    it('should return a valid schema', () => {
      addMovie.response().to.have.jsonSchema(expectedSchema);
    });
  });
});
