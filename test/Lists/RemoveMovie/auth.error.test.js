require('dotenv').config();
const { spec } = require('pactum');
const { request, moviesToAdd, invalidSessionData, invalidApiKeyData } = require('../../../data/Lists/RemoveMovie/auth.error.testData');
const { expectedErrorSchema } = require('../../../schema/Lists/RemoveMovie/error.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Remove Movie - Authentication test', () => {
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

  describe.each(invalidSessionData)('$description', (sessionData) => {
    let removeMovie;
    let body;

    it(`should return 401 when using an invalid session ID: ${sessionData.sessionId}`, async () => {
      removeMovie = spec()
        .post(`/list/${listId}/remove_item`)
        .withQueryParams('session_id', sessionData.sessionId)
        .withJson(sessionData.media_id);

      body = await removeMovie.expectStatus(sessionData.expectedStatus).toss();
    });

    it('should return the right error message', () => {
      expect(body.body.status_message).toBe(sessionData.expectedMessage);
    });

    it('should return the error schema', ()=>{
        removeMovie.response().to.have.jsonSchema(expectedErrorSchema);
    });
  });

  describe.each(invalidApiKeyData)('$description', (apiKeyData) => {
    let removeMovie;
    let body;

    it(`should return 401 when using an invalid API key: ${apiKeyData.apiKey}`, async () => {
      removeMovie = spec()
        .post(`/list/${listId}/remove_item`)
        .withHeaders('Authorization', apiKeyData.apiKey)
        .withQueryParams('session_id', SESSION_ID)
        .withJson(apiKeyData.media_id);

      body = await removeMovie.expectStatus(apiKeyData.expectedStatus).toss();
    });

    it('should return the right error message', () => {
      expect(body.body.status_message).toBe(apiKeyData.expectedMessage);
    });

    it('should return the error schema', ()=>{
        removeMovie.response().to.have.jsonSchema(expectedErrorSchema);
    });
  });

  afterAll(async () => {
    await spec()
      .delete(`/list/${listId}`)
      .withQueryParams('session_id', SESSION_ID);
  });
});