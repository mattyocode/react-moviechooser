import React from "react";
import { render, screen } from "@testing-library/react";

import ChoiceForm from "./index";

describe("<ChoiceForm/>", () => {
  it("renders <ChoiceForm/>", () => {
    render(<ChoiceForm></ChoiceForm>);

    expect(screen.getByTestId("choice-form")).toBeTruthy();
  });

  it("displays genre panel", () => {
    render(
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
    expect(screen.getByText("Genre")).toBeTruthy();
    expect(screen.getByText("Comedy")).toBeTruthy();
    expect(screen.getByText("Select All")).toBeTruthy();
  });

  it("renders submit buttons", () => {
    render(
      <ChoiceForm.Panel>
        <ChoiceForm.Submit>
          <ChoiceForm.SubmitBtn>Submit</ChoiceForm.SubmitBtn>
        </ChoiceForm.Submit>
      </ChoiceForm.Panel>
    );

    expect(screen.getByTestId("submit-btns")).toBeTruthy();
    expect(screen.getByRole("button", /submit/i)).toBeTruthy();
  });
});
