const errorCases = [
  {
    description: 'when list_id is invalid',
    expectedStatus: 404,
    listId: 'invalid_id',
    status_message: 'Invalid id: The pre-requisite id is invalid or not found.',
  },
  {
    description: 'when list_id does not exist',
    expectedStatus: 404,
    listId: 99999999,
    status_message: 'The resource you requested could not be found.',
  },
];

module.exports = { errorCases };
