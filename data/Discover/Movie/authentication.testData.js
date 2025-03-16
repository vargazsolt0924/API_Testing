const authErrors = [
  {
    description: 'should return error when Authorization header is missing',
    headersAuth: null,
    expectedStatus: 401,
    response: {
      status_code: 7,
      status_message: 'Invalid API key: You must be granted a valid key.',
      success: false,
    },
  },
  {
    description: 'should return error when Authorization header is invalid',
    headersAuth: 'Bearer invalid_token_example',
    expectedStatus: 401,
    response: {
      status_code: 7,
      status_message: 'Invalid API key: You must be granted a valid key.',
      success: false,
    },
  },
];

module.exports = { authErrors };
