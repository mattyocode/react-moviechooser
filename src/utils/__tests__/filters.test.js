import { describeQuery, sliderDefaults } from "../filters";
import homepageData from "../../fixtures/homepage.json";

const genres = [
  { id: 1, name: "Mystery" },
  { id: 8, name: "Crime" },
];

describe("sliderDefaults", () => {
  it("uses the full range without a saved range", () => {
    expect(sliderDefaults(homepageData.decade)).toEqual({
      min: "Pre-60s",
      max: "20s",
    });
    expect(sliderDefaults(homepageData.runtime)).toEqual({
      min: "Short",
      max: "Long",
    });
  });

  it("maps a saved range back to step labels", () => {
    expect(
      sliderDefaults(homepageData.runtime, { min: "90", max: ">150" })
    ).toEqual({ min: "1h30", max: "Long" });
  });

  it("falls back for unrecognised values", () => {
    expect(
      sliderDefaults(homepageData.decade, { min: "1880", max: "2010" })
    ).toEqual({ min: "Pre-60s", max: "10s" });
  });
});

describe("describeQuery", () => {
  it("returns null without a query", () => {
    expect(describeQuery(undefined, genres, homepageData)).toBeNull();
  });

  it("describes chosen genres and ranges", () => {
    const summary = describeQuery(
      {
        genre: [8, 1],
        decade: { min: "1970", max: "2020" },
        runtime: { min: "75", max: "120" },
      },
      genres,
      homepageData
    );
    expect(summary).toEqual({
      genre: "Crime, Mystery",
      decade: "1970s – Current",
      runtime: "75m – 2h",
      text: "",
      isDefaultFilters: false,
    });
  });

  it("uses 'any' labels for no genres and full ranges", () => {
    const summary = describeQuery(
      {
        genre: [],
        decade: { min: "pre", max: "2020" },
        runtime: { min: "<75", max: ">150" },
      },
      genres,
      homepageData
    );
    expect(summary).toEqual({
      genre: "Any genre",
      decade: "Any decade",
      runtime: "Any length",
      text: "",
      isDefaultFilters: true,
    });
  });

  it("shows a single value when min equals max", () => {
    const summary = describeQuery(
      { genre: [], decade: { min: "1990", max: "1990" } },
      genres,
      homepageData
    );
    expect(summary.decade).toBe("1990s");
  });

  it("includes the trimmed text", () => {
    const summary = describeQuery(
      { text: "  i'm hungry ", genre: [] },
      genres,
      homepageData
    );
    expect(summary.text).toBe("i'm hungry");
    expect(summary.isDefaultFilters).toBe(true);
  });

  it("is not default when any filter narrows the search", () => {
    const narrowed = [
      { genre: [8] },
      { decade: { min: "1990", max: "2000" } },
      { runtime: { min: "<75", max: "120" } },
    ];
    narrowed.forEach((query) => {
      expect(
        describeQuery({ text: "heist", ...query }, genres, homepageData)
          .isDefaultFilters
      ).toBe(false);
    });
  });
});
