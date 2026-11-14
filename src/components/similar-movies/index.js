import React from "react";

import { Section, Title } from "./styles/similar-movies";

// "More like this" under a movie: a titled section wrapping a poster grid.
export default function SimilarMovies({ children, ...restProps }) {
  return (
    <Section data-testid="similar-movies" {...restProps}>
      {children}
    </Section>
  );
}

SimilarMovies.Title = function SimilarMoviesTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};
