export default function queryString(queryParams) {
  const { genre, runtime, decade } = { ...queryParams };

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

  queryString = queryString.join("&");

  return queryString;
}
