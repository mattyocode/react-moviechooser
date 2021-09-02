import keysToCamel from "../utils/camelcase";

const apiURL = process.env.REACT_APP_TEST_API;
// console.log("apiURL", apiURL);

export async function client(
  endpoint,
  { body, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: body ? "POST" : "GET",
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      "Content-Type": body ? "application/json" : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  let data;
  try {
    const response = await fetch(`${apiURL}/${endpoint}`, config);
    // console.log(response);

    data = await response.json();
    // console.log(data);

    if (response.ok) {
      // make sure keys from API are in camelcase
      if (Array.isArray(data)) {
        let camelcaseKeys = [];
        data.forEach((item) => {
          camelcaseKeys.push(keysToCamel(item));
        });
        return camelcaseKeys;
      } else {
        return keysToCamel(data);
      }
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