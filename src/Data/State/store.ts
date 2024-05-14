import { configureStore } from "@reduxjs/toolkit";
import { AuthApi, CoreApi, checkValidToken } from "../Api/ApiHandler";
import AuthReducer from "./AuthSlice";
import UserReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    [CoreApi.reducerPath]: CoreApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    auth: AuthReducer,
    user: UserReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      CoreApi.middleware,
      AuthApi.middleware,
      checkValidToken
    ),
});

// console.log("store token", st);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
