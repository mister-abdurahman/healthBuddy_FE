import { createSlice } from "@reduxjs/toolkit";

const persistedUserData = localStorage.getItem("userData");

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: persistedUserData
      ? JSON.parse(persistedUserData)
      : {
          _id: "",
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          profilePicture: "",
          facebookHandle: "",
          twitterHandle: "",
          linkedInHandle: "",
          address: "",
          state: "",
          walletId: "",
        },
  },
  reducers: {
    getInfo(state, action) {
      state.userDetails = { ...action.payload };
    },
  },
});

export const { getInfo } = UserSlice.actions;
export default UserSlice.reducer;
