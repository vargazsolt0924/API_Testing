require('dotenv').config();
const { spec } = require('pactum');
const { request, moviesToAdd, clearList} = require('../../../data/Lists/Clear/general.response.testData');
const { expectedSchema } = require('../../../schema/Lists/Clear/response.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Remove Movie - Removing a non-existing movie test', () => {
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

  describe.each(clearList)('$description', (movieData) => {
    let clearList;
    let body;

    beforeAll(async () => {
     clearList = spec()
        .post(`/list/${listId}/clear`)
        .withQueryParams({session_id: SESSION_ID,  confirm: true});

      body = await clearList.expectStatus(201).toss();
    });

    it('should return the expected status code for list clear', () => {
      expect(body.statusCode).toBe(201);
    });

    it('should return a valid schema', () => {
      clearList.response().to.have.jsonSchema(expectedSchema);
    });

    it(`should return the expected response body status code: ${movieData.status_code}`, () => {
      expect(body.body.status_code).toBe(movieData.status_code);
    });

    it(`should return the expected response body status message: ${movieData.status_message}`, () => {
      expect(body.body.status_message).toBe(movieData.status_message);
    });
  });

  afterAll(async () => {
    await spec()
      .delete(`/list/${listId}`)
      .withQueryParams('session_id', SESSION_ID);
  });
});