import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import getStore from './storeThunk';

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
      await dispatch(getStore({ userUUID: user.toJSON().uid }));

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
  async ({ firebase, storePayload, userPayload }, { rejectWithValue, dispatch }) => {
    try {
      const storeEndpointURL = '/api/backoffice/store-service/store';
      const userEndpointURL = '/api/backoffice/backoffice-user-service/signup/email';

      const { data: store } = await axios.post(storeEndpointURL, storePayload);
      await axios.post(userEndpointURL, {
        ...userPayload,
        stores: {
          uuid: store.uuid,
        },
      });

      await dispatch(
        login({ firebase, email: userPayload.email, password: userPayload.password })
      );

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
