const expectedSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    status_code: { type: 'number' },
    status_message: { type: 'string' },
    list_id: { type: 'number' },
  },
  required: ['success', 'status_code', 'status_message', 'list_id'],
};

module.exports = { expectedSchema };
