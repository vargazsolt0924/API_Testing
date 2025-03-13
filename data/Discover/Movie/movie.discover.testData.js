const expectedSchema = {
    type: "object",
    properties: {
      page: { type: "number", description: "Current page number" },
      results: { type: "array", description: "List of movies" },
      total_pages: { type: "number", description: "Total number of available pages" },
      total_results: { type: "number", description: "Total number of results" }
    },
    required: ["page", "results", "total_pages", "total_results"],
    description: "Schema validation for /discover/movie endpoint"
  };
  
  const statusCodeCases = [
    {
      description: "Valid API request should return 200",
      expectedStatus: 200
    }
  ];
  
  const paginationCases = [
    {
      description: "Valid page number should return corresponding results",
      query: { page: 2 },
      expectedPage: 2,
      expectedStatus: 200
    },
    {
      description: "Invalid page number (negative) should return HTTP 400",
      query: { page: -1 },
      expectedStatus: 400
    }
  ];
  
  const filterCases = [
    {
      description: "Filter movies by release year (2020)",
      query: { primary_release_year: 2020 },
      check: (movie) => movie.release_date.startsWith("2020")
    },
    {
      description: "Filter movies by genre (Action - ID: 28)",
      query: { with_genres: 28 },
      check: (movie) => movie.genre_ids.includes(28)
    }
  ];
  
  const authenticationErrorCases = [
    {
      description: "Missing token should return 401",
      headers: { Authorization: null },
      expectedStatus: 401
    },
    {
      description: "Invalid token should return 401",
      headers: { Authorization: "Bearer invalid_token_example" },
      expectedStatus: 401
    }
  ];
  
  module.exports = {
    expectedSchema,
    statusCodeCases,
    paginationCases,
    filterCases,
    authenticationErrorCases
  };
  