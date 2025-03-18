const addMovieResponse = [
  {
    description: 'when the movie is successfully added to the list',
    expectedStatus: 201,
    listId: 123456,
    requestBody: {
      media_id: 550,
    },
  },
];

module.exports = { addMovieResponse };
