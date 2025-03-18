const listResponses = [
  {
    description: 'when the list is empty',
    expectedStatus: 200,
    list_id: 99999,
  },
  {
    description: 'when the list contains movies',
    expectedStatus: 200,
    list_id: 55,
  },
  {
    description: 'when the list_id is invalid',
    expectedStatus: 404,
    list_id: 'invalid',
  },
  {
    description: 'when the list_id does not exist',
    expectedStatus: 404,
    list_id: 333333333,
  },
];

module.exports = { listResponses };
