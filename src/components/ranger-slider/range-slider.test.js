import React from "react";
import { render } from "@testing-library/react";

import RangeSlider from "./index";

describe("<RangeSlider/>", () => {
  it("renders <RangeSlider/> component", () => {
    const { getByTestId } = render(<RangeSlider />);
    expect(getByTestId("range-slider")).toBeTruthy();
  });
  it("shows min value label", () => {
    const { getByTestId } = render(<RangeSlider />);
    expect(getByTestId("decade-min-val")).toBeTruthy();
  });
});
