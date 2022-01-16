import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState, noErrorState } from '../states/errorState';
import {
  activeUserState,
  noUserState,
  // withHeaderState,
  loginSuccessState,
} from '../states/authState';

import { login, signup } from '../thunks/authThunk';

export const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  status: null,
  message: [],
  errors: [],
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setActiveUser: activeUserState,
    clearActiveUser: noUserState,
    verifying: loadingState,
    verified: loadedState,
    clearAuthError: noErrorState,
    clearState: loginSuccessState,
    logout: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
  extraReducers: {
    [login.fulfilled]: activeUserState,
    [login.pending]: loadingState,
    [login.rejected]: errorState,
    [signup.pending]: loadingState,
    [signup.rejected]: errorState,
  },
});

export const {
  setActiveUser,
  clearActiveUser,
  verifying,
  verified,
  clearAuthError,
  clearState,
  logout,
} = auth.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuthIsLoading = (state) => state.auth.isLoading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthErrors = (state) => state.auth.errors;
export const selectAuthMessage = (state) => state.auth.message;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthHeader = (state) => state.auth.authHeader;

export default auth.reducer;
