import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import RangeSlider from "./index";

afterEach(cleanup);

describe("<RangeSlider/>", () => {
  const testArray = ["1", "2", "3"];

  it("renders <RangeSlider/> component", () => {
    render(
      <RangeSlider
        stepValues={testArray}
        minValue={0}
        maxValue={2}
        onChange={() => {}}
        dataTestId="test"
      />
    );
    expect(screen.getByTestId("test-range-slider")).toBeTruthy();
  });

  it("shows min and max values", () => {
    render(
      <RangeSlider
        stepValues={testArray}
        minValue={0}
        maxValue={2}
        onChange={() => {}}
        dataTestId="test"
      />
    );

    expect(screen.getByTestId("test-min-val").value).toBe("1");
    expect(screen.getByTestId("test-max-val").value).toBe("3");
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

    expect(screen.queryByTestId("test-min-val")).toBeNull();
    expect(screen.queryByTestId("test-max-val")).toBeNull();
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
    expect(updateMinFn).toHaveBeenCalledTimes(1);
    expect(updateMaxFn).toHaveBeenCalledWith(1);
    expect(updateMaxFn).toHaveBeenCalledTimes(1);
  });

  it("renders min and max values if bubbleValues set to true", () => {
    render(
      <RangeSlider
        stepValues={testArray}
        minValue={0}
        maxValue={2}
        updateMin={() => {}}
        updateMax={() => {}}
        dataTestId="test"
        bubbleValues={true}
      />
    );

    const minValDisplay = screen.queryByTestId("test-min-val");
    const maxValDisplay = screen.queryByTestId("test-max-val");

    expect(minValDisplay.value).toBe("1");
    expect(maxValDisplay.value).toBe("3");
  });

  it("swaps min and max if min value is higher than max", () => {
    const updateMinFn = jest.fn();
    const updateMaxFn = jest.fn();
    render(
      <RangeSlider
        stepValues={testArray}
        minValue={0}
        maxValue={1}
        updateMin={updateMinFn}
        updateMax={updateMaxFn}
        dataTestId="test"
        bubbleValues={true}
      />
    );

    const minThumb = screen.getByTestId("test-thumb-min");
    const minVal = screen.getByTestId("test-min-val");

    expect(minVal.value).toBe("1");

    fireEvent.change(minThumb, { target: { value: 2 } });
    expect(updateMinFn).toHaveBeenCalledWith(1);
    expect(updateMaxFn).toHaveBeenCalledWith(2);
  });
});
