import React, { useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { motion, AnimateSharedLayout, useReducedMotion } from "framer-motion";

import { CardContainer } from "../containers/card";
import {
  Headline,
  Loading,
  Card,
  FilterSummary,
  PosterCard,
} from "../components";
import { addMovies } from "../store/movies-slice";
import { describeQuery } from "../utils/filters";
import homepageData from "../fixtures/homepage.json";

const PAGE_SIZE = 30;

// Where the user was in the results, so Back from a movie returns them there.
let savedScrollY = 0;

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
  const genres = useSelector((state) => state.options.options);

  const dispatch = useDispatch();
  const history = useHistory();
  const reduceMotion = useReducedMotion();

  const moreMovies = movies.length < moviesCount;
  const nextBatch = Math.min(PAGE_SIZE, moviesCount - movies.length);
  const summary = describeQuery(
    movieQuery,
    Array.isArray(genres) ? genres : [],
    homepageData
  );

  useEffect(() => {
    if (!movieQuery) {
      history.push("/");
    }
  }, [movieQuery, movies, history]);

  const addMoviesHandler = () => {
    dispatch(addMovies(nextPage));
  };

  // Layout effect so the listener is removed before the grid leaves the DOM;
  // otherwise the page collapsing on exit would overwrite the saved position.
  useLayoutEffect(() => {
    const target = history && history.action === "POP" ? savedScrollY : 0;
    let frame;
    let tries = 0;
    const trackScroll = () => {
      savedScrollY = window.scrollY;
    };
    // The grid may not be tall enough on the first frame, so retry briefly;
    // only start recording once restored, so clamped positions aren't saved.
    const restore = () => {
      window.scrollTo({ top: target, left: 0 });
      if (Math.abs(window.scrollY - target) > 2 && tries++ < 30) {
        frame = requestAnimationFrame(restore);
      } else {
        window.addEventListener("scroll", trackScroll, { passive: true });
      }
    };
    restore();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", trackScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {moviesStatus === "succeeded" && moviesCount > 0 && (
          <Headline.Subhead data-testid="results-count">
            {moviesCount} {moviesCount === 1 ? "movie" : "movies"}
          </Headline.Subhead>
        )}
      </Headline>
      {summary && (
        <FilterSummary>
          <FilterSummary.Chips
            labels={[summary.genre, summary.decade, summary.runtime]}
          />
          <FilterSummary.Edit
            data-testid="edit-filters-btn"
            onClick={() => history.push("/#filters")}
          >
            Edit filters
          </FilterSummary.Edit>
        </FilterSummary>
      )}
      <AnimateSharedLayout>
        <PosterCard.Grid>
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
                >
                  <CardContainer movie={movie} variant="poster" />
                </motion.div>
              );
            })}
        </PosterCard.Grid>
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
          <Card.MoreBtn onClick={() => history.push("/#filters")}>
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
          <Card.MoreBtn onClick={addMoviesHandler}>
            Show {nextBatch} more
          </Card.MoreBtn>
        )}
        {!moreMovies && moviesStatus === "succeeded" && movies.length > 0 && (
          <p>That's all {movies.length} matches.</p>
        )}
        {moviesStatus === "updating" && <Loading small />}
      </Card.MoreBtnWrapper>
    </motion.div>
  );
}
