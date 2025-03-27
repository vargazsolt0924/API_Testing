require('dotenv').config();
const { spec } = require('pactum');
const { addMovieResponse } = require('../../../data/Lists/AddMovie/general.response.testData');
const { expectedSchema } = require('../../../schema/Lists/AddMovie/response.schema');

const SESSION_ID = process.env.SESSION_ID;
const request = {
  name: 'My Movie List',
  description: 'A test list with different content',
  language: 'en',
};

describe('Lists - Add Movie - General Response test', () => {
  describe.each(addMovieResponse)('$description', (data) => {
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
        .post('/list/{list_id}/add_item')
        .withPathParams('list_id', listId)
        .withQueryParams('session_id', SESSION_ID)
        .withJson(data.requestBody);
      body = await addMovie.expectStatus(data.expectedStatus).toss();
    });

    it('should return status code 201', () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return a valid schema', () => {
      addMovie.response().to.have.jsonSchema(expectedSchema);
    });

    it('should return a success status', () => {
      expect(body.body.success).toBe(true);
    });

    afterAll(async () => {
      await spec()
        .delete('/list/{list_id}')
        .withPathParams('list_id', listId)
        .withQueryParams('session_id', SESSION_ID)
        .toss();
    });
  });
});
