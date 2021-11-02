import CookieConsent, { Cookies } from "react-cookie-consent";

export default function CookieConsentBanner() {
  const handleDeclineCookie = () => {
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  return (
    <CookieConsent
      enableDeclineButton
      onDecline={handleDeclineCookie}
      style={{ background: "#222", opacity: "0.95" }}
      buttonStyle={{
        background: "#51c7d6",
        fontFamily: "HelveticaNeue-CondensedBold, sans-serif",
      }}
      declineButtonStyle={{
        background: "#BA2150",
      }}
    >
      This website uses cookies to enhance user experience.
    </CookieConsent>
  );
}
