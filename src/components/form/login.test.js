import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Form } from "../../components";

describe("<Form/>", () => {
  it("renders <Form /> for register with data", () => {
    render(
      <Form>
        <Form.Header>Register</Form.Header>
        <Form.Base>
          <Form.Input placeholder="Username" onChange={() => {}} />
          <Form.Input placeholder="Email address" onChange={() => {}} />
          <Form.Input
            type="password"
            placeholder="Password"
            onChange={() => {}}
          />
          <Form.Submit type="submit" disabled>
            Sign up
          </Form.Submit>
        </Form.Base>
      </Form>
    );

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i).disabled).toBeTruthy();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("renders <Form /> for register with error", () => {
    render(
      <Form>
        <Form.Error>There is an error with the form</Form.Error>
        <Form.Submit type="submit">Sign In</Form.Submit>
      </Form>
    );

    expect(
      screen.getByText(/There is an error with the form/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign in/i).disabled).toBeFalsy();
  });
});
