const detailsSchema = {
  type: 'object',
  properties: {
    created_by: { type: 'string' },
    description: { type: 'string' },
    favorite_count: { type: 'integer' },
    id: { type: 'integer' },
    iso_639_1: { type: 'string' },
    item_count: { type: 'integer' },
    items: {
      type: 'array',
      items: { type: 'object' },
    },
    name: { type: 'string' },
    page: { type: 'integer' },
    poster_path: { type: ['string', 'null'] },
    total_pages: { type: 'integer' },
    total_results: { type: 'integer' },
  },
  required: [
    'created_by',
    'description',
    'favorite_count',
    'id',
    'iso_639_1',
    'item_count',
    'items',
    'name',
    'page',
    'poster_path',
    'total_pages',
    'total_results',
  ],
};

module.exports = { detailsSchema };
