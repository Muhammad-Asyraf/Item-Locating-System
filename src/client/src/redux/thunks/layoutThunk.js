import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeader from '../../services/firebase/getHeader';

export const getLayout = createAsyncThunk(
  'layout/getLayout',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const endpointURL = `/api/backoffice/layout-service/layout/${uuid}`;
      const authHeader = await getHeader();
      const { data } = await axios.get(endpointURL, authHeader);

      return {
        layout: data,
        message: `Successfully retrieved layout ${uuid}`,
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

export const getLayouts = createAsyncThunk(
  'layout/getLayouts',
  async (args, { rejectWithValue }) => {
    try {
      const { storeUUID, authToken } = args || {};

      const storeID = storeUUID || localStorage.getItem('storeUUID');
      const payloadHeader = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authToken}`,
        },
      };
      const authHeader = authToken ? payloadHeader : await getHeader();
      const endpointURL = `/api/backoffice/layout-service/layouts/${storeID}`;

      const res = await axios.get(endpointURL, authHeader);

      return {
        layouts: res.data,
        message: 'Successfully retrieved layouts',
        status: 'ok',
      };
    } catch (err) {
      console.log('err', err);
      const { data } = err.response;

      return rejectWithValue({
        message: 'Failed in retrieving layouts',
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const addLayout = createAsyncThunk(
  'layout/addLayout',
  async ({ payload }, { rejectWithValue }) => {
    try {
      const endpointURL = '/api/backoffice/layout-service/layout';
      const authHeader = await getHeader();

      const {
        data: { uuid },
      } = await axios.post(endpointURL, payload, authHeader);

      return uuid;
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

export const deleteLayout = createAsyncThunk(
  'layout/deleteLayout',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/layout-service/layout/${uuid}`;

      await axios.delete(endpointURL, authHeader);

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

export const deleteMultipleLayouts = createAsyncThunk(
  'layout/deleteMultipleLayouts',
  async ({ payload }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = '/api/backoffice/layout-service/layout/delete';

      await axios.post(endpointURL, payload, authHeader);

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

export const updateLayout = createAsyncThunk(
  'layout/updateLayout',
  async ({ uuid, payload }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/layout-service/layout/${uuid}`;

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

export const patchSingleLayout = createAsyncThunk(
  'layout/patchSingleLayout',
  async ({ uuid, payload }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/layout-service/layout/${uuid}`;

      await axios.patch(endpointURL, payload, authHeader);

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

export const patchMultipleLayouts = createAsyncThunk(
  'layout/patchMultipleLayouts',
  async ({ payload }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = '/api/backoffice/layout-service/layout/multiple';

      await axios.patch(endpointURL, payload, authHeader);

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
