const errorSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    status_code: { type: 'number' },
    status_message: { type: 'string' },
  },
  required: ['success', 'status_code', 'status_message'],
};

module.exports = { errorSchema };
