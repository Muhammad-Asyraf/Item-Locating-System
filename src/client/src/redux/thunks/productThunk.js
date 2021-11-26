import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSingleProduct = createAsyncThunk(
  'product/getSingleProduct',
  async ({ uuid }, { rejectWithValue, getState }) => {
    try {
      const { authHeader } = await getState().auth;
      const endpointURL = `/api/backoffice/product-service/product/${uuid}`;

      const { data } = await axios.get(endpointURL, authHeader);

      return {
        product: data,
        message: 'Successfully retrieved product',
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

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (args, { rejectWithValue, getState }) => {
    try {
      const storeUuid = localStorage.getItem('storeUUID');
      const { authHeader } = await getState().auth;
      const endpointURL = `/api/backoffice/product-service/products/${storeUuid}`;

      const res = await axios.get(endpointURL, authHeader);

      return {
        products: res.data,
        message: 'Successfully retrieved products',
        status: 'ok',
      };
    } catch (err) {
      console.log('error', err);
      const { data } = err.response;

      return rejectWithValue({
        message: 'Failed in retrieving products',
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async ({ payload }, { rejectWithValue, getState }) => {
    try {
      const { authHeader } = await getState().auth;
      const endpointURL = '/api/backoffice/product-service/product';

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

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async ({ uuid }, { rejectWithValue, getState }) => {
    try {
      const { authHeader } = await getState().auth;
      const endpointURL = `/api/backoffice/product-service/product/${uuid}`;

      await axios.delete(endpointURL, authHeader);

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

export const deleteMultipleProducts = createAsyncThunk(
  'product/deleteMultipleProducts',
  async ({ payload }, { rejectWithValue, getState }) => {
    try {
      const { authHeader } = await getState().auth;
      const endpointURL = '/api/backoffice/product-service/product/delete';

      await axios.post(endpointURL, payload, authHeader);

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

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ uuid, payload }, { rejectWithValue, getState }) => {
    try {
      const { authHeader } = await getState().auth;
      const endpointURL = `/api/backoffice/product-service/product/${uuid}`;

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

export const toggleProductStatus = createAsyncThunk(
  'product/toggleProductStatus',
  async ({ uuid, payload }, { rejectWithValue, getState }) => {
    try {
      const { authHeader } = await getState().auth;
      const endpointURL = `/api/backoffice/product-service/product/${uuid}`;

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

export const patchMultipleProducts = createAsyncThunk(
  'product/patchMultipleProducts',
  async ({ payload }, { rejectWithValue, getState }) => {
    try {
      const { authHeader } = await getState().auth;
      const endpointURL = '/api/backoffice/product-service/product/multiple';

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
