require('dotenv').config();
const { spec } = require('pactum');
const { request } = require('../../../data/Lists/Details/empty.list.testData');
const { emptyListSchema } = require('../../../schema/Lists/Details/empty.list.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - Empty List Test', () => {
  let emptyListId;
  let createList;
  let emptyResponse;
  let emptyResponseBody;

  beforeAll(async () => {
    createList = await spec().post('/list').withQueryParams('session_id', SESSION_ID).withJson(request).toss();
    emptyListId = createList.body.list_id;

    emptyResponse = spec().get(`/list/${emptyListId}`).withQueryParams('session_id', SESSION_ID);
    emptyResponseBody = await emptyResponse.expectStatus(200).toss();
  });

  test('should return an empty list', async () => {
    expect(Array.isArray(emptyResponseBody.body.items)).toBe(true);
    expect(emptyResponseBody.body.items.length).toBe(0);
  });

  it('should return a valid schema', () => {
    emptyResponse.response().to.have.jsonSchema(emptyListSchema);
  });

  afterAll(async () => {
    await spec().delete(`/list/${emptyListId}`).withQueryParams('session_id', SESSION_ID).toss();
  });
});
