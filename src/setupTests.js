import "@testing-library/jest-dom/vitest";
import { server } from "./mocks/server";
import { colorTokens } from "./mocks/color-tokens";

for (const [name, value] of Object.entries(colorTokens)) {
  document.documentElement.style.setProperty(name, value);
}

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
