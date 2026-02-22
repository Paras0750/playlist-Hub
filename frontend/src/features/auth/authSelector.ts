
import { type RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";


export const selectAuthState = (state: RootState) => state.auth;

export const selectAuthUser = (state: RootState) => state.auth.user;

export const selectAuthToken = (state: RootState) => state.auth.token;

export const selectAuthLoading = (state: RootState) => state.auth.loading;

export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.auth.token);




export const selectUserName = createSelector(
  [selectAuthUser],
  (user) => user?.name ?? ""
);

export const selectUserRole = createSelector(
  [selectAuthUser],
  (user) => user?.role ?? "user"
);
