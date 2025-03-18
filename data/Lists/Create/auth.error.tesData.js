const authErrorResponse = [
  {
    description: 'when no authentication token is invalid',
    expectedStatus: 401,
    headersAuth: 'Bearer invalid_token_example',
    expectedMessage: 'Invalid API key: You must be granted a valid key.',
    requestBody: {
      name: 'Unauthorized List',
      description: 'This request lacks authentication',
      language: 'en',
    },
  },
];

module.exports = { authErrorResponse };
