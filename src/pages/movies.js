import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { CardContainer } from "../containers/card";
import { Headline, Loading, Card } from "../components";
import { fetchMovies, addMovies } from "../store/movies-slice";

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

  // useEffect(() => {
  //   console.log("MOVIES >>>", movies);
  //   if (movieQuery && moviesStatus === "idle" && movies === []) {
  //     dispatch(fetchMovies(movieQuery));
  //   }
  // }, [movies, moviesStatus, dispatch, movieQuery]);

  const addMoviesHandler = () => {
    dispatch(addMovies(nextPage));
  };

  return (
    <>
      <Headline data-testid="movies">
        <Headline.Title>Results</Headline.Title>
      </Headline>
      <Card.Group>
        {movies &&
          movies.map((movie, idx) => {
            return <CardContainer key={movie.slug} movie={movie} />;
          })}
      </Card.Group>
      <div>{moviesStatus === "loading" && <Loading />}</div>
      <div>{moviesStatus === "failed" && <p>Error: {moviesError}</p>}</div>
      <Card.MoreBtnWrapper>
        {moreMovies && moviesStatus === "succeeded" && (
          <Card.MoreBtn onClick={addMoviesHandler}>More</Card.MoreBtn>
        )}
        {!moreMovies && moviesStatus === "succeeded" && (
          <p>No more movies to load.</p>
        )}
        {moviesStatus === "updating" && <Loading small />}
      </Card.MoreBtnWrapper>
    </>
  );
}
