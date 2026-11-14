// DRF pagination returns absolute `next` URLs built from the request's Host. Behind the
// dev proxy that's the backend's own origin (e.g. localhost:8000), which the browser
// can't reach, so keep only the path and let the client's baseURL supply the origin.
export default function relativeUrl(url) {
  const { pathname, search } = new URL(url, window.location.origin);
  return pathname + search;
}
