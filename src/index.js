import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { GlobalStyles } from "./global-styles";
import store from "./store/index";

ReactDOM.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <GlobalStyles />

          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </>,
  document.getElementById("root")
);
