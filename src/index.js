import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { GlobalStyles } from "./global-styles";
import store, { persistor } from "./store/index";

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <React.StrictMode>
            <GlobalStyles />
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </>,
  document.getElementById("root")
);
