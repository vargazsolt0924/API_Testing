const detailsSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    title: { type: 'string' },
    original_title: { type: 'string' },
    overview: { type: 'string' },
    genres: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
        },
        required: ['id', 'name'],
      },
    },
    release_date: { type: 'string', format: 'date' },
    popularity: { type: 'number' },
    vote_average: { type: 'number' },
    vote_count: { type: 'integer' },
    runtime: { type: 'integer' },
    status: { type: 'string' },
  },
  required: ['id', 'title', 'original_title', 'overview', 'genres', 'release_date', 'popularity', 'vote_average', 'vote_count', 'runtime', 'status'],
};

module.exports = { detailsSchema };
