const request = {
    name: 'Remove Movie Test List',
    description: 'Removing a movie',
    language: 'en',
  };
  
  const moviesToAdd = [
    {
      media_id: 550,
      title: 'Fight Club',
      overview: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club.',
      release_date: '1999-10-15',
      genre_ids: [18, 53],
      original_language: 'en',
      popularity: 88.32,
      vote_average: 8.8,
      vote_count: 24200,
    },
    {
      media_id: 238,
      title: 'The Godfather',
      overview:
        'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
      release_date: '1972-03-24',
      genre_ids: [18, 80],
      original_language: 'en',
      popularity: 85.19,
      vote_average: 9.2,
      vote_count: 1670000,
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

  const invalidMovies = [
    {
        media_id: 99,
        description: 'Removing a movie that is NOT in the list',
        expectedStatus: 200,
        responseStatusCode: 21,
        responseStatusMessage: 'Entry not found: The item you are trying to edit cannot be found.',
      },
    ];
  
  module.exports = { request, moviesToAdd, invalidMovies };
  