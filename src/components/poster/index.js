import React, { useState } from "react";

import { Image, Placeholder } from "./styles/poster";

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
const SRCSET_WIDTHS = [185, 342, 500];

// The sources a poster tries, in order: TMDB's image for poster_path, then
// OMDb's poster_url. A missing path, or a url that is empty or "N/A", is
// left out, so it never costs a request.
export function posterSources(path, url) {
  const sources = [];
  if (path) {
    sources.push({
      src: `${TMDB_IMAGE_BASE}/w342${path}`,
      srcSet: SRCSET_WIDTHS.map(
        (w) => `${TMDB_IMAGE_BASE}/w${w}${path} ${w}w`
      ).join(", "),
    });
  }
  if (url && url !== "N/A") {
    sources.push({ src: url });
  }
  return sources;
}

// A movie poster that falls back from TMDB to poster_url to a title
// placeholder. One onError handler moves to the next source, and the
// placeholder is final (it isn't an image, so it can't fail).
export default function Poster({
  path,
  url,
  title,
  showTitle = true,
  sizes = "342px",
  className,
  alt = "",
  ...restProps
}) {
  const key = `${path || ""}|${url || ""}`;
  const [state, setState] = useState({ key, step: 0 });
  // A different movie in the same component starts again from TMDB.
  const step = state.key === key ? state.step : 0;
  if (state.key !== key) {
    setState({ key, step: 0 });
  }

  const sources = posterSources(path, url);
  const source = sources[step];

  if (!source) {
    return (
      <Placeholder
        className={className}
        data-testid="poster-placeholder"
        aria-hidden="true"
      >
        {showTitle ? title : null}
      </Placeholder>
    );
  }

  return (
    <Image
      key={source.src}
      className={className}
      src={source.src}
      srcSet={source.srcSet}
      sizes={source.srcSet ? sizes : undefined}
      alt={alt}
      loading="lazy"
      onError={() => setState({ key, step: step + 1 })}
      {...restProps}
    />
  );
}
