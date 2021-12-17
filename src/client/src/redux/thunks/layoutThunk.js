import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLayout = createAsyncThunk(
  'layout/getLayout',
  async (args, { rejectWithValue, getState }) => {
    try {
      const storeUuid = localStorage.getItem('storeUUID');
      const endpointURL = `/api/backoffice/item-service/items/${storeUuid}`;
      const { authHeader } = await getState().auth;

      const { data } = await axios.get(endpointURL, authHeader);

      return {
        items: data,
        message: 'Successfully retrieved items',
        status: 'ok',
      };
    } catch (err) {
      const { data } = err.response;

      return rejectWithValue({
        message: 'Failed in retrieving items',
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const updateLayout = createAsyncThunk(
  'layout/updateLayout',
  async ({ uuid, payload }, { rejectWithValue, getState }) => {
    try {
      const endpointURL = `/api/backoffice/item-service/item/${uuid}`;
      const { authHeader } = await getState().auth;

      await axios.put(endpointURL, payload, authHeader);

      return true;
    } catch (err) {
      console.log('error', err);
      const { data } = err.response;

      return rejectWithValue({
        message: data.message,
        status: 'Error!',
        error: data.code,
      });
    }
  }
);
