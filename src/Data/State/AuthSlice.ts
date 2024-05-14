import { createSlice } from "@reduxjs/toolkit";

const persistedSignIn = localStorage.getItem("signedIn");
const persistedToken = localStorage.getItem("token");

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isSignIn: persistedSignIn ? JSON.parse(persistedSignIn)?.signedIn : false,
    isloading: false,
    token: persistedToken ? JSON.parse(persistedToken)?.token : null,
  },
  reducers: {
    signIn(state) {
      state.isSignIn = true;
      state.isloading = false;
    },
    getToken(state, action) {
      state.token = action.payload;
    },
    logOut(state) {
      state.token = null;
      state.isSignIn = false;
      localStorage.setItem("token", "");
      localStorage.setItem("signedIn", "");
      localStorage.setItem("userData", "");
    },
  },
});

export const { signIn, getToken, logOut } = AuthSlice.actions;

export default AuthSlice.reducer;
