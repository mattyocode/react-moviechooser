import React, { useState } from "react";
import { MdShare, MdOndemandVideo, MdLibraryAdd } from "react-icons/md";

import { Card, Modal } from "../components";
import { OndemandContainer } from "./ondemand";
import { ShareContainer } from "./share";

export function CardContainer({ moviesData, expandInitially = false }) {
  const [ondemandOpen, setOndemandOpen] = useState(false);
  const [ondemandData, setOndemandData] = useState({});
  const [shareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState({});

  const closeOndemandHandler = () => {
    setOndemandOpen(false);
    setOndemandData({});
  };
  const openOndemandHandler = (data) => {
    setOndemandData(data);
    setOndemandOpen(true);
  };

  const closeShareHandler = () => {
    setShareOpen(false);
    setShareData({});
  };
  const openShareHandler = (data) => {
    setShareData(data);
    setShareOpen(true);
  };

  return (
    <>
      {ondemandOpen && ondemandData && (
        <Modal closeModal={closeOndemandHandler}>
          <OndemandContainer data={ondemandData} />
        </Modal>
      )}
      {shareOpen && shareData && (
        <Modal closeModal={closeShareHandler}>
          <ShareContainer data={shareData} />
        </Modal>
      )}
      <Card.Group>
        {moviesData && moviesData.length > 0 ? (
          moviesData.map((movie, idx) => {
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
                        data-testid={`${movie.title}-ondemand`}
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
                    <Card.Action
                      data-testid={`${movie.title}-share`}
                      label="Share"
                      onClick={() =>
                        openShareHandler({
                          title: movie.title,
                          posterUrl: movie.posterUrl,
                          shareUrl: `www.moviechooser.co.uk/movie/${movie.imdbid}`,
                        })
                      }
                    >
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
        ) : (
          <p>Error: no movies recieved!</p>
        )}
      </Card.Group>
    </>
  );
}
