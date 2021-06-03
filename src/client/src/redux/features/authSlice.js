import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { loadingState, loadedState } from '../reducers/loadState';
import { errorState, noErrorState } from '../reducers/errorState';
import {
  activeUserState,
  noUserState,
  withHeaderState,
  loginSuccessState,
} from '../reducers/authState';

export const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  status: null,
  authHeader: {},
  message: [],
  errors: [],
};

export const setHeader = createAsyncThunk('auth/setHeader', async (firebase) => {
  const user = firebase.currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return {
    payloadHeader,
    message: 'Successfully set the payload header',
    status: 'ok',
  };
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ firebase, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const { user } = await firebase.signInWithEmailAndPassword(email, password);
      await dispatch(setHeader(firebase));

      return {
        user: user.toJSON(),
        message: 'Successfully logged in',
        status: 'ok',
      };
    } catch (err) {
      return rejectWithValue({
        message: err.message,
        status: 'Error!',
        error: err.code,
      });
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ firebase, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const endpointURL = '/api/backoffice/merchant-service/signup/email';
      const payload = { email, password };

      await axios.post(endpointURL, payload);
      await dispatch(login({ firebase, email, password }));
      await dispatch(setHeader(firebase));

      return true;
    } catch (err) {
      const { data } = err.response;
      return rejectWithValue({
        message: data.message,
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

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
  },
  extraReducers: {
    [setHeader.fulfilled]: withHeaderState,
    [setHeader.pending]: loadingState,
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
} = auth.actions;

export const selectUser = (state) => state.auth.user;
export const selectAuthIsLoading = (state) => state.auth.isLoading;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthErrors = (state) => state.auth.errors;
export const selectAuthMessage = (state) => state.auth.message;
export const selectAuthStatus = (state) => state.auth.message;

export default auth.reducer;
