import React from "react";

import Poster from "../poster";

import {
  Grid,
  Container,
  PosterLink,
  Rating,
  Match,
  Overlay,
  Body,
  Title,
  Meta,
  Actions,
  Action,
  SkeletonPoster,
  SkeletonLine,
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
  path,
  url,
  title,
  rating,
  match,
  plot,
  ...restProps
}) {
  return (
    <PosterLink to={to} aria-label={`${title} – details`} {...restProps}>
      <Poster
        path={path}
        url={url}
        title={title}
        sizes="(min-width: 600px) 240px, 45vw"
      />
      {rating ? <Rating title="Average critic score">{rating}</Rating> : null}
      {match ? <Match data-testid="match-label">{match}</Match> : null}
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

// Same shape as a loaded card, hidden from assistive tech: the grid around it
// carries aria-busy instead.
PosterCard.Skeleton = function PosterCardSkeleton(props) {
  return (
    <Container aria-hidden="true" data-testid="poster-skeleton" {...props}>
      <SkeletonPoster />
      <Body>
        <SkeletonLine width="80%" />
        <SkeletonLine width="45%" />
      </Body>
    </Container>
  );
};
