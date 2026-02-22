import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./authThunks";
import {type AuthState} from "./auth.types";


const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.clear();
      });
  },
});

export default authSlice.reducer;
