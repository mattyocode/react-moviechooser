import axios from "axios";
const apiURL = process.env.REACT_APP_TEST_API;

export async function client(
  endpoint,
  { body, token, cancelToken, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    url: endpoint,
    baseURL: apiURL, // possible issues with 'more movies' api call
    method: body ? "POST" : "GET", // method (same)
    data: body ? JSON.stringify(body) : undefined, // data?
    cancelToken: cancelToken ? cancelToken : undefined, // cancelToken: source.token
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
    console.log("config >>>", config);
    response = await axios(config);
    data = response.data;
    if (response.statusText === "OK") {
      return data;
    }

    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};
