import React from "react";
import {
  MdExpandMore,
  MdExpandLess,
  MdShare,
  MdOndemandVideo,
  MdLibraryAdd,
} from "react-icons/md";

import {
  Container,
  Group,
  Content,
  Sidebar,
  AvgRating,
  Image,
  AllRatings,
  RatingLogo,
  StarRating,
  MainContent,
  Header,
  Plot,
  FurtherInfo,
  Genres,
  Footer,
  ActionIcons,
} from "./styles/card";

import { ImdbRating, Metacritic, RottenTomatoes, Star } from "../../assets";

export default function Card({ children, ...restProps }) {
  return (
    <Container data-testid="card" {...restProps}>
      {children}
    </Container>
  );
}

Card.Group = function CardGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Card.Content = function CardContent({ children, ...restProps }) {
  return <Content {...restProps}>{children}</Content>;
};

Card.Sidebar = function CardSidebar({ children, ...restProps }) {
  return <Sidebar {...restProps}>{children}</Sidebar>;
};

Card.AvgRating = function CardAvgRating({ children, ...restProps }) {
  return (
    <AvgRating {...restProps}>
      <p>{children}</p>
      <img src={Star} alt="average rating star" />
    </AvgRating>
  );
};

Card.Image = function CardImage({ src, ...restProps }) {
  return <Image src={src} {...restProps} />;
};

Card.AllRatings = function CardAllRatings({ ratings, ...restProps }) {
  const reviewSource = (name) => {
    switch (name) {
      case "imdbRating":
        return ImdbRating;
      case "metacritic":
        return Metacritic;
      case "rottenTomatoes":
        return RottenTomatoes;
      default:
        return name;
    }
  };
  return (
    <AllRatings {...restProps}>
      <ul>
        {ratings
          ? ratings.map((rating, idx) => {
              return (
                <li key={idx}>
                  <RatingLogo src={reviewSource(`${Object.keys(rating)}`)} />
                  <StarRating rating={`${Object.values(rating)}%`}></StarRating>
                </li>
              );
            })
          : null}
      </ul>
    </AllRatings>
  );
};

Card.Main = function CardMain({ children, ...restProps }) {
  return <MainContent {...restProps}>{children}</MainContent>;
};

Card.Header = function CardHeader({
  title,
  year,
  runtime,
  plot,
  ...restProps
}) {
  return (
    <>
      <Header {...restProps}>
        <h2>{title}</h2>
        <p>
          {year} | {runtime}
        </p>
      </Header>
      <Plot>{plot}</Plot>
    </>
  );
};

Card.FurtherInfo = function CardFurtherInfo({
  starring,
  director,
  country,
  ...restProps
}) {
  return (
    <FurtherInfo {...restProps}>
      <p>
        <b>Starring: </b>
        {starring && starring.join(", ")}
      </p>
      <p>
        <b>Directed by: </b>
        {director && director.join(", ")}
      </p>
      <p>{country}</p>
    </FurtherInfo>
  );
};

Card.Genres = function CardGenres({ genres, ...restProps }) {
  return (
    <Genres {...restProps}>
      <ul>
        {genres
          ? genres.map((genre, idx) => {
              return <li key={idx}>{genre}</li>;
            })
          : null}
      </ul>
    </Genres>
  );
};

Card.Footer = function CardFooter({ ...restProps }) {
  return (
    <Footer {...restProps}>
      <MdExpandMore />
      <ActionIcons>
        <MdShare />
        <MdOndemandVideo />
        <MdLibraryAdd />
      </ActionIcons>
    </Footer>
  );
};
