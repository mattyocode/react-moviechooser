import React from "react";
import { render } from "@testing-library/react";

import RangeSlider from "./index";

describe("<RangeSlider/>", () => {
  it("renders <RangeSlider/> component", () => {
    const { getByTestId } = render(<RangeSlider />);
    expect(getByTestId("range-slider")).toBeTruthy();
  });
});
