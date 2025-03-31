const invalidRequestBody = [
  {
    description: 'when the request body is missing required fields',
    expectedStatus: 400,
    expectedMessage: 'Invalid parameters: Your request parameters are incorrect.',
    requestBody: {
      name: '',
    },
  },
  {
    description: 'when the request body has an invalid data type',
    expectedStatus: 400,
    expectedMessage: 'Invalid parameters: Your request parameters are incorrect.',
    requestBody: {
      description: true,
      language: null,
    },
  },
];

module.exports = { invalidRequestBody };
