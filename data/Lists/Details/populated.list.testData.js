const request = {
  name: 'Test List',
  description: 'Temporary test list with a detailed movie',
  language: 'en',
};

const movieToAdd = {
  media_id: 550,
  title: 'Fight Club',
  overview: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.',
  release_date: '1999-10-15',
  genre_ids: [18, 53],
  original_language: 'en',
  popularity: 88.32,
  vote_average: 8.8,
  vote_count: 24200,
};

module.exports = { request, movieToAdd };
