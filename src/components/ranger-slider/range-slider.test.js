import React from "react";
import { render } from "@testing-library/react";

import RangeSlider from "./index";

describe("<RangeSlider/>", () => {
  const testArray = ["1", "2", "3"];
  it("renders <RangeSlider/> component", () => {
    const { getByTestId } = render(
      <RangeSlider
        stepValues={testArray}
        defaultMinIdx={0}
        defaultMaxIdx={2}
        onChange={() => {}}
        dataTestId="runtime"
      />
    );
    expect(getByTestId("range-slider")).toBeTruthy();
  });

  it("shows min and max values", () => {
    const { getByText } = render(
      <RangeSlider
        stepValues={testArray}
        defaultMin={"1"}
        defaultMax={"3"}
        onChange={() => {}}
        dataTestId="runtime"
      />
    );
    expect(getByText("1")).toBeTruthy();
    expect(getByText("3")).toBeTruthy();
  });

  it("displays with default values", () => {
    const { getByTestId } = render(
      <RangeSlider
        stepValues={testArray}
        defaultMin={"1"}
        defaultMax={"3"}
        onChange={() => {}}
        dataTestId="runtime"
      />
    );
    expect(getByTestId("runtime-min-val").value).toBe("1");
    expect(getByTestId("runtime-max-val").value).toBe("3");
  });
});
