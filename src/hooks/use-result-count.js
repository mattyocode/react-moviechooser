import { useEffect, useState } from "react";
import axios from "axios";

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

    const source = axios.CancelToken.source();
    const timer = setTimeout(() => {
      client(`api/movies/count/?${queryStr}`, { cancelToken: source.token })
        .then((data) => {
          cache.set(queryStr, data.count);
          setCount(data.count);
        })
        .catch(() => {
          if (!axios.isCancel(source.token.reason)) setCount(null);
        });
    }, delay);

    return () => {
      clearTimeout(timer);
      source.cancel();
    };
  }, [queryStr, delay]);

  return count;
}
