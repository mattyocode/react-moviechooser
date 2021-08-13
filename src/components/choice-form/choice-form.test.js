import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";

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
      <ChoiceForm.Submit>
        <ChoiceForm.SubmitBtn>Submit</ChoiceForm.SubmitBtn>
      </ChoiceForm.Submit>
    );

    expect(screen.getByTestId("submit-btns")).toBeTruthy();
    expect(screen.getByRole("button", /submit/i)).toBeTruthy();
  });

  it("submit btn calls submit fn", () => {
    const mockOnClick = jest.fn();
    render(
      <ChoiceForm.Submit>
        <ChoiceForm.SubmitBtn name="submit1" onClick={mockOnClick}>
          Submit
        </ChoiceForm.SubmitBtn>
      </ChoiceForm.Submit>
    );

    const submitBtn = screen.getByRole("button", /submit/i);
    fireEvent.click(submitBtn);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders form with an error", () => {
    render(
      <ChoiceForm>
        <ChoiceForm.Error>Error: Request failed.</ChoiceForm.Error>
      </ChoiceForm>
    );

    expect(screen.getByText(/error/i)).toBeTruthy();
  });
});
