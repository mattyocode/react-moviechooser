import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { motion, AnimateSharedLayout, useReducedMotion } from "framer-motion";

import { CardContainer } from "../containers/card";
import { Headline, Loading, Card } from "../components";
import { addMovies } from "../store/movies-slice";

const pageVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { delay: 0.1, duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export default function Movies() {
  const movies = useSelector((state) => state.movies.movies);
  const movieQuery = useSelector((state) => state.movies.queryParams);
  const moviesStatus = useSelector((state) => state.movies.status);
  const moviesError = useSelector((state) => state.movies.error);
  const nextPage = useSelector((state) => state.movies.nextPageUrl);
  const moviesCount = useSelector((state) => state.movies.totalCount);

  const dispatch = useDispatch();
  const history = useHistory();
  const reduceMotion = useReducedMotion();

  const moreMovies = movies.length < moviesCount;

  useEffect(() => {
    if (!movieQuery) {
      history.push("/");
    }
  }, [movieQuery, movies, history]);

  const addMoviesHandler = () => {
    dispatch(addMovies(nextPage));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Headline data-testid="movies">
        <Headline.Title>Results</Headline.Title>
      </Headline>
      <AnimateSharedLayout>
        <Card.Group>
          {movies &&
            movies.map((movie, idx) => {
              return (
                <motion.div
                  key={movie.slug}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  // Short, capped stagger so later cards in a page don't keep the user waiting.
                  transition={{
                    duration: 0.25,
                    delay: Math.min(idx % 30, 10) * 0.03,
                  }}
                  style={{ margin: "0 10px" }}
                >
                  <CardContainer movie={movie} />
                </motion.div>
              );
            })}
        </Card.Group>
      </AnimateSharedLayout>
      {moviesStatus === "loading" && (
        <div>
          <Loading />
        </div>
      )}
      {moviesStatus === "succeeded" && movies.length === 0 && (
        <Card.Empty data-testid="no-results">
          <h2>No movies match those filters</h2>
          <p>Try fewer genres, or widen the decade or runtime range.</p>
          <Card.MoreBtn onClick={() => history.push("/")}>
            Change filters
          </Card.MoreBtn>
        </Card.Empty>
      )}
      {moviesStatus === "failed" && (
        <div>
          <p>Error: {moviesError}</p>
        </div>
      )}
      <Card.MoreBtnWrapper>
        {moreMovies && moviesStatus === "succeeded" && (
          <Card.MoreBtn onClick={addMoviesHandler}>Show more</Card.MoreBtn>
        )}
        {!moreMovies && moviesStatus === "succeeded" && movies.length > 0 && (
          <p>That's all {movies.length} matches.</p>
        )}
        {moviesStatus === "updating" && <Loading small />}
      </Card.MoreBtnWrapper>
    </motion.div>
  );
}
