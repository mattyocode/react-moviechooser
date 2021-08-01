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
      <ChoiceForm>
        <ChoiceForm.Base>
          <ChoiceForm.Panel>
            <ChoiceForm.Title>Genre</ChoiceForm.Title>
            <ChoiceForm.AllButton>Select All</ChoiceForm.AllButton>
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
        </ChoiceForm.Base>
      </ChoiceForm>
    );

    expect(getByText("Comedy")).toBeTruthy();
  });
});
