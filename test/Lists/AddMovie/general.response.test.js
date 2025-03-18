const { spec } = require('pactum');
const { addMovieResponse } = require('../../../data/Lists/AddMovie/general.response.testData');
const { expectedSchema } = require('../../../schema/Lists/AddMovie/response.schema');

describe('Lists - Add Movie - General Response test', () => {
  describe.each(addMovieResponse)('$description', (data) => {
    let addMovie;
    let body;

    beforeAll(async () => {
      addMovie = spec().post('/list/{list_id}/add_item').withPathParams('list_id', data.listId).withJson(data.requestBody);
      body = await addMovie.expectStatus(201).toss();
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

    it('should contain the correct movie ID', () => {
      expect(body.body.movie_id).toBe(data.requestBody.media_id);
    });
  });
});
