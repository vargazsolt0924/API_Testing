require('dotenv').config();
const { spec } = require('pactum');
const { invalidSessionData, invalidApiKeyData } = require('../../../data/Lists/AddMovie/auth.error.testData');

const SESSION_ID = process.env.SESSION_ID;
const request = {
  name: 'Invalid Authentication Test List',
  description: 'Testing adding a movie with invalid authentication',
  language: 'en',
};

describe('Lists - Add Movie - Invalid Authentication', () => {
  let listId;

  beforeAll(async () => {
    const response = await spec()
      .post('/list')
      .withQueryParams('session_id', SESSION_ID)
      .withJson(request)
      .toss();
    listId = response.body.list_id;
  });

  describe.each(invalidSessionData)('$description', (sessionData) => {
    let addMovie;
    let body;
    it(`should return 401 when using an invalid session ID: ${sessionData.sessionId}`, async () => {
      addMovie = spec()
        .post(`/list/${listId}/add_item`)
        .withQueryParams('session_id', sessionData.sessionId)
        .withJson({ media_id: 550 });

      body = await addMovie.expectStatus(sessionData.expectedStatus).toss();
    });

    it('should return the right error message', () => {
      expect(body.body.status_message).toBe(sessionData.expectedMessage);
    });
  });

  describe.each(invalidApiKeyData)('$description', (apiKeyData) => {
    let addMovie;
    let body;
    it(`should return 401 when using an invalid API key: ${apiKeyData.apiKey}`, async () => {
      addMovie = spec()
        .post(`/list/${listId}/add_item`)
        .withHeaders('Authorization', apiKeyData.apiKey)
        .withQueryParams('session_id', SESSION_ID)
        .withJson({ media_id: 550 });

      body = await addMovie.expectStatus(apiKeyData.expectedStatus).toss();
    });

    it('should return the right error message', () => {
      expect(body.body.status_message).toBe(apiKeyData.expectedMessage);
    });
  });
});
