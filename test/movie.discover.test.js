const { spec } = require("pactum");
const { config } = require("dotenv");
config();

describe('',() => {
  let discoverMovie;
  let body;

  beforeAll(async () => {
     discoverMovie = spec().get('/discover/movie');
  })


  test('status code should be 200', async () => {
   // ({body} = await discoverMovie.expectStatus(200).toss())
    discoverMovie.expectStatus(200);
  });

  test('response schema should be correct', async () => {
   // discoverMovie.response().to.have.jsonSchema();
  });
});
