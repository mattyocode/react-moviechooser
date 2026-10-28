import React, { useState } from "react";

import {
  Grid,
  Container,
  PosterLink,
  Poster,
  Fallback,
  Rating,
  Overlay,
  Body,
  Title,
  Meta,
  Actions,
  Action,
} from "./styles/poster-card";

// Poster-first card for browsing grids. The poster links to the movie's
// detail page; quick actions sit underneath.
export default function PosterCard({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

PosterCard.Grid = function PosterCardGrid({ children, ...restProps }) {
  return <Grid {...restProps}>{children}</Grid>;
};

PosterCard.Poster = function PosterCardPoster({
  to,
  src,
  title,
  rating,
  plot,
  ...restProps
}) {
  const [failed, setFailed] = useState(!src);
  return (
    <PosterLink to={to} aria-label={`${title} – details`} {...restProps}>
      {failed ? (
        <Fallback aria-hidden="true">{title}</Fallback>
      ) : (
        <Poster
          src={src}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      {rating ? <Rating title="Average critic score">{rating}</Rating> : null}
      {plot ? (
        <Overlay aria-hidden="true">
          <p>{plot}</p>
        </Overlay>
      ) : null}
    </PosterLink>
  );
};

PosterCard.Body = function PosterCardBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>;
};

PosterCard.Title = function PosterCardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

PosterCard.Meta = function PosterCardMeta({ released, runtime, ...restProps }) {
  const year = released ? released.slice(0, 4) : "";
  return (
    <Meta {...restProps}>
      {year}
      {year && runtime ? " · " : ""}
      {runtime ? `${runtime} mins` : ""}
    </Meta>
  );
};

PosterCard.Actions = function PosterCardActions({ children, ...restProps }) {
  return <Actions {...restProps}>{children}</Actions>;
};

PosterCard.Action = function PosterCardAction({
  label,
  children,
  ...restProps
}) {
  return (
    <Action type="button" aria-label={label} title={label} {...restProps}>
      {children}
    </Action>
  );
};
