require('dotenv').config();
const { spec } = require('pactum');
const { request, movieToAdd } = require('../../../data/Lists/Details/populated.list.testData');
const { listSchema } = require('../../../schema/Lists/Details/populated.list.schema');

const SESSION_ID = process.env.SESSION_ID;

describe('Lists - General Response Test (Single Detailed Movie)', () => {
  let populatedListId;
  let populatedResponse;
  let populatedResponseBody;
  let movieFromResponse;

  beforeAll(async () => {
    const createList = await spec()
      .post('/list')
      .withQueryParams('session_id', SESSION_ID)
      .withJson(request)
      .expectStatus(201)
      .toss();

    populatedListId = createList.body.list_id;

    await spec()
      .post(`/list/${populatedListId}/add_item`)
      .withQueryParams('session_id', SESSION_ID)
      .withJson({ media_id: movieToAdd.media_id })
      .expectStatus(201);

    populatedResponse = spec()
      .get(`/list/${populatedListId}`)
      .withQueryParams('session_id', SESSION_ID);

    populatedResponseBody = await populatedResponse.expectStatus(200).toss();
  });

  it('should return a populated list with the correct movie', async () => {
    expect(Array.isArray(populatedResponseBody.body.items)).toBe(true);
    expect(populatedResponseBody.body.items.length).toBe(1);

    movieFromResponse = populatedResponseBody.body.items[0];
  });

  describe.each([movieToAdd])('When the movie title is: $title', (movie) => {

    it(`should return the correct movie id: ${movie.media_id}`, async () => {
      expect(movieFromResponse.id).toBe(movie.media_id);
    });

    it(`should return the correct movie title: ${movie.title}`, async () => {
      expect(movieFromResponse.title).toBe(movie.title);
    });

    it(`should return the correct movie release date: ${movie.release_date}`, async () => {
      expect(movieFromResponse.release_date).toBe(movie.release_date);
    });

    it(`should return the correct movie original language: ${movie.original_language}`, async () => {
      expect(movieFromResponse.original_language).toBe(movie.original_language);
    });

    it(`should return a valid vote count (greater than or equal to the expected value)`, async () => {
      expect(movieFromResponse.vote_count).toBeGreaterThanOrEqual(movie.vote_count);
    });

    it('should return a valid schema', () => {
      populatedResponse.response().to.have.jsonSchema(listSchema);
    });

    afterAll(async () => {
      await spec()
        .delete(`/list/${populatedListId}`)
        .withQueryParams('session_id', SESSION_ID);
    });
  });
});
