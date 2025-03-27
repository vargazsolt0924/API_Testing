const invalidRequestBodyResponse = [
  {
    description: 'when the request body is invalid',
    expectedStatus: 400,
    requestBody: { invalid_field: 1234 },
    responseStatusCode: 5,
    responseStatusMessage: 'Invalid parameters: Your request parameters are incorrect.',
  },
];

module.exports = { invalidRequestBodyResponse };
