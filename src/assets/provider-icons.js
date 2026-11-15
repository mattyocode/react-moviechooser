import {
  amazonInstantVideo,
  amazonPrimeVideo,
  disney,
  googlePlay,
  iTunes,
  netflix,
} from "./index";

// TMDB watch-provider ID -> our own icon. Any other provider shows TMDB's logo.
// Checked 2026-11-15 against TMDB's live /watch/providers/movie lists
// (watch_region=GB: 146 providers, US: 296):
//   8 Netflix, 9 Amazon Prime Video, 10 Amazon Video, 337 Disney Plus,
//   2 Apple TV Store: all in both lists.
//   3 Google Play Movies: US only. TMDB no longer lists it for GB.
//   350 "Apple TV" is the subscription service, not the store, so it isn't
//   mapped to the iTunes icon and shows TMDB's logo instead.
export const PROVIDER_ICONS = {
  8: netflix, // Netflix
  9: amazonPrimeVideo, // Amazon Prime Video
  10: amazonInstantVideo, // Amazon Video (rent / buy)
  337: disney, // Disney Plus
  2: iTunes, // Apple TV Store
  3: googlePlay, // Google Play Movies
};
