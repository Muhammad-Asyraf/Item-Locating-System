import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authThunk"

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  authHeader: {},
  status: null,
  message: [],
  errors: [],
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [login.rejected]: (state, { payload }) => ({
      ...state,
      ...payload
    })


  }
});

export const {} = authSlice.actions;

// Getter methods for Auth state
export const getIsLoading = (state) => state.auth.isLoading;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getUser = (state) => state.auth.user;
export const getAuthStatus = (state) => state.auth.status;
export const getAuthHeader = (state) => state.auth.authHeader;
export const getAuthMessage = (state) => state.auth.message;
export const getAuthErrors = (state) => state.auth.errors;

export default authSlice.reducer;