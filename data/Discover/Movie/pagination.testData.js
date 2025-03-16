const paginationSuccessfulTestCases = [
  {
    description: 'should return given page',
    query: { page: 2 },
    expectedPage: 2,
    expectedStatus: 200,
  },
];
const paginationInvalidTestCases = [
  {
    description: 'should return error when page is invalid',
    query: { page: -1 },
    response: {
      success: false,
      status_code: 22,
      status_message: 'Invalid page: Pages start at 1 and max at 500. They are expected to be an integer.',
    },
    expectedStatus: 400,
  },
];

module.exports = { paginationSuccessfulTestCases, paginationInvalidTestCases };
