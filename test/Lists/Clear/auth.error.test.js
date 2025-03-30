require('dotenv').config();
const { spec } = require('pactum');
const { request, moviesToAdd, invalidSessionData, invalidApiKeyData } = require('../../../data/Lists/Clear/auth.error.testData');
const { expectedErrorSchema } = require('../../../schema/Lists/Clear/error.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Clear List - With invalid authentication', () => {
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
        .withJson({ media_id: movie.media_id })
        .toss();
    }
  });

  describe.each(invalidSessionData)('$description', (sessionData) => {
    let clearList;
    let body;
    it(`should return 401 when using an invalid session ID: ${sessionData.sessionId}`, async () => {
      clearList = spec()
        .post(`/list/${listId}/remove_item`)
        .withQueryParams({ session_id: sessionData.sessionId, confirm: true});

      body = await clearList.expectStatus(sessionData.expectedStatus).toss();
    });

    it('should return the right error message', () => {
      expect(body.body.status_message).toBe(sessionData.expectedMessage);
    });

    it('should return the error schema', ()=>{
        clearList.response().to.have.jsonSchema(expectedErrorSchema);
    });
  });

  describe.each(invalidApiKeyData)('$description', (apiKeyData) => {
    let clearList;
    let body;
    it(`should return 401 when using an invalid API key: ${apiKeyData.apiKey}`, async () => {
      clearList = spec()
        .post(`/list/${listId}/remove_item`)
        .withHeaders('Authorization', apiKeyData.apiKey)
        .withQueryParams({ session_id: SESSION_ID, confirm: true});

      body = await clearList.expectStatus(apiKeyData.expectedStatus).toss();
    });

    it('should return the right error message', () => {
      expect(body.body.status_message).toBe(apiKeyData.expectedMessage);
    });

    it('should return the error schema', ()=>{
        clearList.response().to.have.jsonSchema(expectedErrorSchema);
    });
  });

  afterAll(async () => {
    await spec()
      .delete(`/list/${listId}`)
      .withQueryParams('session_id', SESSION_ID);
  });
});