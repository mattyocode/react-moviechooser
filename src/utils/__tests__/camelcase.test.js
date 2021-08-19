import keysToCamel from "../camelcase";

describe("camelcase tests", () => {
  it("converts key and not value in object to camelcase", () => {
    const inputObj = { snake_case_key: "snake_case_value" };

    const newObj = keysToCamel(inputObj);
    expect(newObj).toStrictEqual({ snakeCaseKey: "snake_case_value" });
  });

  it("converts keys in nested objects to camelcase", () => {
    const inputObj = {
      main_data: {
        min_amount: 27,
        max_amount: 99,
      },
    };

    const newObj = keysToCamel(inputObj);
    expect(newObj).toStrictEqual({
      mainData: {
        minAmount: 27,
        maxAmount: 99,
      },
    });
  });
  it("doesn't convert array values to camelcase", () => {
    const inputObj = ["one", "two", "three"];

    const newObj = keysToCamel(inputObj);
    expect(newObj).toStrictEqual(["one", "two", "three"]);
  });
  it("doesn't convert nested array values to camelcase", () => {
    const inputObj = {
      main_data: {
        min_amount: 27,
        nested_array: ["one", "two", "three"],
      },
    };

    const newObj = keysToCamel(inputObj);
    expect(newObj).toStrictEqual({
      mainData: { minAmount: 27, nestedArray: ["one", "two", "three"] },
    });
  });
});
