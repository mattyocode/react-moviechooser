export const GA_TRACKING_ID = "G-ZXD4BK35ZX";

export const pageView = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_location: url,
  });
};
