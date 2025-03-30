const request = {
  name: 'Remove Movie Test List',
  description: 'Removing a movie',
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

const removeMovie = [
  {
    media_id: 550,
    description: 'When a movie is removed from the list',
    status_code: 13,
    status_message: 'The item/record was deleted successfully.',
  },
];

module.exports = { request, moviesToAdd, removeMovie };
