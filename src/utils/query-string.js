export default function queryString(queryParams) {
  const { text, genre, runtime, decade } = { ...queryParams };

  let queryString = [];

  if (genre && genre.length > 0) {
    let genreStr =
      "g=" +
      genre
        .reduce((acc, cur) => {
          acc.push(cur);
          return acc;
        }, [])
        .join(",");
    queryString.push(genreStr);
  }

  if (runtime) {
    queryString.push(`rmin=${runtime.min}&rmax=${runtime.max}`);
  }

  if (decade) {
    queryString.push(`dmin=${decade.min}&dmax=${decade.max}`);
  }

  const trimmedText = (text || "").trim();
  if (trimmedText) {
    queryString.push(`q=${encodeURIComponent(trimmedText)}`);
  }

  queryString = queryString.join("&");

  return queryString;
}
