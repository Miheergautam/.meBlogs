import { configureStore } from "@reduxjs/toolkit";
import { meBlogsApi } from "./services/meBlogsApi";

export const store = configureStore({
  reducer: {
    [meBlogsApi.reducerPath]: meBlogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(meBlogsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
