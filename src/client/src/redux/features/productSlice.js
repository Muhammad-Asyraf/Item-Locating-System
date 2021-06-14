import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState, noErrorState } from '../states/errorState';
import { receivedProductState } from '../states/productState';

import {
  getProducts,
  addProduct,
  // addItem,
  // deleteItem,
  // deleteMultipleItems,
  // updateItem,
} from '../thunks/productThunk';

const initialState = {
  isLoading: true,
  products: [],
  status: null,
  message: [],
  errors: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
    clearError: noErrorState,
  },
  extraReducers: {
    [getProducts.fulfilled]: receivedProductState,
    [getProducts.pending]: loadingState,
    [getProducts.rejected]: errorState,
    [addProduct.pending]: loadingState,
    [addProduct.rejected]: errorState,
    // [deleteItem.rejected]: errorState,
    // [deleteMultipleItems.rejected]: errorState,
    // [updateItem.pending]: loadingState,
    // [updateItem.rejected]: errorState,
  },
});

export const { processingRequest, processed, clearError } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectIsLoading = (state) => state.product.isLoading;

export default productSlice.reducer;
