import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeader from '../../services/firebase/getHeader';

export const getSinglePromo = createAsyncThunk(
  'promotion/getSinglePromo',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/promotion-service/promotion/${uuid}`;

      const { data } = await axios.get(endpointURL, authHeader);

      return {
        promotion: data,
        message: 'Successfully retrieved promotion',
        status: 'ok',
      };
    } catch (err) {
      const { data } = err.response;

      return rejectWithValue({
        message: 'Failed in retrieving promotions',
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const getPromotions = createAsyncThunk(
  'promotion/getPromotions',
  async (args, { rejectWithValue }) => {
    try {
      const storeUuid = localStorage.getItem('storeUUID');
      const endpointURL = `/api/backoffice/promotion-service/promotions/${storeUuid}`;
      const authHeader = await getHeader();

      const { data } = await axios.get(endpointURL, authHeader);

      return {
        promotions: data,
        message: 'Successfully retrieved promotions',
        status: 'ok',
      };
    } catch (err) {
      const { data } = err.response;

      return rejectWithValue({
        message: 'Failed in retrieving promotions',
        status: 'Error!',
        error: data.code,
      });
    }
  }
);

export const addPromotion = createAsyncThunk(
  'promotion/addPromotion',
  async ({ payload }, { rejectWithValue }) => {
    try {
      const endpointURL = '/api/backoffice/promotion-service/promotion';
      const authHeader = await getHeader();

      await axios.post(endpointURL, payload, authHeader);

      return true;
    } catch (err) {
      const { data, status } = err.response;

      return rejectWithValue({
        message: data.message,
        status,
      });
    }
  }
);

export const deletePromotion = createAsyncThunk(
  'promotion/deletePromotion',
  async ({ uuid }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = `/api/backoffice/promotion-service/promotion/${uuid}`;

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

export const deleteMultiplePromotions = createAsyncThunk(
  'promotion/deleteMultiplePromotions',
  async ({ listToDelete }, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = '/api/backoffice/promotion-service/promotion/delete';

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

export const updatePromotion = createAsyncThunk(
  'promotion/updatePromotion',
  async ({ uuid, payload }, { rejectWithValue }) => {
    try {
      const endpointURL = `/api/backoffice/promotion-service/promotion/${uuid}`;
      const authHeader = await getHeader();

      await axios.put(endpointURL, payload, authHeader);

      return true;
    } catch (err) {
      const { data, status } = err.response;

      return rejectWithValue({
        message: data.message,
        status,
      });
    }
  }
);
