import React, { useEffect } from "react";

import { Headline, Loading } from "../components";
import { CardContainer } from "../containers/card";
import { client } from "../utils/api-client";
import { useHttp } from "../hooks";

export default function Surprise() {
  const { sendRequest, status, error, data: movieData } = useHttp(client.get);

  useEffect(() => {
    sendRequest("random");
  }, [sendRequest]);

  let movie;
  if (status === "pending") {
    movie = <Loading />;
  }

  if (status === "succeeded" && movieData.length === 1) {
    movie = <CardContainer moviesData={movieData} />;
  }

  if (status === "rejected") {
    movie = <p>Error: {error} </p>;
  }

  return (
    <>
      <Headline data-testid="surprise">
        <Headline.Title>Surprise</Headline.Title>
        {/* <Headline.Subhead>
        Choose from 1000s of acclaimed movies.
        <br />
        Filter by genre, decade, and runtime.
      </Headline.Subhead> */}
      </Headline>
      {movie}
    </>
  );

  // sendRequest("surprise")
}
