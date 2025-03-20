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
];

module.exports = { listResponses };
