require('dotenv').config();
const { spec } = require('pactum');
const { request, moviesToAdd, removeMovie,} = require('../../../data/Lists/RemoveMovie/general.response.testData');
const { expectedSchema } = require('../../../schema/Lists/RemoveMovie/response.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Remove Movie - General Response test', () => {
  let listId;

  beforeAll(async () => {
    const { body } = await spec()
      .post('/list')
      .withQueryParams('session_id', SESSION_ID)
      .withJson(request)
      .toss();

    listId = body.list_id;

    for (const movie of moviesToAdd) {
      await spec()
        .post(`/list/${listId}/add_item`)
        .withQueryParams('session_id', SESSION_ID)
        .withJson({ media_id: movie.media_id });
    }
  });

  describe.each(removeMovie)('$description', (movieData) => {
    let removeMovie;
    let body;

    beforeAll(async () => {
      removeMovie = spec()
        .post(`/list/${listId}/remove_item`)
        .withQueryParams('session_id', SESSION_ID)
        .withJson({ media_id: movieData.media_id });

      body = await removeMovie.expectStatus(200).toss();
    });

    it('should return the expected status code for movie removal', () => {
      expect(body.statusCode).toBe(200);
    });

    it('should return a valid schema for the removal', () => {
      removeMovie.response().to.have.jsonSchema(expectedSchema);
    });

    it(`should return the expected response body status code: ${movieData.status_code}`, () => {
      expect(body.body.status_code).toEqual(movieData.status_code);
    });

    it(`should return the expected response body status message: ${movieData.status_message}`, () => {
      expect(body.body.status_message).toEqual(movieData.status_message);
    });
  });

  afterAll(async () => {
    await spec()
      .delete(`/list/${listId}`)
      .withQueryParams('session_id', SESSION_ID);
  });
});
