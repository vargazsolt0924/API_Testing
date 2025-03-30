const request = {
    name: 'Clear List Test',
    description: 'clearing a list',
    language: 'en',
  };
  
  const moviesToAdd = [
    {
      media_id: 550,
    },
    {
      media_id: 238,
    },
    {
      media_id: 13,
    },
  ];

  const clearList = [
    { 
        description: 'When a list is cleared',
        status_code: 12,
        status_message: 'The item/record was updated successfully.',
    },
  ];

  module.exports = {request, moviesToAdd, clearList}