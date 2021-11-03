import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CookieConsentContainer } from "../cookie-consent";

describe("<CookieConsentContainer/> tests", () => {
  it("renders <CookieConsentContainer/>", () => {
    render(<CookieConsentContainer />);
    expect(screen.getByTestId("cookie-banner")).toBeInTheDocument();
    expect(screen.getByText(/cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/learn more/i)).toBeInTheDocument();
  });

  it("renders <CookieConsentContainer/> modal when `learn more` clicked", () => {
    render(<CookieConsentContainer />);
    expect(screen.getByTestId("cookie-banner")).toBeInTheDocument();
    expect(screen.queryByTestId("cookie-modal")).toBeNull();

    const learnMoreModal = screen.getByText(/learn more/i);
    fireEvent.click(learnMoreModal);

    expect(screen.getByTestId("cookie-modal")).toBeInTheDocument();
    expect(screen.getByText(/This is the Cookie Policy/i)).toBeInTheDocument();
  });

  it("closes modal <CookieConsentContainer/> modal when backdrop clicked", () => {
    render(<CookieConsentContainer />);

    const learnMoreModal = screen.getByText(/learn more/i);
    fireEvent.click(learnMoreModal);

    expect(screen.getByTestId("cookie-modal")).toBeInTheDocument();

    const modalBackdrop = screen.getByTestId("modal-backdrop");
    fireEvent.click(modalBackdrop);

    expect(screen.queryByTestId("cookie-modal")).toBeNull();
  });
});
