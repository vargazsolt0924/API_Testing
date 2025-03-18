const invalidRequestBody = [
  {
    description: 'when the request body is missing required fields',
    expectedStatus: 400,
    requestBody: {
      name: '',
    },
  },
  /* {
    description: 'when the request body has an invalid data type',
    expectedStatus: 400,
    requestBody: {
      name: 12345,
      description: true,
      language: null,
    },
  },*/
];

module.exports = { invalidRequestBody };
