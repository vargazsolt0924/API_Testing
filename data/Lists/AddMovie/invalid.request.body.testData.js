const request = {
  name: 'Invalid Request Body Test List',
  description: 'Testing adding a movie with invalid requestBody',
  language: 'en',
};

const invalidRequestBodyResponse = [
  {
    description: 'when the request body is invalid',
    expectedStatus: 400,
    requestBody: { invalid_field: 1234 },
    responseStatusCode: 5,
    responseStatusMessage: 'Invalid parameters: Your request parameters are incorrect.',
  },
];

module.exports = { request, invalidRequestBodyResponse };
