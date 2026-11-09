import queryString from "../query-string";

describe("queryString tests", () => {
  it("creates query string from genre array", () => {
    const genreInput = { genre: [5, 4] };
    const output = queryString(genreInput);
    expect(output).toEqual("g=5,4");
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
    expect(output).toEqual("g=5,4&rmin=75&rmax=120&dmin=1970&dmax=cur");
  });

  it("adds trimmed, encoded text after the filters", () => {
    const output = queryString({ text: "  fish & chips  ", genre: [5] });
    expect(output).toEqual("g=5&q=fish%20%26%20chips");
  });

  it("encodes apostrophes safely", () => {
    expect(queryString({ text: "i'm hungry" })).toEqual("q=i'm%20hungry");
  });

  it("leaves out blank text", () => {
    expect(queryString({ text: "   ", genre: [5] })).toEqual("g=5");
    expect(queryString({ text: "" })).toEqual("");
  });
});
