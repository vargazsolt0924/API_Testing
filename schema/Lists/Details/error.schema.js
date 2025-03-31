const errorSchema = {
  type: 'object',
  properties: {
    status_code: { type: 'number' },
    status_message: { type: 'string' },
    success: { type: 'boolean' },
  },
  required: ['status_code', 'status_message', 'success'],
};

module.exports = { errorSchema };
