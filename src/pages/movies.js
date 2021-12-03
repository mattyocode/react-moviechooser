import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { motion, AnimateSharedLayout } from "framer-motion";

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
    x: "-100vw",
    opacity: 0,
    transition: { ease: "easeInOut" },
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
                  initial={{
                    opacity: 0,
                    x: -100,
                    y: -20,
                  }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.1, delay: (idx % 30) * 0.2 }}
                >
                  <CardContainer key={movie.slug} movie={movie} />
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
      {moviesStatus === "failed" && (
        <div>
          <p>Error: {moviesError}</p>
        </div>
      )}
      <Card.MoreBtnWrapper>
        {moreMovies && moviesStatus === "succeeded" && (
          <Card.MoreBtn onClick={addMoviesHandler}>More</Card.MoreBtn>
        )}
        {!moreMovies && moviesStatus === "succeeded" && (
          <p>No more movies to load.</p>
        )}
        {moviesStatus === "updating" && <Loading small />}
      </Card.MoreBtnWrapper>
    </motion.div>
  );
}
