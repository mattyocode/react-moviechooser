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
      let { signal } = config[0];
      try {
        const responseData = await requestFunction(requestData, ...config);
        if (!signal || (signal && !signal.aborted)) {
          dispatch({ type: "SUCCESS", responseData });
        }
      } catch (error) {
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

//   setIsLoading(true);
//   setError(null);
//   try {
//     const response = await fetch(config.url, {
//       method: config.method ? config.method : "GET",
//       headers: config.headers ? config.headers : {},
//       body: config.body ? JSON.stringify(config.body) : null,
//     });
//     if (!response.ok) {
//       throw new Error("Request failed");
//     }
//     const data = await response.json();

//     applyData(data);
//   } catch (err) {
//     setError(err);
//   }
//   setIsLoading(false);
// }, []);

// return {
//   isLoading,
//   error,
//   sendRequest,
// };
// }
