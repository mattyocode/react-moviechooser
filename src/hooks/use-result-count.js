import { useEffect, useState } from "react";

import { client } from "../utils/axios-client";

const cache = new Map();

// Live count of movies matching a query string, for labelling the search
// button. Debounced and cached; count is null while unknown or if the count
// endpoint is unavailable, so callers can fall back to a generic label.
export default function useResultCount(queryStr, delay = 350) {
  const [count, setCount] = useState(() =>
    cache.has(queryStr) ? cache.get(queryStr) : null
  );

  useEffect(() => {
    if (cache.has(queryStr)) {
      setCount(cache.get(queryStr));
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      client(`api/movies/count/?${queryStr}`, { signal: controller.signal })
        .then((data) => {
          cache.set(queryStr, data.count);
          setCount(data.count);
        })
        .catch(() => {
          if (!controller.signal.aborted) setCount(null);
        });
    }, delay);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [queryStr, delay]);

  return count;
}
