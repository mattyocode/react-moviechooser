import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

import { GlobalStyles } from "./global-styles";

ReactDOM.render(
  <>
    <BrowserRouter>
      <React.StrictMode>
        <GlobalStyles />
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
