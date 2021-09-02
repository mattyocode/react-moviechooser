import React from "react";

import {
  Wrapper,
  Header,
  HeaderIcon,
  Title,
  BodyWrapper,
  Image,
  Links,
  Link,
  LinkIconContainer,
  LinkIcon,
  LinkText,
} from "./styles/card-actions";

export default function CardActions({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
}

CardActions.Header = function CardActionsHeader({
  src,
  children,
  ...restProps
}) {
  return (
    <Header {...restProps}>
      <HeaderIcon src={src}></HeaderIcon>
      <Title>{children}</Title>
    </Header>
  );
};

CardActions.Body = function CardActionsBody({ children, ...restProps }) {
  return <BodyWrapper {...restProps}>{children}</BodyWrapper>;
};

CardActions.Image = function CardActionsImage({ src, ...restProps }) {
  return <Image src={src} {...restProps} />;
};

CardActions.Links = function CardActionsLinks({ children, ...restProps }) {
  return <Links {...restProps}>{children}</Links>;
};

CardActions.Link = function CardActionLink({ name, children, ...restProps }) {
  return (
    <Link {...restProps}>
      <LinkIconContainer>
        <LinkIcon src={name}></LinkIcon>
      </LinkIconContainer>
      <LinkText>{children}</LinkText>
    </Link>
  );
};
