export const GA_TRACKING_ID = "G-ZXD4BK35ZX";

export const pageView = (path) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_location: window.location.href,
    page_path: path,
  });
};
