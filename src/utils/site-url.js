// Absolute URL on this site, for links that leave it (share links, the password-reset
// email). VITE_DOMAIN_NAME is set for production builds; without it (e.g. a build from
// .env.example) fall back to the page's own origin rather than a relative path.
export default function siteUrl(path) {
  const origin = (
    import.meta.env.VITE_DOMAIN_NAME || window.location.origin
  ).replace(/\/+$/, "");
  return `${origin}${path}`;
}
