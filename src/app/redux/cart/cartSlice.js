import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addItemReducer, updateItemReducer } from './cartReducers';
import { addItemThunk } from '../cart/cartThunk';
import { getAuthHeader } from '../../services/AuthenticationService';

// Environment configs
import { environment } from '../../environment';

export const loadAllItems = createAsyncThunk(
  'cart/loadAllItems',
  async (params, thunkAPI) => {
    const header = await getAuthHeader();
    const { data } = await axios.get(
      environment.host + '/api/mobile/planning-cart-service/cart/' + params,
      header
    );
    return data.products;
  }
);

export const changeItemQuantity = createAsyncThunk(
  'cart/changeItemQuantity',
  async (params, thunkAPI) => {
    const header = await getAuthHeader();
    const { data } = await axios.post(
      environment.host + '/api/mobile/planning-cart-service/cart/items/update',
      {
        cart_uuid: params.cart_uuid,
        product_uuid: params.product_uuid,
        quantity: params.quantity,
      },
      header
    );
    if (data === 1) console.log('Database updated');

    return params;
  }
);
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: [],
    update: true,
  },
  // Local reducers
  reducers: {
    addProduct: (state, { payload }) => {
      addItemReducer(state, payload);
    },
    updateQuantity: (state, { payload }) => {
      updateItemReducer(state, payload);
    },
    removeProduct: (state, { payload }) => {
      // Place productId to a variable
      let product = payload;

      // Get the index of the product
      let index = state.products.indexOf(product);

      // Delete product quantity by 1
      if (!state.quantity[index] === 1) {
        state.quantity[index] -= 1;
      } else {
        // If there is only one, remove the index from both product and quantity arrays
        state.products.splice(index, 1);
        state.quantity.splice(index, 1);
      }
    },
    update: (state, { payload }) => {
      state.update = payload;
    },
  },
  // Async reducers
  extraReducers: {
    [loadAllItems.fulfilled]: (state, { payload }) => {
      let productArr = [];
      let quantityArr = [];

      payload.forEach((product) => {
        productArr.push(product.uuid);
        quantityArr.push(product.quantity);
      });

      state.products = productArr;
      state.quantity = quantityArr;
      console.log(state);
    },
    [changeItemQuantity.fulfilled]: (state, { payload }) => {
      updateItemReducer(state, payload);
    },
    [changeItemQuantity.rejected]: (state, { payload }) => {
      console.log('changeItemQuantity rejected');
    },
    [addItemThunk.fulfilled]: (state, { payload }) => {
      addItemReducer(state, payload);
    },
    [addItemThunk.rejected]: (state, { payload }) => {
      console.log(payload);
    },
  },
});
export const { addProduct, updateQuantity, removeProduct, update } =
  cartSlice.actions;

export default cartSlice.reducer;
