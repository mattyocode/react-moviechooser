import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { server, rest } from "../../mocks/server";
import { ProfileData } from "../profile";

const account = { uid: "user-uid-1", username: "film-fan", email: "fan@example.com" };
const userUrl = `${import.meta.env.VITE_API}/accounts/user/:uid/`;

function renderProfile() {
  return render(
    <MemoryRouter>
      <ProfileData account={account} handleLogout={() => {}} />
    </MemoryRouter>
  );
}

describe("<ProfileData/>", () => {
  beforeEach(() => {
    server.use(
      rest.get(userUrl, (req, res, ctx) =>
        res(
          ctx.json({
            uid: req.params.uid,
            username: "film-fan",
            email: "fan@example.com",
            is_active: true,
            date_joined: "2026-03-04T10:15:00Z",
            last_login: "2026-11-21T09:00:00Z",
          })
        )
      )
    );
  });

  it("shows the profile straight away, with no View Profile button", async () => {
    renderProfile();

    expect(await screen.findByText("fan@example.com")).toBeInTheDocument();
    expect(screen.getByText("film-fan")).toBeInTheDocument();
    expect(screen.getByText("4 March 2026")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /view profile/i })).toBeNull();
    expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  });

  it("never shows an invalid joined date", async () => {
    server.use(
      rest.get(userUrl, (req, res, ctx) =>
        res(ctx.json({ uid: req.params.uid, email: "fan@example.com" }))
      )
    );
    renderProfile();

    expect(await screen.findByText("fan@example.com")).toBeInTheDocument();
    expect(screen.queryByText(/NaN|undefined/)).toBeNull();
  });

  it("shows the error when the profile can't be loaded", async () => {
    server.use(
      rest.get(userUrl, (req, res, ctx) =>
        res(ctx.status(403), ctx.json({ detail: "Not allowed." }))
      )
    );
    renderProfile();

    expect(await screen.findByText(/not allowed/i)).toBeInTheDocument();
  });
});
