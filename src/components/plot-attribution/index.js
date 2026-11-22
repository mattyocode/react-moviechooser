import React from "react";

import { Details, Sources } from "./styles/plot-attribution";

const LICENCE_URL = "https://creativecommons.org/licenses/by-sa/4.0/";

// CC BY-SA attribution for the Wikipedia plots that text search and "More
// like this" are computed from. Links each movie's stored article revision;
// renders nothing when no movie shown has a Wikipedia plot.
export default function PlotAttribution({ movies, ...restProps }) {
  const seen = new Set();
  const sources = movies.filter((movie) => {
    const url = movie && movie.plot_source_url;
    if (!url || seen.has(url)) return false;
    seen.add(url);
    return true;
  });
  if (sources.length === 0) return null;

  return (
    <Details data-testid="plot-attribution" {...restProps}>
      <summary>About these recommendations</summary>
      <p>
        Matches are based on plot summaries from Wikipedia, used under{" "}
        <a href={LICENCE_URL} target="_blank" rel="noopener noreferrer">
          CC BY-SA 4.0
        </a>
        . Articles used:
      </p>
      <Sources>
        {sources.map((movie) => (
          <li key={movie.plot_source_url}>
            <a
              href={movie.plot_source_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {movie.title}
            </a>
          </li>
        ))}
      </Sources>
    </Details>
  );
}
