// Colour tokens from global-styles.js that style assertions check. jsdom
// resolves var() in computed styles, so setupTests.js defines them on :root.
export const colorTokens = {
  "--clr-neon": "hsl(187 62% 58%)",
  "--clr-text-muted": "hsl(195 10% 70%)",
};
