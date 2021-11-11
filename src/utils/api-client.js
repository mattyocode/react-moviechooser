const apiURL = process.env.REACT_APP_TEST_API;

export async function client(
  endpoint,
  { body, token, signal, headers: customHeaders, ...customConfig } = {},
  fullUrl
) {
  const config = {
    method: body ? "POST" : "GET",
    body: body ? JSON.stringify(body) : undefined,
    signal: signal ? signal : undefined,
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
    if (fullUrl === true) {
      response = await fetch(`${endpoint}`, config);
    } else {
      console.log("config >>>", config);
      response = await fetch(`${apiURL}/${endpoint}`, config);
    }

    data = await response.json();
    if (response.ok) {
      return data;
    }

    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}, fullUrl = false) {
  return client(endpoint, { ...customConfig, method: "GET" }, fullUrl);
};

client.post = function (endpoint, body, customConfig = {}, fullUrl = false) {
  return client(endpoint, { ...customConfig, body }, fullUrl);
};
