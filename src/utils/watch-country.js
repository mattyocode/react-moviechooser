// Which country the "Where to watch" panel shows, and its display name.

export const DEFAULT_COUNTRY = "GB";
export const COUNTRY_STORAGE_KEY = "moviechooser.watchCountry";

const CODE_RE = /^[A-Za-z]{2}$/;

// "en-GB" -> "GB". Only a two-letter second subtag is a region, so "en" and
// "zh-Hant-TW" (script subtag second) fall back to GB.
export function detectCountry(lang) {
  const parts = typeof lang === "string" ? lang.split(/[-_]/) : [];
  const region = parts[1];
  return region && CODE_RE.test(region) ? region.toUpperCase() : DEFAULT_COUNTRY;
}

// Storage can throw (private mode, blocked site data), so every access is guarded.
export function getStoredCountry() {
  try {
    const value = window.localStorage.getItem(COUNTRY_STORAGE_KEY);
    return value && CODE_RE.test(value) ? value.toUpperCase() : null;
  } catch {
    return null;
  }
}

export function storeCountry(code) {
  try {
    window.localStorage.setItem(COUNTRY_STORAGE_KEY, code);
  } catch {
    // Not remembered this time; the panel still works.
  }
}

function browserLanguage() {
  return typeof navigator !== "undefined" ? navigator.language : undefined;
}

export function initialCountry() {
  return getStoredCountry() || detectCountry(browserLanguage());
}

// "JP" -> "Japan" in the browser's language; the code itself if Intl can't say.
export function countryName(code) {
  try {
    const names = new Intl.DisplayNames([browserLanguage() || "en"], {
      type: "region",
    });
    return names.of(code) || code;
  } catch {
    return code;
  }
}
