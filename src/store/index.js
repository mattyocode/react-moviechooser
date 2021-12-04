import {
  configureStore,
  // createSerializableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  // FLUSH,
  // PAUSE,
  // PERSIST,
  persistReducer,
  persistStore,
  // PURGE,
  // REGISTER,
  // REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth-slice";
import optionsReducer from "./query-slice";
import uiReducer from "./ui-slice";
import moviesReducer from "./movies-slice";
import listReducer from "./list-slice";

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// });

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: storage,
    blacklist: ["status", "error"],
  },
  rootReducer
);

const store = configureStore({
  reducer: {
    options: optionsReducer,
    ui: uiReducer,
    list: listReducer,
    movies: moviesReducer,
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
