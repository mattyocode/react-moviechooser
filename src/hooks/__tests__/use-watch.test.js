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
    const { rerender } = renderWithFreshCache(
      <Probe slug="parasite" country="US" />
    );
    expect(await screen.findByText("loaded US")).toBeInTheDocument();
    rerender(
      <SWRConfig value={{ provider: () => new Map(), dedupingInterval: 0 }}>
        <Probe slug="parasite" country="US" />
      </SWRConfig>
    );
    await screen.findByText("loaded US");
    expect(seen).toHaveLength(1);
    expect(seen[0]).toMatch(/\/api\/movies\/parasite\/watch\/\?country=US$/);
  });

  it("requests nothing without a slug", async () => {
    renderWithFreshCache(<Probe slug={null} country="GB" />);
    await waitFor(() => expect(screen.getByText("nothing")).toBeInTheDocument());
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(seen).toHaveLength(0);
  });
});
