import { http, HttpResponse } from "msw";
import testGenreData from "../mocks/test-data/testGenreData.json";
import moviesData from "../mocks/test-data/testMoviesData.json";
import textSearchData from "../mocks/test-data/testTextSearchData.json";
import similarData from "../mocks/test-data/testSimilarData.json";
import listData from "../mocks/test-data/testListData.json";
import listAddItemData from "../mocks/test-data/testListAddData.json";

const apiUrl = `${import.meta.env.VITE_API}`;

const handlers = [
  http.get(`${apiUrl}/api/genres/`, async () => {
    return HttpResponse.json(testGenreData);
  }),
  http.get(`${apiUrl}/api/movies/`, async ({ request }) => {
    // A text search returns the API's real paginated shape, with similarity.
    if (new URL(request.url).searchParams.get("q")) {
      return HttpResponse.json(textSearchData);
    }
    return HttpResponse.json(moviesData);
  }),
  http.get(`${apiUrl}/api/movies/count/`, async ({ request }) => {
    const genres = new URL(request.url).searchParams.get("g");
    return HttpResponse.json({ count: genres ? 0 : 12 });
  }),
  http.get(`${apiUrl}/api/movies/:slug/similar/`, async () => {
    return HttpResponse.json(similarData);
  }),
  http.get(`${apiUrl}/api/movies/random`, async () => {
    const movieData = moviesData[0];
    return HttpResponse.json(movieData);
  }),
  http.get(`${apiUrl}/api/movies/123`, async () => {
    const movieData = moviesData[3];
    return HttpResponse.json(movieData);
  }),
  http.get(`${apiUrl}/list/`, async () => {
    return HttpResponse.json(listData);
  }),
  http.post(`${apiUrl}/list/`, async () => {
    return HttpResponse.json(listAddItemData);
  }),
  http.patch(`${apiUrl}/list/:movieSlug`, async ({ params }) => {
    const { movieSlug } = params;
    let listItem = listData.results.filter((result) => {
      return result.movie.slug === movieSlug;
    });
    const watchedStatus = listItem[0].watched;
    listItem[0]["watched"] = !watchedStatus;
    return HttpResponse.json(listItem[0]);
  }),
  http.delete(`${apiUrl}/list/:movieSlug`, async () => {
    return HttpResponse.json({ deleted: "test-item-id-123456" });
  }),
];

export { handlers };
