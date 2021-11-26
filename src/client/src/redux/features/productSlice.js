import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState, noErrorState } from '../states/errorState';
import {
  receivedProductState,
  receivedSingleProductState,
  updatedProductState,
} from '../states/productState';

import {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  toggleProductStatus,
  patchMultipleProducts,
  deleteProduct,
  deleteMultipleProducts,
} from '../thunks/productThunk';

const initialState = {
  isLoading: true,
  products: [],
  product: {},
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
    quickUpdateProducts: updatedProductState,
  },
  extraReducers: {
    [getSingleProduct.fulfilled]: receivedSingleProductState,
    [getSingleProduct.pending]: loadingState,
    [getSingleProduct.rejected]: errorState,
    [getProducts.fulfilled]: receivedProductState,
    [getProducts.pending]: loadingState,
    [getProducts.rejected]: errorState,
    [addProduct.pending]: loadingState,
    [addProduct.rejected]: errorState,
    [deleteProduct.rejected]: errorState,
    [deleteMultipleProducts.rejected]: errorState,
    [toggleProductStatus.rejected]: errorState,
    [updateProduct.pending]: loadingState,
    [updateProduct.rejected]: errorState,
    [patchMultipleProducts.pending]: loadingState,
    [patchMultipleProducts.rejected]: errorState,
    [patchMultipleProducts.fulfilled]: loadedState,
  },
});

export const { processingRequest, processed, clearError, quickUpdateProducts } =
  productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectSingleProduct = (state) => state.product.product;
export const selectIsLoading = (state) => state.product.isLoading;

export default productSlice.reducer;
