const errorSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    failure: { type: 'boolean' },
    status_code: { type: 'number' },
    status_message: { type: 'string' },
    error: { type: 'string' },
  },
  required: ['success', 'status_code', 'status_message'],
};

module.exports = { errorSchema };
