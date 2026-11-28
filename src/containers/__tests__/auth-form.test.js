import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { AuthForm } from "../auth-form";
import store from "../../store/index";
import * as reactRedux from "react-redux";

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
    await userEvent.type(input, "notanemailaddress");
    expect(input).toHaveValue("notanemailaddress");
    await userEvent.tab();
    expect(await screen.findByText(/Email must be valid/i)).toBeTruthy();
  });

  it("shows error with short password", async () => {
    const input = screen.getByPlaceholderText("Password");
    await userEvent.type(input, "short");
    expect(input).toHaveValue("short");
    await userEvent.tab();
    expect(
      await screen.findByText(/Password must contain at least 8 characters/i)
    ).toBeTruthy();
  });

  it("shows error on register if passwords don't match", async () => {
    cleanup();

    render(
      <reactRedux.Provider store={store}>
        <MemoryRouter>
          <AuthForm formTypeInitial={"register"} />
        </MemoryRouter>
      </reactRedux.Provider>
    );
    const password1 = screen.getByPlaceholderText("Password");
    const password2 = screen.getByPlaceholderText("Confirm password");

    await userEvent.type(password1, "passwordone");
    expect(password1).toHaveValue("passwordone");
    await userEvent.type(password2, "passwordtwo");
    expect(password2).toHaveValue("passwordtwo");
    await userEvent.tab();
    expect(await screen.findByText(/Passwords must match/i)).toBeTruthy();
  });
});

// it("accepts sign in values on click", async () => {
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
