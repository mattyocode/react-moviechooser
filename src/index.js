import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";

import App from "./App";
import { GlobalStyles } from "./global-styles";
import store, { persistor } from "./store/index";

createRoot(document.getElementById("root")).render(
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
  </>
);
