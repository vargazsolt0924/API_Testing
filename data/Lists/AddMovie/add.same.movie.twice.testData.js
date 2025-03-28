const request = {
  name: 'Duplicate Movie Test List',
  description: 'Testing adding the same movie twice',
  language: 'en',
};

const addingSameMovieTwiceResponse = [
  {
    description: 'when the same movie is added twice to the list',
    expectedStatus: 403,
    requestBody: { media_id: 550 },
    responseStatusCode: 8,
    responseStatusMessage: 'Duplicate entry: The data you tried to submit already exists.',
  },
];

module.exports = { request, addingSameMovieTwiceResponse };
