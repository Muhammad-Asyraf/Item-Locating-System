import { createAsyncThunk } from '@reduxjs/toolkit';
import { addItemIntoCart } from '../../services/LoketlistService';

/**
 * Add single/multiple items into cart with UUID
 */
export const addItemThunk = createAsyncThunk(
  'cart/addItemThunk',
  async (params, thunkAPI) => {
    const { cart_uuid, product_uuid, quantity } = params;
    try {
      const response = await addItemIntoCart(cart_uuid, product_uuid, quantity);
      return params;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
