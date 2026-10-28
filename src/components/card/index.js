import React from "react";

import {
  Action,
  Actions,
  AllRatings,
  AvgRating,
  Container,
  Content,
  Detail,
  FixedAction,
  Footer,
  Genres,
  Header,
  Icon,
  Image,
  MainContent,
  MoreBtn,
  MoreBtnWrapper,
  Empty,
  Note,
  Plot,
  RatingLogo,
  Sidebar,
  StarRating,
} from "./styles/card";

import * as IconAssets from "../../assets";

export default function Card({ children, ...restProps }) {
  return (
    <Container data-testid="card" {...restProps}>
      {children}
    </Container>
  );
}

Card.Detail = function CardDetail({ children, ...restProps }) {
  return <Detail {...restProps}>{children}</Detail>;
};

Card.Content = function CardContent({ children, ...restProps }) {
  return (
    <Content data-testid="card-content" {...restProps}>
      {children}
    </Content>
  );
};

Card.Sidebar = function CardSidebar({ children, ...restProps }) {
  return <Sidebar {...restProps}>{children}</Sidebar>;
};

Card.AvgRating = function CardAvgRating({ children, ...restProps }) {
  return (
    <AvgRating {...restProps}>
      <p>{children}</p>
    </AvgRating>
  );
};

Card.Image = function CardImage({ src, ...restProps }) {
  return <Image src={src} {...restProps} />;
};

Card.AllRatings = function CardAllRatings({ ratings, ...restProps }) {
  const getIcon = (name) => {
    let Icon = IconAssets[name];
    if (Icon) {
      return <RatingLogo src={Icon} />;
    } else {
      return <p>{name}</p>;
    }
  };

  return (
    <AllRatings {...restProps}>
      <ul>
        {ratings
          ? ratings.map((rating) => {
              return (
                <li key={rating.id}>
                  {getIcon(rating.source)}
                  <StarRating rating={`${rating.score}%`}></StarRating>
                </li>
              );
            })
          : null}
      </ul>
    </AllRatings>
  );
};

Card.Main = function CardMain({ children, ...restProps }) {
  return (
    <MainContent data-testid="card-main" {...restProps}>
      {children}
    </MainContent>
  );
};

Card.Header = function CardHeader({
  title,
  released,
  runtime,
  plot,
  ...restProps
}) {
  const year = released ? released.slice(0, 4) : "";
  return (
    <>
      <Header {...restProps}>
        <h2>{title}</h2>
        <p>
          {year} | {runtime} mins
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
    <div {...restProps}>
      <p>
        <b>Starring: </b>
        {starring}
      </p>
      <p>
        <b>Directed by: </b>
        {director}
      </p>
      <p>{country}</p>
    </div>
  );
};

Card.Genres = function CardGenres({ genres, ...restProps }) {
  return (
    <Genres {...restProps}>
      <ul>
        {genres
          ? genres.map((genre) => {
              return <li key={genre.id}>{genre.name}</li>;
            })
          : null}
      </ul>
    </Genres>
  );
};

Card.Footer = function CardFooter({ children, ...restProps }) {
  return (
    <Footer {...restProps}>
      <Actions>{children}</Actions>
    </Footer>
  );
};

Card.Action = function CardAction({ children, ...restProps }) {
  return (
    <Action whileHover={{ scale: 1.1 }} {...restProps}>
      <Icon>{children}</Icon>
    </Action>
  );
};

Card.FixedAction = function CardFixedAction({ children, ...restProps }) {
  return (
    <FixedAction whileHover={{ scale: 1.1 }} {...restProps}>
      <Icon>{children}</Icon>
    </FixedAction>
  );
};

Card.Note = function CardNote({ children, ...restProps }) {
  return <Note {...restProps}>{children}</Note>;
};

Card.Empty = function CardEmpty({ children, ...restProps }) {
  return <Empty {...restProps}>{children}</Empty>;
};

Card.MoreBtnWrapper = function CardMoreBtnWrapper({ children, ...restProps }) {
  return <MoreBtnWrapper {...restProps}>{children}</MoreBtnWrapper>;
};

Card.MoreBtn = function CardMoreButton({ children, ...restProps }) {
  return (
    <MoreBtn whileHover={{ scale: 1.1 }} {...restProps}>
      {children}
    </MoreBtn>
  );
};
