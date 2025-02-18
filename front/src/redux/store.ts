import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/pump";

import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer
  },
  // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()


