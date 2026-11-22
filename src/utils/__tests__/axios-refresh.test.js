import { server, rest } from "../../mocks/server";
import { client } from "../axios-refresh";

describe("client", () => {
  it("rejects with the error message when a request gets no response", async () => {
    server.use(
      rest.get(`${import.meta.env.VITE_API}/api/unreachable/`, (req, res) =>
        res.networkError("Failed to connect")
      )
    );

    await expect(client.get("api/unreachable/")).rejects.toMatch(
      /network error/i
    );
  });
});
