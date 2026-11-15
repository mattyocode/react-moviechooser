import { rest } from "msw";

import { server } from "./server";
import watchData from "./test-data/testWatchData.json";

const apiUrl = `${import.meta.env.VITE_API}`;

// Records every watch-endpoint request (MSW 0.34's node server has no request
// events). `respond(req)` returns [status, body]; by default the provider list
// for the requested country. Handlers reset after each test (setupTests.js).
export function countWatchRequests(respond) {
  const seen = [];
  server.use(
    rest.get(`${apiUrl}/api/movies/:slug/watch/`, (req, res, ctx) => {
      seen.push(req.url.href);
      const country = req.url.searchParams.get("country");
      const [status, body] = respond
        ? respond(req)
        : [200, { ...watchData.providers, country }];
      return res(ctx.status(status), ctx.json(body));
    })
  );
  return seen;
}
