import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const setHeader = createAsyncThunk('auth/setHeader', async (firebase) => {
  const user = firebase.currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
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
  async ({ firebase, fullName, email, password }, { rejectWithValue, dispatch }) => {
    try {
      const endpointURL = '/api/backoffice/backoffice-user-service/signup/email';
      const payload = { fullName, email, password };

      await axios.post(endpointURL, payload);
      await dispatch(login({ firebase, email, password }));
      await dispatch(setHeader(firebase));

      return true;
    } catch (err) {
      const { data } = err.response;
      console.log(data);
      return rejectWithValue({
        message: data.message,
        status: 'Error!',
        error: data.code,
      });
    }
  }
);
