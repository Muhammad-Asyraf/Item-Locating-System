import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeader from '../../services/firebase/getHeader';

export const getSingleItem = createAsyncThunk(
  'item/getSingleItem',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/item-service/item/${uuid}`;

      const { data } = await axios.get(endpointURL, authHeader);

      return {
        item: data,
        message: 'Successfully retrieved item',
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

export const getItems = createAsyncThunk(
  'item/getItems',
  async (args, { rejectWithValue }) => {
    try {
      const storeUuid = localStorage.getItem('storeUUID');
      const endpointURL = `/api/backoffice/item-service/items/${storeUuid}`;
      const authHeader = await getHeader();

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

export const addItem = createAsyncThunk(
  'item/addItem',
  async ({ payload }, { rejectWithValue }) => {
    try {
      const endpointURL = '/api/backoffice/item-service/item';
      const authHeader = await getHeader();

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

export const deleteItem = createAsyncThunk(
  'item/deleteItem',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/item-service/item/${uuid}`;

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

export const deleteMultipleItems = createAsyncThunk(
  'item/deleteMultipleItems',
  async ({ listToDelete }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = '/api/backoffice/item-service/item/delete';

      await axios.post(endpointURL, { listToDelete }, authHeader);

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

export const updateItem = createAsyncThunk(
  'item/updateItem',
  async ({ uuid, payload }, { rejectWithValue }) => {
    try {
      const endpointURL = `/api/backoffice/item-service/item/${uuid}`;
      const authHeader = await getHeader();

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
