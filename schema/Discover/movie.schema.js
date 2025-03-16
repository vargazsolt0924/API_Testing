const successfulSchema = {
  type: 'object',
  properties: {
    page: {
      type: 'integer',
      minimum: 1,
    },
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          adult: { type: 'boolean' },
          backdrop_path: { type: ['string', 'null'] },
          genre_ids: {
            type: 'array',
            items: { type: 'integer' },
          },
          id: { type: 'integer' },
          original_language: { type: 'string' },
          original_title: { type: 'string' },
          overview: { type: 'string' },
          popularity: { type: 'number' },
          poster_path: { type: ['string', 'null'] },
          release_date: { type: 'string', format: 'date' },
          title: { type: 'string' },
          video: { type: 'boolean' },
          vote_average: { type: 'number' },
          vote_count: { type: 'integer' },
        },
        required: [
          'adult',
          'genre_ids',
          'id',
          'original_language',
          'original_title',
          'overview',
          'popularity',
          'release_date',
          'title',
          'video',
          'vote_average',
          'vote_count',
        ],
      },
    },
    total_pages: { type: 'integer', minimum: 1 },
    total_results: { type: 'integer', minimum: 0 },
  },
  required: ['page', 'results', 'total_pages', 'total_results'],
};

module.exports = { successfulSchema };
