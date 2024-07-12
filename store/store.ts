import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import usersSlice from "./users/users.slice";
import { postsApi } from "./posts/posts.api";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const persistConfig = {
  key: "appState",
  storage:
    typeof window !== "undefined"
      ? createWebStorage("local")
      : createNoopStorage(),
};

// all reducers
const combinedReducers = combineReducers({
  users: usersSlice.reducer,
  [postsApi.reducerPath]: postsApi.reducer,
});

// all middlewares
const combinedMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat([postsApi.middleware]);

const rootReducer: Reducer<RootState> = (state, action) => {
  return combinedReducers(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// main store
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: combinedMiddleware,
  devTools: true,
});

const persistor = persistStore(appStore);
export { appStore, persistor };

export type RootState = ReturnType<typeof combinedReducers>;
export type AppDispatch = typeof appStore.dispatch;
