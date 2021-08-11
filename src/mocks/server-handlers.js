import "whatwg-fetch";
import { rest } from "msw";
import homepageData from "../fixtures/homepage.json";

const apiUrl = `${process.env.REACT_APP_TEST_API}`;

const handlers = [
  rest.get(`${apiUrl}/options`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(homepageData));
  }),
];

export { handlers };
