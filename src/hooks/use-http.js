import { useReducer, useCallback } from "react";

function httpReducer(state, action) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "succeeded",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "rejected",
    };
  }
}

export default function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : "idle",
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData, ...config) {
      dispatch({ type: "SEND" });
      // let { signal } = config[0];
      try {
        const responseData = await requestFunction(requestData, ...config);
        // if (!signal || (signal && !signal.aborted)) {
        dispatch({ type: "SUCCESS", responseData });
        // }
      } catch (error) {
        console.log("use HTTP called - catch block");
        // if (signal && signal.aborted) {
        if (error === "Aborted") {
          return;
        }

        dispatch({
          type: "ERROR",
          errorMessage: error.message || "An error occurred",
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}
