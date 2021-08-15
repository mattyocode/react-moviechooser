import { optionsActions } from "./query-slice";
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
