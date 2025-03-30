const request = {
    name: 'Remove Movie Test List',
    description: 'Removing a movie',
    language: 'en',
  };

  const deleteList = [
    {
      description: 'When a list is deleted',
      status_code: 13,
      status_message: 'The item/record was deleted successfully.',
    },
  ];

  module.exports ={request, deleteList}