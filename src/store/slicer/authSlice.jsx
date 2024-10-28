import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    token: null,
  },
  reducers: {
    registerUser: (state, action) => {
      state.user = action;
    },
    login: (state, action) => {
      state.user = action;
    },
  },
});
export const { registerUser, login } = authSlice.actions;
export default authSlice.reducer;
