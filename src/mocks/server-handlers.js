import "whatwg-fetch";
import { rest } from "msw";
import homepageData from "../fixtures/homepage.json";
import moviesData from "../fixtures/moviesData.json";

const apiUrl = `${process.env.REACT_APP_TEST_API}`;

console.log(apiUrl);

const handlers = [
  rest.get(`${apiUrl}/options`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(homepageData));
  }),
  rest.get(`${apiUrl}/movies/`, async (req, res, ctx) => {
    const queryParams = req.url.searchParams;
    console.log(queryParams);
    return res(ctx.status(200), ctx.json(moviesData));
  }),
  rest.get(`${apiUrl}/movie/random`, async (req, res, ctx) => {
    const movieData = Array(moviesData[0]);
    return res(ctx.status(200), ctx.json(movieData));
  }),
  rest.get(`${apiUrl}/movie/*`, async (req, res, ctx) => {
    const movieData = Array(moviesData[3]);
    return res(ctx.status(200), ctx.json(movieData));
  }),
];

export { handlers };
