import React from "react";
import { render } from "@testing-library/react";

import ChoiceForm from "./index";

describe("<ChoiceForm/>", () => {
  it("renders <ChoiceForm/>", () => {
    const { getByTestId } = render(<ChoiceForm></ChoiceForm>);

    expect(getByTestId("choice-form")).toBeTruthy();
  });

  it("displays genre", () => {
    const { getByText } = render(
      <ChoiceForm.Panel>
        <ChoiceForm.Heading>
          <ChoiceForm.AllButton>Select All</ChoiceForm.AllButton>
          <h2>Genre</h2>
        </ChoiceForm.Heading>
        <ChoiceForm.Options>
          <ChoiceForm.Checkbox
            name="Comedy"
            index="1"
            checked={true}
            changeHandler={() => {}}
          >
            Comedy
          </ChoiceForm.Checkbox>
        </ChoiceForm.Options>
      </ChoiceForm.Panel>
    );
    expect(getByText("Genre")).toBeTruthy();
    expect(getByText("Comedy")).toBeTruthy();
  });

  // it("shows decade panel", () => {
  //   const { getByTestId } = render();
  // });
});
