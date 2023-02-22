import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: "",
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      state.user = action.payload;
    },
    loggedInStatus: (state, { payload }) => {
      state.userToken = payload;
    },
  },
});

export const { updateUserDetails, loggedInStatus } = userSlice.actions;

export default userSlice.reducer;
