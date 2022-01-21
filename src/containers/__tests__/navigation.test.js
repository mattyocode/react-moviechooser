import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { reduxTestRender } from "../../mocks/test-utils";

import { NavbarContainer } from "../navigation";

describe("<NavbarContainer/> tests", () => {
  const testNavData = [
    {
      id: 4,
      url: "/#about",
      text: "About",
      highlight: false,
      activeClass: "none",
      authRequired: false,
    },
    {
      id: 1,
      url: "/movies/surprise",
      text: "Surprise Me",
      highlight: false,
      activeClass: "active",
      authRequired: false,
    },
    {
      id: 2,
      url: "/user/lists",
      text: "My List",
      highlight: false,
      activeClass: "none",
      authRequired: true,
    },
  ];
  const authorizedInitialAuthState = {
    token: "testtoken",
    refreshToken: "test-refresh-token",
    account: { username: "test-user", email: "test@email.com" },
    status: "idle",
    error: null,
  };
  const unauthorizedInitialAuthState = {
    token: null,
    refreshToken: null,
    account: null,
    status: "idle",
    error: null,
  };

  it("renders <NavbarContainer/> with links data", () => {
    reduxTestRender(
      <MemoryRouter>
        <NavbarContainer linksData={testNavData} />
      </MemoryRouter>,
      { preloadedState: { auth: { auth: unauthorizedInitialAuthState } } }
    );

    expect(screen.getByText(/about/i)).toBeTruthy();
    expect(screen.getByText(/surprise me/i)).toBeTruthy();
  });

  it("renders <NavbarContainer/> with sign in link when not authorised", () => {
    reduxTestRender(
      <MemoryRouter>
        <NavbarContainer linksData={testNavData} />
      </MemoryRouter>,
      { preloadedState: { auth: { auth: unauthorizedInitialAuthState } } }
    );
    expect(screen.getByText(/sign in/i)).toBeTruthy();
  });

  it("renders <NavbarContainer/> with greeting and list link when signed in", () => {
    reduxTestRender(
      <MemoryRouter>
        <NavbarContainer linksData={testNavData} />
      </MemoryRouter>,
      { preloadedState: { auth: { auth: authorizedInitialAuthState } } }
    );
    expect(screen.getByText(/test-user/i)).toBeTruthy();
    expect(screen.getByText(/my list/i)).toBeTruthy();
  });

  it("launches and closes auth modal when sign in clicked", () => {
    reduxTestRender(
      <MemoryRouter>
        <NavbarContainer linksData={testNavData} />
      </MemoryRouter>,
      { preloadedState: { auth: { auth: unauthorizedInitialAuthState } } }
    );
    const signInBtn = screen.getByText(/sign in/i);
    userEvent.click(signInBtn);

    expect(screen.getByTestId(/login-form/i)).toBeTruthy();

    const modalBackdrop = screen.getByTestId(/modal-backdrop/i);
    userEvent.click(modalBackdrop);
  });
});
