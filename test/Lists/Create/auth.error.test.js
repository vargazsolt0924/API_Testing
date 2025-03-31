const { spec } = require('pactum');
const { authErrorResponse } = require('../../../data/Lists/Create/auth.error.tesData');
const { errorSchema } = require('../../../schema/Lists/Create/error.schema');

describe('Lists - Create - AuthenticationW test', () => {
  describe.each(authErrorResponse)('$description', (data) => {
    let createList;
    let body;

    beforeAll(async () => {
      createList = spec()
        .post('/list')
        .withJson(data.requestBody)
        .withHeaders('Authorization', data.headersAuth);
      
      body = await createList.expectStatus(401).toss();
    });

    it('should return status code 401', () => {
      expect(body.statusCode).toBe(data.expectedStatus);
    });

    it('should return a valid schema', () => {
      createList.response().to.have.jsonSchema(errorSchema);
    });

    it('should return an authentication error message', () => {
      expect(body.body.status_message).toEqual(data.expectedMessage);
    });

    it('should indicate authentication failure', () => {
      expect(body.body.success).toBe(false);
    });
  });
});
