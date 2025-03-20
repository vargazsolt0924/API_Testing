const invalidTestCases = [
  {
    description: 'when the list_id is invalid',
    expectedStatus: 404,
    list_id: 'invalid',
    status_message: 'Invalid id: The pre-requisite id is invalid or not found.',
  },
  {
    description: 'when the list_id does not exist',
    expectedStatus: 404,
    list_id: 333333333,
    status_message: 'The resource you requested could not be found.',
  },
];

module.exports = { invalidTestCases };
