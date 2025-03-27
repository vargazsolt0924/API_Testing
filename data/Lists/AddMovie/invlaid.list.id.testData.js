const listIdTestData = [
  {
    description: 'when the list_id is invalid',
    expectedStatus: 404,
    requestBody: { media_id: 550 },
    listId: 'invalid_id',
    responseStatusCode: 6,
  },
  {
    description: 'when the list_id does not exist',
    expectedStatus: 404,
    requestBody: { media_id: 550 },
    listId: '99999999',
    responseStatusCode: 34,
  },
];

module.exports = { listIdTestData };
