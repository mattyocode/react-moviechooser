import React, { useEffect } from "react";
import { useParams } from "react-router";

import { Headline, Loading } from "../components";
import { CardContainer } from "../containers/card";
import { client } from "../utils/api-client";
import { useHttp } from "../hooks";

export default function MovieDetail() {
  const { sendRequest, status, error, data: movieData } = useHttp(client);

  const params = useParams();
  let route = "";
  if (params.movieId === "surprise") {
    route = "movies/random/";
  } else {
    route = `movies/${params.movieId}`;
    // route = `movie/`;
  }

  let movie;
  if (status === "pending") {
    console.log("loading block");
    movie = <Loading />;
  }

  if (status === "succeeded") {
    movie = <CardContainer moviesData={[movieData]} expandInitially={true} />;
  }

  if (status === "rejected") {
    console.log("error block");
    movie = <p>Error: {error} </p>;
  }

  useEffect(() => {
    const abortController = new AbortController();

    sendRequest(route, { signal: abortController.signal });

    return () => {
      abortController.abort();
    };
  }, [route, sendRequest]);

  return (
    <>
      {`${params.movieId}` === "surprise" ? (
        <Headline data-testid="surprise">
          <Headline.Title>Surprise</Headline.Title>
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
