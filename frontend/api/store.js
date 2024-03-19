import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import authSlice from "../slice/authSlice";
import { usersApi } from "./usersApi";
import usersSlice from "../slice/usersSlice";
import { accountApi } from "./accountApi";
import accountSlice from "../slice/accountSlice";
import { transactionApi } from "./transactionApi";

export const store = configureStore({
  reducer: {
    authSlice,
    usersSlice,
    accountSlice,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (
    getDefaultMiddleware //allows you to use is loading
  ) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      accountApi.middleware,
      transactionApi.middleware
    ),
});
