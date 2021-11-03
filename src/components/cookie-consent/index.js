import React from "react";
import {
  BannerText,
  Wrapper,
  TextWrapper,
  Title,
} from "./styles/cookie-consent";

import CookieConsent from "react-cookie-consent";

export default function Cookies({ children, ...restProps }) {
  return <Wrapper {...restProps}>{children}</Wrapper>;
}

Cookies.Info = function CookieConsentInfo({
  titleText,
  children,
  ...restProps
}) {
  return <TextWrapper {...restProps}>{children}</TextWrapper>;
};

Cookies.Title = function CookieTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Cookies.BannerText = function CookieBannerText({ children, ...restProps }) {
  return <BannerText {...restProps}>{children}</BannerText>;
};

Cookies.Banner = function CookieConsentBanner({
  acceptHandler,
  declineHandler,
  children,
  ...restProps
}) {
  return (
    <CookieConsent
      enableDeclineButton
      onDecline={declineHandler}
      onAccept={acceptHandler}
      style={{
        background: "#222",
        opacity: "0.95",
        padding: "0.75rem 1.5rem",
        justifyContent: "center",
        alignItems: "center",
      }}
      contentStyle={
        window.innerWidth < 620
          ? {
              textAlign: "center",
              margin: "15px 3px 5px 3px",
            }
          : { textAlign: "left" }
      }
      buttonStyle={{
        background: "#51c7d6",
        fontFamily: "HelveticaNeue-CondensedBold, sans-serif",
        margin: "0.5rem",
      }}
      declineButtonStyle={{
        background: "transparent",
        border: "#BE6E58 1px solid",
        opacity: "0.9",
        fontFamily: "HelveticaNeue-CondensedBold, sans-serif",
        margin: "0.5rem",
      }}
      {...restProps}
    >
      {children}
    </CookieConsent>
  );
};
