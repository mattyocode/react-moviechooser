import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import store from "../store";
import { setAuthTokens, setLogout } from "../store/auth-slice";

// const apiURL = process.env.REACT_APP_TEST_API;
const apiURL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const { token } = store.getState().persistedReducer.auth;
  const authStore = store.getState().persistedReducer.auth;
  console.log("authStore", authStore);
  if (token !== null) {
    config.headers.Authorization = "JWT " + token;
    // console.debug(
    //   "[Request]",
    //   config.baseURL + config.url,
    //   JSON.stringify(token)
    // );
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    console.log("response interceptor!");
    // console.debug(
    //   "[Response]",
    //   res.config.baseURL + res.config.url,
    //   res.status,
    //   res.data
    // );
    return Promise.resolve(res);
  },
  (err) => {
    // console.debug(
    //   "[Response]",
    //   err.config.baseURL + err.config.url,
    //   err.response.status,
    //   err.response.data
    // );
    return Promise.reject(err);
  }
);

const refreshAuthHandler = async (failedRequest) => {
  const { refreshToken } = store.getState().persistedReducer.auth;
  console.log("refresh auth handler runs");
  if (refreshToken !== null) {
    return axios
      .post(
        "/auth/refresh",
        {
          refresh: refreshToken,
        },
        {
          baseURL: process.env.REACT_APP_TEST_API,
        }
      )
      .then((resp) => {
        const { access, refresh } = resp.data;
        failedRequest.response.config.headers.Authorization = "JWT " + access;
        store.dispatch(setAuthTokens({ token: access, refreshToken: refresh }));
      })
      .catch((err) => {
        if (
          (err.response && err.response.status === 401) ||
          err.response.status === 403
        ) {
          store.dispatch(setLogout());
        }
      });
  }
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthHandler);

export function fetcher(url) {
  console.log("fetcher url", url);
  const data = axiosInstance.get(url).then((res) => res.data);
  console.log("data ", data);
  return data;
}

export default axiosInstance;
