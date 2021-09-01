import React from "react";
import { screen, render, bindElementToQueries } from "@testing-library/react";

import "@testing-library/jest-dom";

import Modal from "./index";

describe("<Modal/> component tests", () => {
  it("renders Modal component", () => {
    render(<Modal>Modal showing!</Modal>);
    expect(screen.getByText(/modal showing/i)).toBeInTheDocument();
  });
});
