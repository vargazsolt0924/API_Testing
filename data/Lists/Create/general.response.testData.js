const generalResponse = [
  {
    description: 'when the request is successful',
    expectedStatus: 201,
    requestBody: {
      name: 'My Movie List',
      description: 'A test list with different content',
      language: 'en',
    },
  },
];

module.exports = { generalResponse };
