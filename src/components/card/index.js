import React from "react";

import {
  Container,
  Content,
  Sidebar,
  AvgRating,
  Image,
  AllRatings,
  StarRating,
  MainContent,
  Header,
  Plot,
  FurtherInfo,
  Genres,
  Footer,
  ActionIcons,
} from "./styles/card";

export default function Card({ children, ...restProps }) {
  return (
    <Container data-testid="card" {...restProps}>
      {children}
    </Container>
  );
}

Card.Content = function CardContent({ children, ...restProps }) {
  return <Content {...restProps}>{children}</Content>;
};

Card.Sidebar = function CardSidebar({ children, ...restProps }) {
  return <Sidebar {...restProps}>{children}</Sidebar>;
};

Card.AvgRating = function CardAvgRating({ children, ...restProps }) {
  return <AvgRating {...restProps}>{children}</AvgRating>;
};

Card.Image = function CardImage({ src, ...restProps }) {
  return <Image src={src} {...restProps} />;
};

Card.AllRatings = function CardAllRatings({ ratingsArray, ...restProps }) {
  return (
    <AllRatings {...restProps}>
      <ul>
        {ratingsArray
          ? ratingsArray.map((rating, idx) => {
              return (
                <li key={idx}>
                  <img src={"/"} alt={rating.name} />
                  <StarRating rating={rating.score} />
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
      <p>
        <b></b>
        {country}
      </p>
    </FurtherInfo>
  );
};

Card.Genres = function CardGenres({ genres, ...restProps }) {
  return (
    <Genres>
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

// Card.Footer = function CardFooter({ })
