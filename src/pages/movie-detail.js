import React, { useEffect } from "react";
import { Route, useParams } from "react-router";

import { Headline, Loading } from "../components";
import { CardContainer } from "../containers/card";
import { client } from "../utils/api-client";
import { useHttp } from "../hooks";

export default function MovieDetail() {
  const { sendRequest, status, error, data: movieData } = useHttp(client.get);

  const params = useParams();

  console.log(params);
  useEffect(() => {
    if (params.movieId === "surprise") {
      sendRequest("random");
    } else {
      const params = "";
      sendRequest(`movie/${params}`);
    }
  }, [params, sendRequest]);

  let movie;
  if (status === "pending") {
    movie = <Loading />;
  }

  if (status === "succeeded" && movieData.length === 1) {
    movie = <CardContainer moviesData={movieData} expandInitially={true} />;
  }

  if (status === "rejected") {
    movie = <p>Error: {error} </p>;
  }

  return (
    <>
      {`${params.movieId}` === "surprise" ? (
        <Headline data-testid="surprise">
          <Headline.Title>Surprise</Headline.Title>
          {/* <Headline.Subhead>
            Choose from 1000s of acclaimed movies.
            <br />
            Filter by genre, decade, and runtime.
          </Headline.Subhead> */}
        </Headline>
      ) : (
        <Headline data-testid={`movie-detail-${params.movieId}`}>
          <Headline.Title>Movie Detail</Headline.Title>
          {/* <Headline.Subhead>
            Choose from 1000s of acclaimed movies.
            <br />
            Filter by genre, decade, and runtime.
        </Headline.Subhead> */}
        </Headline>
      )}

      {movie}
    </>
  );

  // sendRequest("surprise")
}
