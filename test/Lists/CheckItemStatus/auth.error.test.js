require('dotenv').config();
const { spec } = require('pactum');
const { request, invalidApiKeyData } = require('../../../data/Lists/CheckItemStatus/auth.error.testData');
const { errorSchema } = require('../../../schema/Lists/CheckItemStatus/auth.error.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Check Item Status - Invalid Authentication', () => {
  let createMovie;
  let listId;

  beforeAll(async () => {
    createMovie = await spec().post('/list').withQueryParams('session_id', SESSION_ID).withJson(request).toss();
    listId = createMovie.list_id;
  });

  describe.each(invalidApiKeyData)('$description', (apiKeyData) => {
    let invalidGET;
    let body;

    it(`should return ${apiKeyData.expectedStatus} when using an invalid API key: ${apiKeyData.apiKey}`, async () => {
      invalidGET = spec().get(`/list/${listId}`).withHeaders('Authorization', apiKeyData.apiKey);
      body = await invalidGET.expectStatus(apiKeyData.expectedStatus).toss();
    });

    it('should return the correct error message', () => {
      expect(body.body.status_message).toBe(apiKeyData.expectedMessage);
    });

    it('should return the correct error code', () => {
      expect(body.body.status_code).toBe(apiKeyData.responseBodyStatusCode);
    });

    it('should match the error schema', () => {
      invalidGET.response().to.have.jsonSchema(errorSchema);
    });
  });

  afterAll(async () => {
    await spec().delete(`/list/${listId}`).withQueryParams('session_id', SESSION_ID);
  });
});
