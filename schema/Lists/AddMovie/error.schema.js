const expectedSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    status_code: { type: 'integer' },
    status_message: { type: 'string' },
  },
  required: ['success', 'status_code', 'status_message'],
};

module.exports = { expectedSchema };
