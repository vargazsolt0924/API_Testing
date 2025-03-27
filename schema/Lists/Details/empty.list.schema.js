const emptyListSchema = {
  type: 'object',
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    description: { type: 'string' },
    items: {
      type: 'array',
      minItems: 0,
      items: {},
    },
  },
  required: ['id', 'name', 'items'],
};

module.exports = { emptyListSchema };
