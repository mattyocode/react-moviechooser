import React, { useState } from "react";
import { MdShare, MdOndemandVideo, MdLibraryAdd } from "react-icons/md";

import { Card, Modal } from "../components";
import { OndemandContainer } from "./ondemand";

export function CardContainer({ moviesData, expandInitially = false }) {
  const [ondemandOpen, setOndemandOpen] = useState(false);
  const [ondemandData, setOndemandData] = useState({});

  const closeOndemandHandler = () => {
    setOndemandOpen(false);
    setOndemandData({});
  };
  const openOndemandHandler = (data) => {
    setOndemandData(data);
    setOndemandOpen(true);
  };

  return (
    <>
      {ondemandOpen && ondemandData && (
        <Modal closeModal={closeOndemandHandler}>
          <OndemandContainer data={ondemandData} />
        </Modal>
      )}
      <Card.Group>
        {moviesData
          ? moviesData.map((movie, idx) => {
              return (
                <Card key={idx} expandState={expandInitially}>
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
                    <Card.Footer>
                      {movie.ondemand && movie.ondemand.length > 0 && (
                        <Card.Action
                          label="Watch"
                          onClick={() =>
                            openOndemandHandler({
                              title: movie.title,
                              imgUrl: movie.ondemandImg,
                              linksData: movie.ondemand,
                            })
                          }
                        >
                          <MdOndemandVideo />
                        </Card.Action>
                      )}
                      <Card.Action label="Share">
                        <MdShare />
                      </Card.Action>
                      <Card.Action label="Save">
                        <MdLibraryAdd />
                      </Card.Action>
                    </Card.Footer>
                  </Card.Content>
                </Card>
              );
            })
          : null}
      </Card.Group>
    </>
  );
}
