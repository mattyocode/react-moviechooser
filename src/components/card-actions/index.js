import React, { useContext, createContext, useState } from "react";

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

import * as IconAssets from "../../assets";

const ImgOrientationContext = createContext();

export default function CardActions({
  imgLandscape = true,
  children,
  ...restProps
}) {
  const [imgIsLandscape, setImgIsLandscape] = useState(imgLandscape);

  return (
    <ImgOrientationContext.Provider value={{ imgIsLandscape }}>
      <Wrapper {...restProps}>{children}</Wrapper>;
    </ImgOrientationContext.Provider>
  );
}

CardActions.Header = function CardActionsHeader({
  src,
  keyword,
  children,
  ...restProps
}) {
  return (
    <Header {...restProps}>
      <HeaderIcon src={src}></HeaderIcon>
      <Title>
        <span>{keyword}</span>
        {children}
      </Title>
    </Header>
  );
};

CardActions.Body = function CardActionsBody({ children, ...restProps }) {
  const isLandscape = useContext(ImgOrientationContext);
  return (
    <BodyWrapper className={!isLandscape && "portrait"} {...restProps}>
      {children}
    </BodyWrapper>
  );
};

CardActions.Image = function CardActionsImage({ src, ...restProps }) {
  const isLandscape = useContext(ImgOrientationContext);
  return (
    <Image src={src} className={!isLandscape && "portrait"} {...restProps} />
  );
};

CardActions.Links = function CardActionsLinks({ children, ...restProps }) {
  const isLandscape = useContext(ImgOrientationContext);
  return (
    <Links className={!isLandscape && "portrait"} {...restProps}>
      {children}
    </Links>
  );
};

CardActions.Link = function CardActionLink({
  iconName,
  children,
  ...restProps
}) {
  let icon;
  const iconAsset = IconAssets[iconName];
  if (iconAsset) {
    icon = <LinkIcon src={iconName}></LinkIcon>;
  } else {
    // use placeholder?
    icon = null;
  }

  return (
    <Link {...restProps}>
      <LinkIconContainer>{icon}</LinkIconContainer>
      <LinkText>{children}</LinkText>
    </Link>
  );
};
