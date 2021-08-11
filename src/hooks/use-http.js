import React, { useState, useCallback } from "react";

export default function useHttp() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (config, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(config.url, {
        method: config.method ? config.method : "GET",
        headers: config.headers ? config.headers : {},
        body: config.body ? JSON.stringify(config.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      console.log(response);
      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
}
