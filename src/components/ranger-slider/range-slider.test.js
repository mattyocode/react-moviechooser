import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

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
        dataTestId=""
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
        dataTestId=""
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
        dataTestId="test"
      />
    );
    expect(screen.getByTestId("test-min-val").value).toBe("1");
    expect(screen.getByTestId("test-max-val").value).toBe("2");
  });

  it("shows one value when single runtime is selected", () => {
    render(
      <RangeSlider
        stepValues={testArray}
        minValue={0}
        maxValue={0}
        updateMin={() => {}}
        updateMax={() => {}}
        dataTestId="test"
      />
    );

    const minValDisplay = screen.queryByTestId("test-min-val");
    const maxValDisplay = screen.queryByTestId("test-max-val");

    expect(minValDisplay).toBeNull();
    expect(maxValDisplay).toBeNull();
    expect(screen.getByTestId("test-val").value).toBe("1");
  });

  it("clicking label calls updateMin and updateMax with label value", () => {
    const updateMinFn = jest.fn();
    const updateMaxFn = jest.fn();

    render(
      <RangeSlider
        stepValues={testArray}
        minValue={0}
        maxValue={2}
        updateMin={updateMinFn}
        updateMax={updateMaxFn}
        dataTestId="test"
      />
    );

    const minValDisplay = screen.queryByTestId("test-min-val");
    const maxValDisplay = screen.queryByTestId("test-max-val");

    expect(minValDisplay.value).toBe("1");
    expect(maxValDisplay.value).toBe("3");

    fireEvent.click(screen.getByTestId("slider-label-2"));

    expect(updateMinFn).toHaveBeenCalledWith(1);
    expect(updateMaxFn).toHaveBeenCalledWith(1);
  });
});
