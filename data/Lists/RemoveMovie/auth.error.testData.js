const request = {
    name: 'Invalid Authentication Test List',
    description: 'Testing removing a movie with invalid authentication',
    language: 'en',
  };

  const moviesToAdd = [
    {
      media_id: 550,
    },
    {
      media_id: 238,
    },
    {
      media_id: 13,
    },
  ];
  
  const invalidSessionData = [
    {
      media_id: { media_id: 13 },
      description: 'Invalid session ID',
      sessionId: 'invalid_session_id',
      expectedStatus: 401,
      expectedMessage: 'Authentication failed: You do not have permissions to access the service.',
    },
    {
      media_id: { media_id: 13 },
      description: 'Invalid session ID',
      sessionId: 1231232121,
      expectedStatus: 401,
      expectedMessage: 'Authentication failed: You do not have permissions to access the service.',
    },
  ];
  const invalidApiKeyData = [
    {
      media_id: { media_id: 13 },
      description: 'Invalid API key',
      apiKey: 'Bearer invalid_token_example',
      expectedStatus: 401,
      expectedMessage: 'Invalid API key: You must be granted a valid key.',
    },
  
    {
      media_id: { media_id: 13 },
      description: 'Invalid API key',
      apiKey: 4553343,
      expectedStatus: 401,
      expectedMessage: 'Invalid API key: You must be granted a valid key.',
    },
  ];
  module.exports = { request, moviesToAdd, invalidSessionData, invalidApiKeyData };
  