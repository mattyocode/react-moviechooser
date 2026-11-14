import React, { useEffect, useRef } from "react";
import { useParams, useLocation, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import {
  Backdrop,
  Card,
  FilterSummary,
  Headline,
  Loading,
  PosterCard,
  SimilarMovies,
} from "../components";
import { CardContainer } from "../containers/card";
import { fetchSimilarMovies, fetchSingleMovie } from "../store/movies-slice";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.25, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export default function MovieDetail() {
  const movie = useSelector((state) => state.movies.current);
  const moviesStatus = useSelector((state) => state.movies.currentStatus);
  const moviesError = useSelector((state) => state.movies.currentError);
  const hasResults = useSelector((state) => state.movies.movies.length > 0);
  const similar = useSelector((state) => state.movies.similar);
  const similarStatus = useSelector((state) => state.movies.similarStatus);
  const similarFor = useSelector((state) => state.movies.similarFor);

  const location = useLocation();
  const history = useHistory();
  const locationRef = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();

  const isSurprise = params.movieId === "surprise";

  let route = "";
  if (isSurprise) {
    route = "random";
  } else {
    route = `${params.movieId}`;
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [params.movieId]);

  useEffect(() => {
    if (locationRef !== location.key) {
      dispatch(fetchSingleMovie(route));
    }
  }, [dispatch, route, location, locationRef]);

  // Keyed on the loaded movie's slug, so the random page and "Spin again"
  // get their own row too.
  const loadedSlug = moviesStatus === "succeeded" && movie ? movie.slug : null;
  useEffect(() => {
    if (loadedSlug) {
      dispatch(fetchSimilarMovies(loadedSlug));
    }
  }, [dispatch, loadedSlug]);
  // Only this movie's row: never one left over from the previous movie.
  const similarForThis = loadedSlug !== null && similarFor === loadedSlug;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {isSurprise ? (
        <Headline data-testid="surprise">
          <Headline.Title>Random has chosen</Headline.Title>
        </Headline>
      ) : (
        <Headline data-testid={`movie-detail-${params.movieId}`}>
          <Headline.Title>Check this out!</Headline.Title>
        </Headline>
      )}
      {!isSurprise && hasResults && (
        <FilterSummary>
          <FilterSummary.Edit
            data-testid="back-to-results-btn"
            onClick={() => history.goBack()}
          >
            ← Back to results
          </FilterSummary.Edit>
        </FilterSummary>
      )}
      {moviesStatus === "updating" && <Loading />}
      {moviesStatus === "succeeded" && movie && (
        <>
          <Backdrop src={movie.poster_url} />
          <Card.Detail>
            <CardContainer movie={movie} showWatchCta />
          </Card.Detail>
        </>
      )}
      {isSurprise && moviesStatus === "succeeded" && (
        <Card.MoreBtnWrapper>
          <Card.MoreBtn
            data-testid="spin-again-btn"
            onClick={() => dispatch(fetchSingleMovie("random"))}
          >
            Spin again
          </Card.MoreBtn>
        </Card.MoreBtnWrapper>
      )}
      {similarForThis && similarStatus === "loading" && (
        <Loading small data-testid="similar-loading" />
      )}
      {similarForThis && similarStatus === "succeeded" && similar.length > 0 && (
        <SimilarMovies>
          <SimilarMovies.Title>More like this</SimilarMovies.Title>
          <PosterCard.Grid>
            {similar.map((similarMovie) => (
              <CardContainer
                key={similarMovie.slug}
                movie={similarMovie}
                variant="poster"
              />
            ))}
          </PosterCard.Grid>
        </SimilarMovies>
      )}
      {moviesStatus === "failed" && <p>Error: {moviesError} </p>}
    </motion.div>
  );
}
