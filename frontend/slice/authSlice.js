import { authApi } from "../api/authApi";
import { createSlice } from "@reduxjs/toolkit";
import { usersApi } from "../api/usersApi";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    users: window.sessionStorage.getItem("USER")
      ? JSON.parse(window.sessionStorage.getItem("USER")).user
      : null,
    token: window.sessionStorage.getItem("USER")
      ? JSON.parse(window.sessionStorage.getItem("USER")).token
      : null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      window.sessionStorage.removeItem("USER");
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        // console.log(payload);
        state.users = payload.user;
        state.token = payload.token;
        window.sessionStorage.setItem(
          "USER",
          JSON.stringify({
            user: payload.user,
            token: payload.token,
          })
        );
        window.sessionStorage.setItem(
          "Account",
          JSON.stringify({
            account: payload.account,
          })
        );
      }
    );
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.users = payload.user;
        state.token = payload.token;
        // console.log(state.users);
        // console.log(state.token);
        window.sessionStorage.setItem(
          "USER",
          JSON.stringify({
            user: payload.user,
            token: payload.token,
          })
        );
      }
    );

    builder.addMatcher(
      usersApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.users = payload;
        const data = JSON.parse(window.sessionStorage.getItem("USER"));
        console.log(data);
        data.user = payload;
        window.sessionStorage.setItem("USER", JSON.stringify(data));
      }
    );
  },
});

export default authSlice.reducer;
export const { setToken } = authSlice.actions;
