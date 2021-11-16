import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthForm } from "../auth-form";
import store from "../../store/index";
import * as reactRedux from "react-redux";
import { server, rest } from "../../mocks/server";

describe("<AuthForm /> tests", () => {
  beforeEach(() => {
    render(
      <reactRedux.Provider store={store}>
        <MemoryRouter>
          <AuthForm />
        </MemoryRouter>
      </reactRedux.Provider>
    );
  });
  it("renders the auth form as signin with no props passed", () => {
    expect(
      screen.getByRole("button", { name: /click here to register/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /click here to sign in/i })
    ).toBeNull();
  });

  it("switches to register form on register link click", () => {
    expect(
      screen.getByRole("button", { name: /click here to register/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /click here to sign in/i })
    ).toBeNull();

    const registerLink = screen.getByText(/Click here to register/i);
    fireEvent.click(registerLink);

    expect(
      screen.getByRole("button", { name: /Click here to sign in/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /click here to register/i })
    ).toBeNull();
  });

  it("shows error with incorrect email", async () => {
    const input = screen.getByPlaceholderText("Enter email address");
    await waitFor(() => {
      fireEvent.change(input, {
        target: { value: "notanemailaddress" },
      });
      expect(input).toHaveValue("notanemailaddress");
      userEvent.tab();
      expect(screen.getByText(/Email must be valid/i)).toBeTruthy();
    });
  });

  it("shows error with short password", async () => {
    const input = screen.getByPlaceholderText("Password");
    await waitFor(() => {
      fireEvent.change(input, {
        target: { value: "short" },
      });
      expect(input).toHaveValue("short");
      userEvent.tab();
      expect(
        screen.getByText(/Password must contain at least 8 characters/i)
      ).toBeTruthy();
    });
  });

  it("shows error on register if passwords don't match", async () => {
    cleanup();

    render(
      <reactRedux.Provider store={store}>
        <MemoryRouter>
          <AuthForm login={false} />
        </MemoryRouter>
      </reactRedux.Provider>
    );
    const password1 = screen.getByPlaceholderText("Password");
    const password2 = screen.getByPlaceholderText("Confirm password");

    await waitFor(() => {
      fireEvent.change(password1, {
        target: { value: "passwordone" },
      });
      expect(password1).toHaveValue("passwordone");
      fireEvent.change(password2, {
        target: { value: "passwordtwo" },
      });
      expect(password2).toHaveValue("passwordtwo");
      userEvent.tab();
      expect(screen.getByText(/Passwords must match/i)).toBeTruthy();
    });
  });
});

// it("accepts sign in values on click", async () => {
//   jest.mock();
//   render(
//     <MemoryRouter>
//       <AuthForm />
//     </MemoryRouter>
//   );
// await act(async () => {
//   fireEvent.change(screen.getByPlaceholderText("Enter email address"), {
//     target: { value: "user@example.com" },
//   });
//   fireEvent.change(screen.getByPlaceholderText("Set password"), {
//     target: { value: "testpw123" },
//   });
//   fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

//     expect(screen.getByPlaceholderText("Enter email address").value).toBe(
//       "user@example.com"
//     );
//     expect(screen.getByPlaceholderText("Password").value).toBe(
//       "testpw123"
//     );
//     expect(queryByTestId('error')).toBeFalsy();
//   });
// });
