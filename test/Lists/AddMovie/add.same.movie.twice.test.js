require('dotenv').config();
const { spec } = require('pactum');
const { request, addingSameMovieTwiceResponse } = require('../../../data/Lists/AddMovie/add.same.movie.twice.testData');
const { expectedSchema } = require('../../../schema/Lists/AddMovie/error.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Add Movie - Adding the Same Movie Twice test', () => {
  describe.each(addingSameMovieTwiceResponse)('$description', (data) => {
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

      await spec()
        .post(`/list/${listId}/add_item`)
        .withQueryParams('session_id', SESSION_ID)
        .withJson(data.requestBody)
        .toss();

      addMovie = spec()
        .post(`/list/{list_id}/add_item`)
        .withPathParams('list_id', listId)
        .withQueryParams('session_id', SESSION_ID)
        .withJson(data.requestBody);

      body = await addMovie.expectStatus(data.expectedStatus).toss();
    });

    it('should return status code 403', () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return status code 8 in response body', () => {
      expect(body.body.status_code).toBe(data.responseStatusCode);
    });

    it('should return a message', () => {
      expect(body.body.status_message).toBe(data.responseStatusMessage);
    });

    it('should return a valid schema', () => {
      addMovie.response().to.have.jsonSchema(expectedSchema);
    });

    afterAll(async () => {
      await spec()
        .delete(`/list/{list_id}`)
        .withQueryParams('session_id', SESSION_ID);
    });
  });
});
