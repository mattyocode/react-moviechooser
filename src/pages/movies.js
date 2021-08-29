import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { CardContainer } from "../containers/card";
import { Headline, Loading } from "../components";
// import { fetchMovies } from "../store/movies-slice";

// import moviesData from "../fixtures/moviesDataFromStore.json";

export default function Movies() {
  const movies = useSelector((state) => state.movies.movies);
  const movieQuery = useSelector((state) => state.movies.queryParams);
  const moviesStatus = useSelector((state) => state.movies.status);
  const moviesError = useSelector((state) => state.movies.error);

  // const dispatch = useDispatch();
  const history = useHistory();
  console.log(movies);

  let movieSelection;
  if (moviesStatus === "succeeded") {
    movieSelection = <CardContainer moviesData={movies} />;
  }
  if (moviesStatus === "loading") {
    movieSelection = <Loading />;
  }
  if (moviesStatus === "failed") {
    movieSelection = <p>{moviesError}</p>;
  }

  console.log("moviesStatus", moviesStatus);
  console.log("movieQuery", movieQuery);

  useEffect(() => {
    if (!movieQuery) {
      history.push("/");
    }
  }, [movieQuery, history]);

  return (
    <>
      <Headline>
        <Headline.Title>Results</Headline.Title>
        {/* <Headline.Subhead>
          Choose from 1000s of acclaimed movies.
          <br />
          Filter by genre, decade, and runtime.
        </Headline.Subhead> */}
      </Headline>
      {movieSelection}
    </>
  );
}
