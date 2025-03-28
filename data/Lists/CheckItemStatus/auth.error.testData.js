const request = {
  name: 'Invalid Authentication Test List',
  description: 'Testing adding a movie with invalid authentication',
  language: 'en',
};

const invalidApiKeyData = [
  {
    description: 'Invalid API key',
    apiKey: 'Bearer invalid_token_example',
    expectedStatus: 401,
    expectedMessage: 'Invalid API key: You must be granted a valid key.',
    responseBodyStatusCode: 7,
  },
  {
    description: 'Invalid API key',
    apiKey: 4553343,
    expectedStatus: 401,
    expectedMessage: 'Invalid API key: You must be granted a valid key.',
    responseBodyStatusCode: 7,
  },
];

module.exports = { request, invalidApiKeyData };
