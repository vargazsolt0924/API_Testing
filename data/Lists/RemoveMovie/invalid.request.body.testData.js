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
      title: 'Forrest Gump',
      overview:
        'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an extraordinary life story.',
      release_date: '1994-07-06',
      genre_ids: [35, 18, 10749],
      original_language: 'en',
      popularity: 78.94,
      vote_average: 8.8,
      vote_count: 1810000,
    },
  ];

  const invalidRemoveMovieRequests = [
    {
      invalidRequest: {
        media_id: {},
      },
      description: 'Removing a movie with an invalid request body (media_id is an object)',
      expectedStatus: 200,  
      responseStatusCode: 21,
      responseStatusMessage: 'Entry not found: The item you are trying to edit cannot be found.',  
    },
    {
      invalidRequest: {
        media_id: 'string_instead_of_number', 
      },
      description: 'Removing a movie with an invalid media_id type',
      expectedStatus: 200,
      responseStatusCode: 21, 
      responseStatusMessage: 'Entry not found: The item you are trying to edit cannot be found.', 
    },
    {
      invalidRequest: {},
      description: 'Removing a movie with an empty request body',
      expectedStatus: 400,
      responseStatusCode: 5,
      responseStatusMessage: 'Invalid parameters: Your request parameters are incorrect.',
    },
  ];
  
  module.exports = { request, moviesToAdd, invalidRemoveMovieRequests };
  