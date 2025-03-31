require('dotenv').config();
const { spec } = require('pactum');
const {request,invalidRequestBodyResponse} = require('../../../data/Lists/AddMovie/invalid.request.body.testData');
const { expectedSchema } = require('../../../schema/Lists/AddMovie/error.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Add Movie - Invalid Request Body test', () => {
  let listId;
  let addMovie;
  let body;

  describe.each(invalidRequestBodyResponse)('$description', (data) => {
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

  afterAll(async () => {
        await spec()
          .delete(`/list/{list_id}`)
          .withQueryParams('session_id', SESSION_ID);
      });
});
