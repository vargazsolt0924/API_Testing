const request = {
  name: 'Test List',
  description: 'A test list for validation',
  language: 'en',
};

const generalResponse = [
  {
    description: 'when the request is successful',
    expectedStatus: 200,
  },
];

module.exports = { request, generalResponse };
