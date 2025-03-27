const listSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          title: { type: 'string' },
          overview: { type: 'string' },
          release_date: { type: 'string', format: 'date' },
          genre_ids: { type: 'array', items: { type: 'integer' } },
          original_language: { type: 'string' },
          popularity: { type: 'number' },
          vote_average: { type: 'number' },
          vote_count: { type: 'integer' },
        },
        required: [
          'id',
          'title',
          'overview',
          'release_date',
          'genre_ids',
          'original_language',
          'popularity',
          'vote_average',
          'vote_count',
        ],
      },
    },
  },
  required: ['id', 'name', 'items'],
};

module.exports = { listSchema };
