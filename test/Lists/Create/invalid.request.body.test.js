const { spec } = require('pactum');
const { invalidRequestBody } = require('../../../data/Lists/Create/invalid.request.body.testData');
const { errorSchema } = require('../../../schema/Lists/Create/error.schema.js');

describe('Lists - Create - Invalid Request Body test', () => {
  describe.each(invalidRequestBody)('$description', (data) => {
    let createList;
    let body;

    beforeAll(async () => {
      createList = spec()
        .post('/list')
        .withJson(data.requestBody);

      body = await createList.expectStatus(400).toss();
    });

    it('should return status code 400', () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return a valid error schema', () => {
      createList.response().to.have.jsonSchema(errorSchema);
    });

    it('should return the right error message', () => {
      expect(body.body.status_message).toEqual(data.expectedMessage);
    });
  });
});
