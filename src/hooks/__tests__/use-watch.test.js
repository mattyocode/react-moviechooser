import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";

import { countWatchRequests } from "../../mocks/watch-requests";
import { useWatch } from "../use-watch";

function Probe({ slug, country }) {
  const { data } = useWatch(slug, country);
  return <p>{data ? `loaded ${data.country}` : "nothing"}</p>;
}

function renderWithFreshCache(ui) {
  return render(
    <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
      {ui}
    </SWRConfig>
  );
}

describe("useWatch", () => {
  let seen;
  beforeEach(() => {
    seen = countWatchRequests();
  });

  it("requests one movie and country once", async () => {
    renderWithFreshCache(<Probe slug="parasite" country="US" />);
    expect(await screen.findByText("loaded US")).toBeInTheDocument();
    expect(seen).toHaveLength(1);
    expect(seen[0]).toMatch(/\/api\/movies\/parasite\/watch\/\?country=US$/);
  });

  it("shows stored data straight away when remounted", async () => {
    // One SWRConfig throughout, as the app has, while the Probe comes and goes
    // like the panel does when it's closed and reopened.
    const config = { provider: () => new Map(), dedupingInterval: 0 };
    const ui = (open) => (
      <SWRConfig value={config}>
        {open && <Probe slug="parasite" country="US" />}
      </SWRConfig>
    );
    const { rerender } = render(ui(true));
    await screen.findByText("loaded US");
    rerender(ui(false));
    expect(screen.queryByText("loaded US")).toBeNull();

    rerender(ui(true));
    expect(screen.getByText("loaded US")).toBeInTheDocument();
  });

  it("requests nothing without a slug", async () => {
    renderWithFreshCache(<Probe slug={null} country="GB" />);
    await waitFor(() => expect(screen.getByText("nothing")).toBeInTheDocument());
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(seen).toHaveLength(0);
  });
});
