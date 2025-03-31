require('dotenv').config();
const { spec } = require('pactum');
const { request, moviesToAdd, clearListTests } = require('../../../data/Lists/Clear/inappropriate.query.param.testData');
const { expectedSchema } = require('../../../schema/Lists/Clear/response.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Clear - Missing or invalid confirm query param test', () => {
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

  describe.each(clearListTests)('$description', (testCase) => {
    let clearResponse;
    let body;

    beforeAll(async () => {
      clearResponse = spec()
        .post(`/list/${listId}/clear`)
        .withQueryParams({ session_id: SESSION_ID, confirm: testCase.confirm });

      body = await clearResponse.expectStatus(testCase.expected_status).toss();
    });

    it(`should return the expected status code: ${testCase.expected_status}`, () => {
      expect(body.statusCode).toBe(testCase.expected_status);
    });

    it('should return a valid schema', () => {
      clearResponse.response().to.have.jsonSchema(expectedSchema);
    });

    it(`should return the expected response body status code: ${testCase.status_code}`, () => {
      expect(body.body.status_code).toEqual(testCase.status_code);
    });

    it(`should return the expected response body status message: ${testCase.status_message}`, () => {
      expect(body.body.status_message).toEqual(testCase.status_message);
    });
  });

  afterAll(async () => {
    await spec()
      .delete(`/list/${listId}`)
      .withQueryParams('session_id', SESSION_ID);
  });
});
