import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import getHeader from '../../services/firebase/getHeader';

export const getSubcategories = createAsyncThunk(
  'category/getSubcategories',
  async (args, { rejectWithValue }) => {
    try {
      const authHeader = await getHeader();
      const endpointURL = '/api/backoffice/sub-category-service/sub-category';

      const { data } = await axios.get(endpointURL, authHeader);

      return {
        subcategories: data,
        message: 'Successfully retrieved items',
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

export const getCategories = createAsyncThunk(
  'category/getCategories',
  async (args, { rejectWithValue }) => {
    try {
      const endpointURL = '/api/backoffice/category-service/category';
      const authHeader = await getHeader();

      const { data } = await axios.get(endpointURL, authHeader);

      return {
        categories: data,
        message: 'Successfully retrieved items',
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
