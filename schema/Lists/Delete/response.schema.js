const expectedSchema = {
    type: 'object',
    properties: {
      status_code: { type: 'number' },
      status_message: { type: 'string' },
    },
    required: ['status_code', 'status_message'],
  };
  
  module.exports = { expectedSchema };
  