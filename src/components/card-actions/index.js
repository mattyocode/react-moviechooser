import React, { useContext, createContext, useState } from "react";
import { camelCase } from "lodash";

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
  landscape = true,
  children,
  ...restProps
}) {
  const [imgIsLandscape, setImgIsLandscape] = useState(landscape);

  return (
    <ImgOrientationContext.Provider value={{ imgIsLandscape }}>
      <Wrapper {...restProps}>{children}</Wrapper>
    </ImgOrientationContext.Provider>
  );
}

CardActions.Header = function CardActionsHeader({
  keyword,
  title,
  children,
  ...restProps
}) {
  return (
    <Header {...restProps}>
      <HeaderIcon>{children}</HeaderIcon>
      <Title>
        <span>{keyword} </span>
        {title}
      </Title>
    </Header>
  );
};

CardActions.Body = function CardActionsBody({ children, ...restProps }) {
  const { imgIsLandscape } = useContext(ImgOrientationContext);
  return (
    <BodyWrapper className={!imgIsLandscape && "portrait"} {...restProps}>
      {children}
    </BodyWrapper>
  );
};

CardActions.Image = function CardActionsImage({ src, ...restProps }) {
  const { imgIsLandscape } = useContext(ImgOrientationContext);
  return (
    <Image src={src} className={!imgIsLandscape && "portrait"} {...restProps} />
  );
};

CardActions.Links = function CardActionsLinks({ children, ...restProps }) {
  const { imgIsLandscape } = useContext(ImgOrientationContext);
  return (
    <Links className={!imgIsLandscape && "portrait"} {...restProps}>
      {children}
    </Links>
  );
};

CardActions.Link = function CardActionLink({
  name,
  url,
  children,
  ...restProps
}) {
  let icon;
  const iconName = camelCase(name);
  const iconAsset = IconAssets[iconName];
  if (iconAsset) {
    icon = <LinkIcon src={iconAsset}></LinkIcon>;
  } else {
    // use placeholder?
    icon = null;
  }

  return (
    <Link {...restProps}>
      <a href={url} target="_blank" rel="noreferrer noopener">
        <LinkIconContainer>{icon}</LinkIconContainer>
        <LinkText>{children}</LinkText>
      </a>
    </Link>
  );
};
