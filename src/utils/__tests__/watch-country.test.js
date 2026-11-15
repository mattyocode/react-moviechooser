import {
  COUNTRY_STORAGE_KEY,
  countryName,
  detectCountry,
  getStoredCountry,
  initialCountry,
  storeCountry,
} from "../watch-country";

function setLanguage(lang) {
  vi.spyOn(window.navigator, "language", "get").mockReturnValue(lang);
}

describe("watch country", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    ["en-GB", "GB"],
    ["en-US", "US"],
    ["fr-ca", "CA"],
    ["en", "GB"],
    ["zh-Hant-TW", "GB"],
    ["es-419", "GB"],
    ["", "GB"],
    [undefined, "GB"],
  ])("detectCountry(%s) is %s", (lang, expected) => {
    expect(detectCountry(lang)).toBe(expected);
  });

  it("starts from the browser language when nothing is stored", () => {
    setLanguage("en-US");
    expect(initialCountry()).toBe("US");
  });

  it("prefers the stored choice over the browser language", () => {
    setLanguage("en-GB");
    storeCountry("DE");
    expect(window.localStorage.getItem(COUNTRY_STORAGE_KEY)).toBe("DE");
    expect(initialCountry()).toBe("DE");
  });

  it("ignores a stored value that isn't a country code", () => {
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, "nonsense");
    setLanguage("en-US");
    expect(getStoredCountry()).toBeNull();
    expect(initialCountry()).toBe("US");
  });

  it("works when reading storage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    setLanguage("en-US");
    expect(getStoredCountry()).toBeNull();
    expect(initialCountry()).toBe("US");
  });

  it("works when writing storage throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => storeCountry("JP")).not.toThrow();
  });

  it("names countries, falling back to the code", () => {
    setLanguage("en-GB");
    expect(countryName("JP")).toBe("Japan");
    expect(countryName("GB")).toBe("United Kingdom");
    expect(countryName("not a code")).toBe("not a code");
  });
});
