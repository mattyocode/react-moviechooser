import { TOP_MATCH_COUNT, matchLabel } from "../match";

describe("matchLabel", () => {
  it("labels the first three text results", () => {
    expect(TOP_MATCH_COUNT).toBe(3);
    [0, 1, 2].forEach((index) => {
      expect(matchLabel(index, 0.58)).toBe("Top match");
    });
  });

  it("gives no label from the fourth text result on", () => {
    expect(matchLabel(3, 0.9)).toBeNull();
    expect(matchLabel(29, 0.9)).toBeNull();
  });

  it("gives no label to results without a similarity", () => {
    expect(matchLabel(0, undefined)).toBeNull();
    expect(matchLabel(0, null)).toBeNull();
  });
});
