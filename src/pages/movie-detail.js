import React, { useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router";

import { Headline, Loading } from "../components";
import { CardContainer } from "../containers/card";
import { client } from "../utils/api-client";
import { useHttp } from "../hooks";

export default function MovieDetail() {
  const { sendRequest, status, error, data: movieData } = useHttp(client);
  const location = useLocation();
  const locationRef = useRef(null);
  const params = useParams();

  let route = "";
  if (params.movieId === "surprise") {
    route = "api/movies/random/";
  } else {
    route = `api/movies/${params.movieId}`;
  }

  let movie;
  if (status === "pending") {
    movie = <Loading />;
  }

  if (status === "succeeded") {
    movie = <CardContainer movie={movieData} expandInitially={true} />;
  }

  if (status === "rejected") {
    movie = <p>Error: {error} </p>;
  }

  useEffect(() => {
    if (locationRef !== location.key) {
      const abortController = new AbortController();
      locationRef.current = location.key;
      sendRequest(route, { signal: abortController.signal });

      return () => {
        abortController.abort();
      };
    }
  }, [route, sendRequest, locationRef, location]);

  return (
    <>
      {`${params.movieId}` === "surprise" ? (
        <Headline data-testid="surprise">
          <Headline.Title>Random has chosen...</Headline.Title>
        </Headline>
      ) : (
        <Headline data-testid={`movie-detail-${params.movieId}`}>
          <Headline.Title>Check this out!</Headline.Title>
        </Headline>
      )}
      {movie}
    </>
  );
}
