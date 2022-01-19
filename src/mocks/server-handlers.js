import "whatwg-fetch";
import { rest } from "msw";
import testGenreData from "../mocks/test-data/testGenreData.json";
import moviesData from "../mocks/test-data/testMoviesData.json";
import listItemData from "../mocks/test-data/testListItemData.json";
import listData from "../mocks/test-data/testListData.json";

const apiUrl = `${process.env.REACT_APP_API}`;

console.log("server-handler apiUrl", apiUrl);

const handlers = [
  rest.get(`${apiUrl}/api/genres/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(testGenreData));
  }),
  rest.get(`${apiUrl}/api/movies/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(moviesData));
  }),
  rest.get(`${apiUrl}/api/movies/random`, async (req, res, ctx) => {
    const movieData = moviesData[0];
    return res(ctx.status(200), ctx.json(movieData));
  }),
  rest.get(`${apiUrl}/api/movies/123`, async (req, res, ctx) => {
    const movieData = moviesData[3];
    return res(ctx.status(200), ctx.json(movieData));
  }),
  rest.get(`${apiUrl}/list/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listData));
  }),
  rest.post(`${apiUrl}/list/`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(listItemData));
  }),
  rest.patch(`${apiUrl}/list/`, async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        ...listItemData,
        watched: true,
      })
    );
  }),
  rest.delete(`${apiUrl}/list/`, async (req, res, ctx) => {
    const { listId } = req.body();
    return res(ctx.status(200), ctx.json({ deleted: listId }));
  }),
];

export { handlers };
