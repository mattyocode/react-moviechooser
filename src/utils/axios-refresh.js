import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import store from "../store";
import { setAuthTokens, setLogout } from "../store/auth-slice";

const apiURL = process.env.REACT_APP_API;

const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = store.getState().auth.auth.token;

  if (token) {
    config.headers.Authorization = "JWT " + token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return Promise.resolve(res);
  },
  (err) => {
    return Promise.reject(err);
  }
);

const refreshAuthHandler = async (failedRequest) => {
  const refreshToken = store.getState().auth.auth.refreshToken;
  if (refreshToken) {
    return axios
      .post(
        "/auth/refresh/",
        {
          refresh: refreshToken,
        },
        {
          baseURL: apiURL,
        }
      )
      .then((resp) => {
        const { access, refresh } = resp.data;
        failedRequest.response.config.headers.Authorization = "JWT " + access;
        if (access && refresh) {
          store.dispatch(
            setAuthTokens({ token: access, refreshToken: refresh })
          );
        }
      })
      .catch((err) => {
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          store.dispatch(setLogout());
        }
      });
  } else {
    store.dispatch(setLogout());
  }
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthHandler);

export async function client(
  url,
  { body, token, cancelToken, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    url: url,
    baseURL: apiURL,
    data: body ? JSON.stringify(body) : undefined,
    cancelToken: cancelToken ? cancelToken : undefined,
    headers: {
      Authorization: token ? `JWT ${token}` : undefined,
      "Content-Type": body ? "application/json" : undefined,
      ...customHeaders,
    },

    ...customConfig,
  };
  let data;
  try {
    let response;
    response = await axiosInstance(config);
    data = response.data;
    if (response.status === 200 || response.status === 201) {
      return data;
    }

    throw new Error(response.data);
  } catch (err) {
    return Promise.reject(
      err.response.data
        ? String(Object.values(err.response.data)[0])
        : err.message
    );
  }
}

export default axiosInstance;

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "POST", body });
};

client.patch = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "PATCH", body });
};

client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "DELETE" });
};
