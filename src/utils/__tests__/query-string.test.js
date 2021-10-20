import queryString from "../query-string";

describe("queryString tests", () => {
  it("creates query string from genre array", () => {
    const genreInput = { genre: [5, 4] };
    const output = queryString(genreInput);
    expect(output).toEqual("g=5&g=4");
  });

  it("creates query string from runtime obj", () => {
    const runtimeInput = { runtime: { min: "75", max: "120" } };
    const output = queryString(runtimeInput);
    expect(output).toEqual("rmin=75&rmax=120");
  });

  it("creates query string from decade obj", () => {
    const decadeInput = { decade: { min: "1970", max: "cur" } };
    const output = queryString(decadeInput);
    expect(output).toEqual("dmin=1970&dmax=cur");
  });

  it("creates query string from full query obj", () => {
    const decadeInput = {
      genre: [5, 4],
      runtime: { min: "75", max: "120" },
      decade: { min: "1970", max: "cur" },
    };
    const output = queryString(decadeInput);
    expect(output).toEqual("g=5&g=4&rmin=75&rmax=120&dmin=1970&dmax=cur");
  });
});
