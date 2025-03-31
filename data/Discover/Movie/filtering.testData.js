const filterCases = [
  {
    description: 'should return movies released in the given year',
    query: { primary_release_year: 2019 },
    expectedStatus: 200,
  },
  {
    description: 'should return only movies with the given genre',
    query: { with_genres: 28 },
    expectedStatus: 200,
  },
  {
    description: 'should return only movies with a rating above 7',
    query: { 'vote_average.gte': 7 },
    expectedStatus: 200,
  },
  {
    description: 'should return action movies released in 2020',
    query: { with_genres: 28, primary_release_year: 2020 },
    expectedStatus: 200,
  },
];
module.exports = { filterCases };
