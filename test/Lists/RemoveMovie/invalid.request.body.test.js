require('dotenv').config();
const { spec } = require('pactum');
const { request, invalidRemoveMovieRequests } = require('../../../data/Lists/RemoveMovie/invalid.request.body.testData');
const { expectedErrorSchema } = require('../../../schema/Lists/RemoveMovie/error.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Remove Movie - Invalid Request Body test', () => {
  let listId;

  beforeAll(async () => {
    const { body } = await spec()
      .post('/list')
      .withQueryParams('session_id', SESSION_ID)
      .withJson(request)
      .toss();

    listId = body.list_id;
  });

  describe.each(invalidRemoveMovieRequests)('$description', (data) => {
    let removeMovie;
    let body;

    beforeAll(async () => {
      removeMovie = spec()
        .post(`/list/${listId}/remove_item`)
        .withQueryParams('session_id', SESSION_ID)
        .withJson(data.invalidRequest);

      body = await removeMovie.expectStatus(data.expectedStatus).toss();
    });

    it(`should return status code ${data.expectedStatus}`, () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it(`should return status code ${data.responseStatusCode} in the body`, () => {
      expect(body.body.status_code).toEqual(data.responseStatusCode);
    });

    it(`should return response message: "${data.responseStatusMessage}"`, () => {
      expect(body.body.status_message).toEqual(data.responseStatusMessage);
    });

    it('should return a valid error response schema', () => {
      removeMovie.response().to.have.jsonSchema(expectedErrorSchema);
    });
  });

  afterAll(async () => {
    await spec()
      .delete(`/list/${listId}`)
      .withQueryParams('session_id', SESSION_ID);
  });
});
