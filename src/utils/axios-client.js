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
    response = await axios(config);
    data = response.data;
    if (response.status === 200 || response.status === 201) {
      return data;
    }

    throw new Error(response.data);
  } catch (err) {
    console.log("client err data entries", Object.entries(err.response.data));
    console.log(
      "client err data values",
      Object.values(err.response.data)[0][0]
    );
    console.log("client err.message ", err.message);
    return Promise.reject(
      err.response.data ? Object.values(err.response.data)[0][0] : err.message
    );
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};
