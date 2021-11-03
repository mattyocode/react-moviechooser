import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Cookies from "./index";

describe("<Cookies/> component tests", () => {
  it("renders <Cookies.Banner/> with test data", () => {
    render(
      <Cookies>
        <Cookies.Banner>
          <Cookies.BannerText>
            <p>Here is some banner text about cookies.</p>
          </Cookies.BannerText>
        </Cookies.Banner>
      </Cookies>
    );
    expect(screen.getByText(/banner text about cookies/i)).toBeInTheDocument();
    // check react-cookie-consent is loading buttons to DOM
    expect(screen.getByText(/decline/i)).toBeInTheDocument();
    expect(screen.getByText(/understand/i)).toBeInTheDocument();
  });

  it("renders <Cookies.Title/> and <Cookies.Info/> with test data", () => {
    render(
      <Cookies>
        <Cookies.Title>Cookie policy title</Cookies.Title>
        <Cookies.Info>
          <p>This is the cookie policy</p>
          <h3>What are cookies?</h3>
          <p>Tis but a tiny file</p>
        </Cookies.Info>
      </Cookies>
    );
    expect(screen.getByText(/cookie policy title/i)).toBeInTheDocument();
    expect(screen.getByText(/What are cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/Tis but a tiny file/i)).toBeInTheDocument();
  });
});
