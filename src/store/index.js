import { configureStore } from "@reduxjs/toolkit";

import optionsReducer from "./query-slice";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: {
    options: optionsReducer,
    ui: uiReducer,
  },
});

export default store;
