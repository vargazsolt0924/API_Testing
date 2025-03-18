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
        },
        required: ['id', 'title', 'overview', 'release_date'],
      },
    },
  },
  required: ['id', 'name', 'items'],
};
module.exports = { listSchema };
