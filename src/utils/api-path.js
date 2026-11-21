// The API's pagination links (`next`) are absolute URLs built from the host
// the API saw. Behind the Vite dev proxy that's the API's own address
// (http://localhost:8000), which the browser can't reach, and behind a TLS
// proxy it can come back as http://. Keep only the path and query, so the
// request goes through the same base URL as every other API call.
export default function apiPath(url) {
  const { pathname, search } = new URL(url, "http://relative.invalid");
  return pathname.replace(/^\//, "") + search;
}
