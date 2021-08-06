import React from "react";
import { render, screen } from "@testing-library/react";

import RangeSlider from "./index";

describe("<RangeSlider/>", () => {
  const testArray = ["1", "2", "3"];
  it("renders <RangeSlider/> component", () => {
    render(
      <RangeSlider
        stepValues={testArray}
        defaultMinIdx={0}
        defaultMaxIdx={2}
        onChange={() => {}}
        dataTestId="runtime"
      />
    );
    expect(screen.getByTestId("range-slider")).toBeTruthy();
  });

  it("shows min and max values", () => {
    render(
      <RangeSlider
        stepValues={testArray}
        minValue={0}
        maxValue={2}
        updateMin={() => {}}
        updateMax={() => {}}
        dataTestId="runtime"
      />
    );
    expect(screen.getByText("1")).toBeTruthy();
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("displays with default values", () => {
    render(
      <RangeSlider
        stepValues={testArray}
        minValue={0}
        maxValue={1}
        updateMin={() => {}}
        updateMax={() => {}}
        dataTestId="runtime"
      />
    );
    expect(screen.getByTestId("runtime-min-val").value).toBe("1");
    expect(screen.getByTestId("runtime-max-val").value).toBe("2");
  });

  it("shows one value when single runtime is selected", () => {
    render(
      <RangeSlider
        stepValues={testArray}
        minValue={0}
        maxValue={0}
        updateMin={() => {}}
        updateMax={() => {}}
        dataTestId="runtime"
      />
    );

    const minValDisplay = screen.queryByTestId("runtime-min-val");
    const maxValDisplay = screen.queryByTestId("runtime-max-val");

    expect(minValDisplay).toBeNull();
    expect(maxValDisplay).toBeNull();
    expect(screen.getByTestId("runtime-val").value).toBe("1");
  });
});
