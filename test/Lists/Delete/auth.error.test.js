require('dotenv').config();
const { spec } = require('pactum');
const { request, invalidSessionData, invalidApiKeyData } = require('../../../data/Lists/Delete/auth.error.testData');
const { expectedErrorSchema } = require('../../../schema/Lists/Delete/error.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Delete List - Authentication test', () => {
  let listId;

  beforeAll(async () => {
    const { body } = await spec()
      .post('/list')
      .withQueryParams('session_id', SESSION_ID)
      .withJson(request)
      .toss();

    listId = body.list_id;
  });

  describe.each(invalidSessionData)('$description', (sessionData) => {
    let deleteList;
    let body;
    
    it(`should return 401 when using an invalid session ID: ${sessionData.sessionId}`, async () => {
      deleteList = spec()
        .delete(`/list/${listId}`)
        .withQueryParams('session_id', sessionData.sessionId);

      body = await deleteList.expectStatus(sessionData.expectedStatus).toss();
    });

    it('should return the right error message', () => {
      expect(body.body.status_message).toBe(sessionData.expectedMessage);
    });

    it('should return the error schema', ()=>{
        deleteList.response().to.have.jsonSchema(expectedErrorSchema);
    });
  });

  describe.each(invalidApiKeyData)('$description', (apiKeyData) => {
    let deleteList;
    let body;
    it(`should return 401 when using an invalid API key: ${apiKeyData.apiKey}`, async () => {
      deleteList = spec()
        .delete(`/list/${listId}`)
        .withHeaders('Authorization', apiKeyData.apiKey)
        .withQueryParams('session_id', SESSION_ID);

      body = await deleteList.expectStatus(apiKeyData.expectedStatus).toss();
    });

    it('should return the right error message', () => {
      expect(body.body.status_message).toBe(apiKeyData.expectedMessage);
    });

    it('should return the error schema', ()=>{
        deleteList.response().to.have.jsonSchema(expectedErrorSchema);
    });
  });

  afterAll(async () => {
      await spec()
        .delete(`/list/${listId}`)
        .withQueryParams('session_id', SESSION_ID);
    });
});