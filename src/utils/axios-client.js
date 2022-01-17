import axios from "axios";

const apiURL = process.env.REACT_APP_API;

export async function client(
  endpoint,
  { body, token, cancelToken, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    url: endpoint,
    baseURL: apiURL,
    method: body ? "POST" : "GET",
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
    response = await axios(config);
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

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};

client.patch = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "PATCH", body });
};
