import React, { useState } from "react";

const useHttp = (config, dataFn) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
};
