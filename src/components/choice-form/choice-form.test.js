import React from "react";
import { render, screen } from "@testing-library/react";

import ChoiceForm from "./index";

describe("<ChoiceForm/>", () => {
  it("renders <ChoiceForm/>", () => {
    render(<ChoiceForm></ChoiceForm>);

    expect(screen.getByTestId("choice-form")).toBeTruthy();
  });

  it("displays panel with heading and all button", () => {
    render(
      <ChoiceForm.Panel>
        <ChoiceForm.Heading>
          <ChoiceForm.AllButton>Select All</ChoiceForm.AllButton>
          <h2>Test Heading</h2>
        </ChoiceForm.Heading>
      </ChoiceForm.Panel>
    );
    expect(screen.getByText("Test Heading")).toBeTruthy();
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
