import "whatwg-fetch";
import { rest } from "msw";
import testGenreData from "../fixtures/testGenreData.json";
import moviesData from "../fixtures/updatedMoviesData.json";

const apiUrl = `${process.env.REACT_APP_TEST_API}`;

// console.log(apiUrl);

const handlers = [
  rest.get(`${apiUrl}/genres/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testGenreData));
  }),
  rest.get(`${apiUrl}/movies/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(moviesData));
  }),
  rest.get(`${apiUrl}/movies/random`, async (req, res, ctx) => {
    const movieData = moviesData[0];
    return res(ctx.status(200), ctx.json(movieData));
  }),
  rest.get(`${apiUrl}/movies/123`, async (req, res, ctx) => {
    const movieData = moviesData[3];
    return res(ctx.status(200), ctx.json(movieData));
  }),
];

export { handlers };
