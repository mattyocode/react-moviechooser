import React from "react";
// import { useSelector } from "react-redux";

import { Card } from "../components/";
import moviesData from "../fixtures/moviesDataFromStore.json";

export default function Movies() {
  // const movies = useSelector((state) => state.movies.movies);

  return (
    <>
      {/* <h1>This is the movies results page.</h1> */}
      <Card.Group>
        {moviesData
          ? moviesData.map((movie, idx) => {
              return (
                <Card key={idx}>
                  <Card.Content>
                    <Card.Sidebar>
                      <Card.AvgRating>{movie.avgRating}</Card.AvgRating>
                      <Card.Image src={movie.posterUrl} />
                      <Card.AllRatings
                        ratings={[
                          { imdbRating: movie.imdbRating },
                          { metacritic: movie.metacritic },
                          { rottenTomatoes: movie.rottenTomatoes },
                        ]}
                      />
                    </Card.Sidebar>
                    <Card.Main>
                      <Card.Header
                        title={movie.title}
                        released={movie.released}
                        runtime={movie.runtime}
                        plot={movie.plot}
                      />
                      <Card.FurtherInfo
                        starring={movie.actors}
                        director={movie.director}
                        country={movie.country}
                      />
                      <Card.Genres genres={movie.genre} />
                    </Card.Main>
                    <Card.Footer />
                  </Card.Content>
                </Card>
              );
            })
          : null}
      </Card.Group>
    </>
  );
}
