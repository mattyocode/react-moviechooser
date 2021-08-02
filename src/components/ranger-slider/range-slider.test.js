import React from "react";
import { render } from "@testing-library/react";

import RangeSlider from "./index";

describe("<RangeSlider/>", () => {
  it("renders <RangeSlider/> component", () => {
    const { getByTestId } = render(<RangeSlider />);
    expect(getByTestId("range-slider")).toBeTruthy();
  });

  it("shows min and max values", () => {
    const { getByText } = render(
      <RangeSlider min="1" max="100" onChange={() => {}} />
    );
    expect(getByText("1")).toBeTruthy();
    expect(getByText("100")).toBeTruthy();
    expect(getByText("1000")).toBeFalsy();
  });
});
