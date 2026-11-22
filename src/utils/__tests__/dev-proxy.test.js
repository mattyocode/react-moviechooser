import viteConfig from "../../../vite.config.mjs";

describe("dev proxy", () => {
  it("forwards every path prefix the app calls on the API", () => {
    const { proxy } = viteConfig({ mode: "development" }).server;
    // /accounts serves the signed-in profile; without it Vite answers with
    // its own index.html and the profile shows no email and a NaN date.
    expect(Object.keys(proxy).sort()).toEqual(
      ["/accounts", "/api", "/auth", "/list"].sort()
    );
  });
});
