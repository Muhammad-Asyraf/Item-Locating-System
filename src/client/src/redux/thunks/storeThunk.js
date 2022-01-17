import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeader from '../../services/firebase/getHeader';

const getStore = createAsyncThunk(
  'store/getStore',
  async ({ userUUID }, { rejectWithValue }) => {
    try {
      const endpointURL = `/api/backoffice/store-service/store/user/${userUUID}`;
      const authHeader = await getHeader();

      const res = await axios.get(endpointURL, authHeader);

      localStorage.setItem('storeUUID', res.data.uuid);
      localStorage.setItem('storeUrl', res.data.store_url);
      localStorage.setItem('storeName', res.data.store_name);

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
