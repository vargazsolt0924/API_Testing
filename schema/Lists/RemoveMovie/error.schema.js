const expectedErrorSchema = {
    type: 'object',
    properties: {
      status_code: { type: 'integer' },
      status_message: { type: 'string' },
      success: { type: 'boolean' },
    },
    required: ['status_code', 'status_message', 'success'],
  };
  
  module.exports = { expectedErrorSchema };
  