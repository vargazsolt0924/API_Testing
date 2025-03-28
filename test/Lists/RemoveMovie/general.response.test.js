require('dotenv').config();
const { spec } = require('pactum');
const {
  request,
  moviesToAdd,
  responseExpectedData,
} = require('../../../data/Lists/RemoveMovie/general.response.testData');
const { expectedSchema } = require('../../../schema/Lists/AddMovie/invalid.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Add and Remove Movie - Removing Movie from the List', () => {
  describe('When we removed a movie', () => {
    let listId;
    let removeMovie;
    let body;

    beforeAll(async () => {
      ({ body } = await spec()
        .post('/list')
        .withQueryParams('session_id', SESSION_ID)
        .withJson(request)
        .toss());
      listId = body.list_id;

      for (const movie of moviesToAdd) {
        await spec()
          .post(`/list/${listId}/add_item`)
          .withQueryParams('session_id', SESSION_ID)
          .withJson({ media_id: movie.media_id })
          .toss();
      }

      removeMovie = spec()
        .post(`/list/${listId}/remove_item`)
        .withQueryParams('session_id', SESSION_ID)
        .withJson({ media_id: moviesToAdd[0].media_id });
      body = await removeMovie.expectStatus(200).toss();
    });

    it('should return the expected status code for movie removal', () => {
      expect(body.statusCode).toBe(200);
    });

    it('should return a valid schema for the removal', () => {
      removeMovie.response().to.have.jsonSchema(expectedSchema);
    });

    it(`should return the expected response body status code: ${responseExpectedData.status_code} `, () => {
      expect(body.body.status_code).toBe(responseExpectedData.status_code);
    });

    it(`should return the expected response body status message: ${responseExpectedData.status_message}`, () => {
      expect(body.body.status_message).toBe(responseExpectedData.status_message);
    });

    afterAll(async () => {
      await spec().delete(`/list/${listId}`).withQueryParams('session_id', SESSION_ID).toss();
    });
  });
});
