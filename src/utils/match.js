// Match label for text search results. It marks rank only: similarity scores
// can't tell a good match from a bad one (on dev, "I'm hungry" tops out at 0.58
// with excellent results while "asdf qwerty zxcv" tops out at 0.62), so score
// tiers would mislead. See design D7 of the add-free-text-search change.
export const TOP_MATCH_COUNT = 3;

// index is the result's position; similarity is only present on text results.
export function matchLabel(index, similarity) {
  if (typeof similarity !== "number") return null;
  return index < TOP_MATCH_COUNT ? "Top match" : null;
}
