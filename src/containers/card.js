import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  MdBookmark,
  MdBookmarkBorder,
  MdOndemandVideo,
  MdRemoveRedEye,
  MdShare,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Card, Modal, PosterCard } from "../components";
import {
  addNewListItem,
  deleteListItem,
  updateListItem,
} from "../store/list-slice";
import { setMovieOnList } from "../store/movies-slice";
import { AuthForm } from "./auth-form";
import { OndemandContainer } from "./ondemand";
import { ShareContainer } from "./share";

export function CardContainer({
  movie,
  listData = null,
  variant = "full",
  showWatchCta = false,
}) {
  const [ondemandOpen, setOndemandOpen] = useState(false);
  const [ondemandData, setOndemandData] = useState({});
  const [shareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState({});
  const [authOpen, setAuthOpen] = useState(false);
  const user = useSelector((state) => state.auth.auth);

  const dispatch = useDispatch();

  const is_auth = user && user.account;
  const on_list = movie.on_list || listData;

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

  const closeAuthHandler = () => {
    setAuthOpen(false);
  };
  const openAuthHandler = (data) => {
    setAuthOpen(true);
  };

  const addToListHandler = () => {
    if (user.account) {
      dispatch(addNewListItem(movie.slug));
      dispatch(
        setMovieOnList({
          movieSlug: movie.slug,
          onList: true,
        })
      );
    }
  };

  const removeFromListHandler = () => {
    if (user.account) {
      dispatch(deleteListItem(movie.slug));
      dispatch(
        setMovieOnList({
          movieSlug: movie.slug,
          onList: false,
        })
      );
    }
  };

  const toggleMovieWatchedHandler = () => {
    const watchedState = !listData.watched;
    dispatch(
      updateListItem({
        movieSlug: movie.slug,
        updatedFieldData: { watched: watchedState },
      })
    );
  };

  const hasOndemand = movie && movie.ondemand && movie.ondemand.length > 0;
  const openOndemand = () =>
    openOndemandHandler({
      title: movie.title,
      imgUrl: movie.ondemandImg,
      linksData: movie.ondemand,
    });
  const openShare = () =>
    openShareHandler({
      title: movie.title,
      posterUrl: movie.poster_url,
      shareUrl: `www.moviechooser.co.uk/movies/${movie.slug}`,
    });

  // Handlers live on the buttons (not the icons) so they work from the keyboard.
  let bookmark;
  if (is_auth && on_list) {
    bookmark = {
      label: "Remove from list",
      onClick: removeFromListHandler,
      icon: <MdBookmark data-testid={`${movie.title}-remove`} />,
    };
  } else if (is_auth) {
    bookmark = {
      label: "Add to list",
      onClick: addToListHandler,
      icon: <MdBookmarkBorder data-testid={`${movie.title}-add`} />,
    };
  } else {
    bookmark = {
      label: "Sign in to add to list",
      onClick: openAuthHandler,
      icon: <MdBookmarkBorder data-testid={`${movie.title}-unauthed`} />,
    };
  }
  const watchedLabel =
    listData && listData.watched ? "Mark as unwatched" : "Mark as watched";

  const modals = (
    <>
      {ondemandOpen && ondemandData && (
        <Modal openState={ondemandOpen} closeModal={closeOndemandHandler}>
          <OndemandContainer data={ondemandData} />
        </Modal>
      )}
      {shareOpen && shareData && (
        <Modal openState={shareOpen} closeModal={closeShareHandler}>
          <ShareContainer data={shareData} />
        </Modal>
      )}
      {authOpen && (
        <Modal openState={authOpen} closeModal={closeAuthHandler}>
          <AuthForm
            formTypeInitial={"login"}
            subhead={"Login to add movies to list."}
            closeSelf={setAuthOpen}
          />
        </Modal>
      )}
    </>
  );

  if (movie && variant === "poster") {
    return (
      <>
        {modals}
        <PosterCard data-testid={`${movie.title}-card`}>
          <PosterCard.Poster
            to={`/movies/${movie.slug}`}
            src={movie.poster_url}
            title={movie.title}
            rating={movie.avg_rating ? movie.avg_rating.toFixed(1) : null}
            plot={movie.plot}
          />
          <PosterCard.Body>
            <PosterCard.Title>{movie.title}</PosterCard.Title>
            <PosterCard.Meta
              released={movie.released}
              runtime={movie.runtime}
            />
            <PosterCard.Actions>
              {hasOndemand && (
                <PosterCard.Action
                  data-testid={`${movie.title}-ondemand`}
                  label="Where to watch"
                  onClick={openOndemand}
                >
                  <MdOndemandVideo />
                </PosterCard.Action>
              )}
              <PosterCard.Action
                data-testid={`${movie.title}-share`}
                label="Share"
                onClick={openShare}
              >
                <MdShare />
              </PosterCard.Action>
              <PosterCard.Action
                label={bookmark.label}
                onClick={bookmark.onClick}
              >
                {bookmark.icon}
              </PosterCard.Action>
              {listData && (
                <PosterCard.Action
                  label={watchedLabel}
                  aria-pressed={listData.watched}
                  onClick={toggleMovieWatchedHandler}
                >
                  <MdRemoveRedEye
                    data-testid={`${movie.title}-watchedBtn`}
                    style={{
                      color: listData.watched ? "var(--clr-neon)" : undefined,
                    }}
                  />
                </PosterCard.Action>
              )}
            </PosterCard.Actions>
          </PosterCard.Body>
        </PosterCard>
      </>
    );
  }

  return (
    <>
      {modals}
      {movie && (
        <Card
          data-testid={`${movie.title}-card`}
          as={motion.div}
          layout="position"
        >
          <Card.Content>
            {listData && (
              <Card.FixedAction
                aria-label={watchedLabel}
                aria-pressed={listData.watched}
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                onClick={toggleMovieWatchedHandler}
              >
                <MdRemoveRedEye
                  data-testid={`${movie.title}-watchedBtn`}
                  fill={listData.watched ? "#fff" : "#666"}
                  title="Watched?"
                />
              </Card.FixedAction>
            )}
            <Card.Sidebar>
              <Card.AvgRating>
                {movie.avg_rating ? movie.avg_rating.toFixed(1) : null}
              </Card.AvgRating>
              <Card.Image src={movie.poster_url} />
              <Card.AllRatings ratings={movie.reviews} />
            </Card.Sidebar>
            <Card.Main>
              <Card.Header
                title={movie.title}
                released={movie.released}
                runtime={movie.runtime}
                plot={movie.plot}
              />
              <Card.FurtherInfo
                starring={movie.actors.map((actor) => actor.name).join(", ")}
                director={movie.director
                  .map((director) => director.name)
                  .join(", ")}
                country={movie.country}
              />
              <Card.Genres genres={movie.genre} />
            </Card.Main>
            <Card.Footer>
              {hasOndemand && (
                <Card.Action
                  data-testid={`${movie.title}-ondemand`}
                  aria-label="Where to watch"
                  onClick={openOndemand}
                >
                  <MdOndemandVideo title="Stream movie" />
                </Card.Action>
              )}
              <Card.Action
                data-testid={`${movie.title}-share`}
                aria-label="Share"
                onClick={openShare}
              >
                <MdShare title="Share movie page" />
              </Card.Action>
              <Card.Action
                aria-label={bookmark.label}
                title={bookmark.label}
                onClick={bookmark.onClick}
              >
                {bookmark.icon}
              </Card.Action>
            </Card.Footer>
          </Card.Content>
        </Card>
      )}
      {movie && showWatchCta && (
        <Card.MoreBtnWrapper>
          {hasOndemand ? (
            <Card.MoreBtn data-testid="watch-cta" onClick={openOndemand}>
              Where to watch
            </Card.MoreBtn>
          ) : (
            <Card.Note>Not streaming in the UK right now</Card.Note>
          )}
        </Card.MoreBtnWrapper>
      )}
    </>
  );
}
