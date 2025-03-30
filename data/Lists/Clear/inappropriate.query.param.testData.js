const request = {
  name: 'Clear List Test',
  description: 'clearing a list with inappropriate query param',
  language: 'en',
};

const moviesToAdd = [
  { media_id: 550 },
  { media_id: 238 },
  { media_id: 13 },
];

const clearListTests = [
  {
    description: 'Missing confirm query param',
    confirm: undefined, 
    expected_status: 400, 
    status_code: 29,
    status_message: 'You must confirm this action: Please provide a confirm=true parameter.',
  },
  {
    description: 'Confirm query param set to false',
    confirm: false, 
    expected_status: 400, 
    status_code: 29, 
    status_message: 'You must confirm this action: Please provide a confirm=true parameter.',
  },
  {
    description: 'Confirm query param set to an invalid string',
    confirm: 'invalid', 
    expected_status: 400, 
    status_code: 29, 
    status_message: 'You must confirm this action: Please provide a confirm=true parameter.',
  },
];

module.exports = { request, moviesToAdd, clearListTests };
