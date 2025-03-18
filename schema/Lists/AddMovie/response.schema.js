const expectedSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    status_code: { type: 'number' },
    status_message: { type: 'string' },
    movie_id: { type: 'number' },
  },
  required: ['success', 'status_code', 'status_message', 'movie_id'],
};

module.exports = { expectedSchema };
