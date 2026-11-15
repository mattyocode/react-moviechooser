import useSWR from "swr";

import { client } from "../utils/axios-client";

const fetcher = (url) => client.get(url);

const options = { revalidateOnFocus: false, shouldRetryOnError: false };

// Where a movie can be watched in one country. A null slug fetches nothing,
// so the request only happens once the panel is mounted with a movie.
export function useWatch(slug, country) {
  const key =
    slug && country
      ? `/api/movies/${encodeURIComponent(slug)}/watch/?country=${encodeURIComponent(country)}`
      : null;
  return useSWR(key, fetcher, options);
}

// The countries the API has watch data for, for the country picker.
export function useRegions() {
  return useSWR("/api/watch/regions/", fetcher, options);
}
