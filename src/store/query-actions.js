import { optionsActions } from "./query-slice";
import { uiActions } from "./ui-slice";

export const fetchOptionsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
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
    } catch (error) {
      uiActions.showNotifications({
        status: "error",
        title: "Error!",
        message: "Fetching options failed!",
      });
    }
  };
};
