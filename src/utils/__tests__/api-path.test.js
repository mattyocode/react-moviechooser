import apiPath from "../api-path";

describe("apiPath", () => {
  it.each([
    ["http://localhost:8000/api/movies/?page=2", "api/movies/?page=2"],
    ["http://api1.moviechooser.co.uk/list/?page=3", "list/?page=3"],
    ["/api/movies/?page=2&g=1&g=4", "api/movies/?page=2&g=1&g=4"],
    ["api/movies/?q=a%20heist&page=2", "api/movies/?q=a%20heist&page=2"],
  ])("%s -> %s", (url, expected) => {
    expect(apiPath(url)).toBe(expected);
  });
});
