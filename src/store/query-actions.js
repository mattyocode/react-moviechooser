import { optionsActions } from "./query-slice";
import { moviesActions } from "./movies-slice";
import { uiActions } from "./ui-slice";

export const fetchOptionsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "loading",
          title: "Loading",
          message: "Loading...",
        })
      );
      const response = await fetch(`${process.env.REACT_APP_TEST_API}/options`);
      if (!response.ok) {
        throw new Error("Could not fetch movie options");
      }

      const data = await response.json();
      return data;
    };
    try {
      const optionsData = await fetchData();
      dispatch(
        optionsActions.addOptions({
          options: optionsData,
        })
      );
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Received options data!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching options failed!",
        })
      );
    }
  };
};

export const fetchMovies = (queryParams) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "loading",
          title: "Loading movies",
          message: "Loading movies...",
        })
      );

      const response = await fetch(`${process.env.REACT_APP_TEST_API}/movies`);
      if (!response.ok) {
        throw new Error("Could not fetch movie options");
      }

      const data = await response.json();
      // TODO - destructure and rename data to camelcase
      return data;
    };
    try {
      const moviesData = await fetchData();
      dispatch(
        moviesActions.getMovies({
          queryParams: queryParams,
          movies: moviesData,
        })
      );
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Received movies data!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: `${error}`,
        })
      );
    }
  };
};
