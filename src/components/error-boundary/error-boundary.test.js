import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ErrorBoundary from ".";

function Broken() {
  throw new Error("boom");
}

// React re-throws caught render errors to window in development; keep them
// out of the test output.
const swallow = (event) => event.preventDefault();
beforeAll(() => window.addEventListener("error", swallow));
afterAll(() => window.removeEventListener("error", swallow));

describe("<ErrorBoundary/>", () => {
  it("renders children when nothing throws", () => {
    render(
      <ErrorBoundary resetKey="/">
        <p>All good</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("shows a fallback instead of a blank page when a child throws", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary resetKey="/">
        <Broken />
      </ErrorBoundary>
    );
    expect(screen.getByTestId("error-boundary")).toBeInTheDocument();
    console.error.mockRestore();
  });

  it("recovers when the reset key changes", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { rerender } = render(
      <ErrorBoundary resetKey="/a">
        <Broken />
      </ErrorBoundary>
    );
    rerender(
      <ErrorBoundary resetKey="/b">
        <p>Next page</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("Next page")).toBeInTheDocument();
    console.error.mockRestore();
  });
});
