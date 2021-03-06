import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";

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

  it("reflects slider changes in min and max values", () => {
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
      />
    );

    const minThumb = screen.getByTestId("test-thumb-min");
    const minVal = screen.getByTestId("test-min-val");
    const maxThumb = screen.getByTestId("test-thumb-max");
    const maxVal = screen.getByTestId("test-max-val");

    expect(minVal.value).toBe("1");
    expect(maxVal.value).toBe("2");

    fireEvent.change(maxThumb, { target: { value: 2 } });
    fireEvent.change(minThumb, { target: { value: 1 } });

    expect(updateMinFn).toHaveBeenCalledWith(1);
    expect(updateMaxFn).toHaveBeenCalledWith(2);
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
      />
    );

    const minThumb = screen.getByTestId("test-thumb-min");
    const minVal = screen.getByTestId("test-min-val");

    expect(minVal.value).toBe("1");

    fireEvent.change(minThumb, { target: { value: 2 } });
    expect(updateMinFn).toHaveBeenCalledWith(2);
    expect(updateMaxFn).toHaveBeenCalledWith(2);
  });

  it("swaps min and max if max value is higher than min", () => {
    const updateMinFn = jest.fn();
    const updateMaxFn = jest.fn();
    render(
      <RangeSlider
        stepValues={testArray}
        minValue={1}
        maxValue={2}
        updateMin={updateMinFn}
        updateMax={updateMaxFn}
        dataTestId="test"
      />
    );

    const maxThumb = screen.getByTestId("test-thumb-max");
    const maxVal = screen.getByTestId("test-max-val");

    expect(maxVal.value).toBe("3");

    fireEvent.change(maxThumb, { target: { value: 0 } });
    expect(updateMinFn).toHaveBeenCalledWith(0);
    expect(updateMaxFn).toHaveBeenCalledWith(0);
  });

  // it("places max thumb above min thumb at 0th position", () => {
  //   render(
  //     <RangeSlider
  //       stepValues={testArray}
  //       minValue={1}
  //       maxValue={2}
  //       updateMin={() => {}}
  //       updateMax={() => {}}
  //       dataTestId="test"
  //     />
  //   );

  //   const minThumb = screen.getByTestId("test-thumb-min");
  //   const maxThumb = screen.getByTestId("test-thumb-max");

  //   fireEvent.change(minThumb, { target: { value: 0 } });
  //   fireEvent.change(maxThumb, { target: { value: 0 } });

  //   const minThumbStyle = window.getComputedStyle(minThumb);
  //   const maxThumbStyle = window.getComputedStyle(maxThumb);

  //   expect(Number(minThumbStyle.zIndex)).toBeLessThan(
  //     Number(maxThumbStyle.zIndex)
  //   );
  // });

  // it("places min thumb above max thumb at last position", async () => {
  //   render(
  //     <RangeSlider
  //       stepValues={testArray}
  //       minValue={1}
  //       maxValue={2}
  //       updateMin={() => {}}
  //       updateMax={() => {}}
  //       dataTestId="test"
  //     />
  //   );

  //   const minThumb = screen.getByTestId("test-thumb-min");
  //   // const maxThumb = screen.getByTestId("test-thumb-max");

  //   fireEvent.change(minThumb, { target: { value: 2 } });

  //   // const minThumbStyle = window.getComputedStyle(minThumb);
  //   // const maxThumbStyle = window.getComputedStyle(maxThumb);

  //   await waitFor(() => expect(minThumb).toHaveStyle("z-index: 4"));
  // });
});
