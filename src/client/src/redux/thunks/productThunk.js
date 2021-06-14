import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (arg, { rejectWithValue }) => {
    try {
      const endpointURL = '/api/backoffice/product-service/products';
      const res = await axios.get(endpointURL);

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
  async (payload, { rejectWithValue }) => {
    try {
      const endpointURL = '/api/backoffice/product-service/product';
      await axios.post(endpointURL, payload);

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
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const endpointURL = `/api/backoffice/product-service/product/${uuid}`;
      await axios.delete(endpointURL);

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
  async (listToDelete, { rejectWithValue }) => {
    try {
      const endpointURL = '/api/backoffice/product-service/product/delete';
      await axios.post(endpointURL, listToDelete);

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
  async ({ uuid, payload }, { rejectWithValue }) => {
    try {
      const endpointURL = `/api/backoffice/product-service/product/${uuid}`;
      await axios.put(endpointURL, payload);

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
