import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
     
    },
    logOut: (state) => {
      (state.user = null), (state.token = null);
    },
    editUser: (state, action) => {
      state.user = { ...state.user, ...action.payload.data };
    },
  },
});
export const { setUser, logOut,editUser } = authSlice.actions;
export default authSlice.reducer;
