import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getStore = createAsyncThunk(
  'store/getStore',
  async ({ userUUID }, { rejectWithValue, getState }) => {
    try {
      const endpointURL = `/api/backoffice/store-service/store/user/${userUUID}`;
      const { authHeader } = await getState().auth;

      const res = await axios.get(endpointURL, authHeader);

      localStorage.setItem('storeUUID', res.data.uuid);
      localStorage.setItem('storeUrl', res.data.store_url);

      return {
        data: res.data,
        message: 'Successfully retrieved store data',
        status: 'ok',
      };
    } catch (err) {
      return rejectWithValue({
        message: err,
        status: 'Error!',
        error: 'ttt',
      });
    }
  }
);

export default getStore;
