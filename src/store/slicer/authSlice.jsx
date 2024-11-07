import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user") || {},
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOut: (state) => {
      (state.user = null), (state.token = null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    editUser: (state, action) => {
      state.user = { ...state.user, ...action.payload.data.user };
      localStorage.setItem("user", action.payload.data.user);
    },
  },
});
export const { setUser, logOut, editUser } = authSlice.actions;
export default authSlice.reducer;
