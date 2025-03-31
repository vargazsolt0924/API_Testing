require('dotenv').config();
const { spec } = require('pactum');
const { request, invalidApiKeyData } = require('../../../data/Lists/CheckItemStatus/auth.error.testData');
const { invalidSchema } = require('../../../schema/Lists/CheckItemStatus/error.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Check Item Status - Authentication test', () => {
  let createMovie;
  let listId;

  beforeAll(async () => {
    createMovie = await spec()
      .post('/list')
      .withQueryParams('session_id', SESSION_ID)
      .withJson(request)
      .toss();

    listId = createMovie.list_id;
  });

  describe.each(invalidApiKeyData)('$description', (data) => {
    let invalidGET;
    let body;

    it(`should return ${data.expectedStatus} when using an invalid API key: ${data.apiKey}`, async () => {
      invalidGET = spec()
        .get(`/list/${listId}`)
        .withHeaders('Authorization', data.apiKey);

      body = await invalidGET.expectStatus(data.expectedStatus).toss();
    });

    it('should return the correct error message', () => {
      expect(body.body.status_message).toBe(data.expectedMessage);
    });

    it('should return the correct error code', () => {
      expect(body.body.status_code).toBe(data.responseBodyStatusCode);
    });

    it('should match the error schema', () => {
      invalidGET.response().to.have.jsonSchema(invalidSchema);
    });
  });

  afterAll(async () => {
    await spec()
      .delete(`/list/${listId}`)
      .withQueryParams('session_id', SESSION_ID);
  });
});
