import React from "react";
import { render } from "@testing-library/react";
import { ChoiceFormContainer } from "../../containers/choice-form";

describe("<ChoiceFormContainer/>", () => {
  it("renders <ChoiceFormContainer/>", () => {
    const { getByTestId } = render(<ChoiceFormContainer />);

    expect(getByTestId("choice-form")).toBeTruthy();
  });
});
