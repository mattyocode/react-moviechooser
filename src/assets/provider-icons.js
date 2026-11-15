import {
  amazonInstantVideo,
  amazonPrimeVideo,
  disney,
  googlePlay,
  iTunes,
  netflix,
} from "./index";

// TMDB watch-provider ID -> our own icon. Any other provider shows TMDB's logo.
// IDs from TMDB's /watch/providers/movie lists for GB and US.
export const PROVIDER_ICONS = {
  8: netflix, // Netflix
  9: amazonPrimeVideo, // Amazon Prime Video
  10: amazonInstantVideo, // Amazon Video (rent / buy)
  337: disney, // Disney Plus
  2: iTunes, // Apple TV (the store)
  3: googlePlay, // Google Play Movies
};
