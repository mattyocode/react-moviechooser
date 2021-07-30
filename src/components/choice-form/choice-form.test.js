import React from "react";
import { render } from "@testing-library/react";

import ChoiceForm from "./index";

describe("<ChoiceForm/>", () => {
  it("renders <ChoiceForm/>", () => {
    const { getByTestId } = render(<ChoiceForm></ChoiceForm>);

    expect(getByTestId("choice-form")).toBeTruthy();
  });
});
