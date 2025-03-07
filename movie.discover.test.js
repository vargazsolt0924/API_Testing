const { spec } = require("pactum");
const { config } = require("dotenv");
config();

const BASE_URL = process.env.BASE_URL;
const API_TOKEN = process.env.API_TOKEN;
const RELEASE_YEAR = 2023;

test("Should return movies released in a specific year", async () => {
  const response = await spec()
    .get(`${BASE_URL}/discover/movie?primary_release_year=${RELEASE_YEAR}`)
    .withHeaders({
      Authorization: `Bearer ${API_TOKEN}`,
    })
    .expectStatus(200);

    const body = response.body;

    expect(body).toHaveProperty('results');
    expect(Array.isArray(body.results)).toBe(true);

    const movies = body.results;

    expect(movies.length).toBeGreaterThan(0);

    movies.forEach((movie) => {
        expect(movie.release_date.startsWith("2023")).toBeTruthy();
      });
});
