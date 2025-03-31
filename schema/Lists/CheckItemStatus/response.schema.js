const expectedSchema = {
  type: 'object',
  properties: {
    id: { type: ['integer', 'string'] },
    item_present: { type: 'boolean' },
  },
  required: ['id', 'item_present'],
};

module.exports = { expectedSchema };
