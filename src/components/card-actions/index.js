import React, { useContext, createContext, useState } from "react";
import { camelCase } from "lodash";

import {
  Wrapper,
  Header,
  HeaderIcon,
  Title,
  BodyWrapper,
  Image,
  Actions,
  Action,
  IconContainer,
  Icon,
  IconText,
} from "./styles/card-actions";

import * as IconAssets from "../../assets";

const ImgOrientationContext = createContext();

export default function CardActions({
  landscape = true,
  children,
  ...restProps
}) {
  const [imgIsLandscape] = useState(landscape);

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

CardActions.Actions = function CardActionsActions({ children, ...restProps }) {
  const { imgIsLandscape } = useContext(ImgOrientationContext);
  return (
    <Actions className={!imgIsLandscape && "portrait"} {...restProps}>
      {children}
    </Actions>
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
    icon = <Icon src={iconAsset}></Icon>;
  } else {
    // use placeholder?
    icon = null;
  }

  return (
    <Action {...restProps}>
      <a href={url} target="_blank" rel="noreferrer noopener">
        <IconContainer>{icon}</IconContainer>
        <IconText>{children}</IconText>
      </a>
    </Action>
  );
};

CardActions.Action = function CardActionAction({ children, ...restProps }) {
  return <Action {...restProps}>{children}</Action>;
};

CardActions.Icon = function CardActionIcon({ name, children, ...restProps }) {
  let icon;
  const iconName = camelCase(name);
  const iconAsset = IconAssets[iconName];
  if (iconAsset) {
    icon = <Icon src={iconAsset}></Icon>;
  } else {
    // use placeholder?
    icon = null;
  }

  return (
    <React.Fragment {...restProps}>
      <IconContainer>{icon}</IconContainer>
      <IconText>{children}</IconText>
    </React.Fragment>
  );
};
