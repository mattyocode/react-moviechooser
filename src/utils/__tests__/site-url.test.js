import siteUrl from "../site-url";

describe("siteUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses VITE_DOMAIN_NAME when it is set", () => {
    vi.stubEnv("VITE_DOMAIN_NAME", "https://moviechooser.co.uk");
    expect(siteUrl("/movies/the-godfather")).toBe(
      "https://moviechooser.co.uk/movies/the-godfather",
    );
  });

  it("ignores a trailing slash on VITE_DOMAIN_NAME", () => {
    vi.stubEnv("VITE_DOMAIN_NAME", "https://moviechooser.co.uk/");
    expect(siteUrl("/auth/new-password")).toBe(
      "https://moviechooser.co.uk/auth/new-password",
    );
  });

  it("falls back to the page's origin when VITE_DOMAIN_NAME is empty", () => {
    vi.stubEnv("VITE_DOMAIN_NAME", "");
    expect(siteUrl("/movies/the-godfather")).toBe(
      `${window.location.origin}/movies/the-godfather`,
    );
  });
});
