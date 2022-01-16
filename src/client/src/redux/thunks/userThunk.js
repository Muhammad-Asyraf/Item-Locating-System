import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeader from '../../services/firebase/getHeader';

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/user-service/user/id/${uuid}`;

      const { data } = await axios.get(endpointURL, authHeader);
      return {
        user: data,
        message: 'Successfully retrieved user',
        status: 'ok',
      };
    } catch (err) {
      const { data } = err.response;

      return rejectWithValue({
        message: 'Failed in retrieving products',
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ uuid, payload }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/user-service/user/id/${uuid}`;

      await axios.put(endpointURL, payload, authHeader);

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
