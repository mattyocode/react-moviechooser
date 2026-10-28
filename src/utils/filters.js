// Helpers for turning a saved movie query (as sent to the API) back into
// form defaults and human-readable labels.

const labelFor = (rangeData, queryValue, labels = rangeData.optionsArray) => {
  const idx = rangeData.queryArray.indexOf(queryValue);
  return idx === -1 ? undefined : labels[idx];
};

const isFullRange = (rangeData, range) =>
  range.min === rangeData.queryArray[0] &&
  range.max === rangeData.queryArray[rangeData.queryArray.length - 1];

// Slider defaults (step labels) for a saved query, falling back to the
// standard defaults when there's no query or a value isn't recognised.
export function sliderDefaults(rangeData, range) {
  return {
    min: (range && labelFor(rangeData, range.min)) || rangeData.defaultMin,
    max: (range && labelFor(rangeData, range.max)) || rangeData.defaultMax,
  };
}

export function describeQuery(query, genres, homepageData) {
  if (!query) return null;

  const genreNames = (query.genre || [])
    .map((id) => genres.find((g) => g.id === id))
    .filter(Boolean)
    .map((g) => g.name);

  const describeRange = (rangeData, range, anyLabel) => {
    if (!range || isFullRange(rangeData, range)) return anyLabel;
    const min = labelFor(rangeData, range.min, rangeData.optionsArrayFull);
    const max = labelFor(rangeData, range.max, rangeData.optionsArrayFull);
    return min === max ? min : `${min} – ${max}`;
  };

  return {
    genre: genreNames.length > 0 ? genreNames.join(", ") : "Any genre",
    decade: describeRange(homepageData.decade, query.decade, "Any decade"),
    runtime: describeRange(homepageData.runtime, query.runtime, "Any length"),
  };
}
