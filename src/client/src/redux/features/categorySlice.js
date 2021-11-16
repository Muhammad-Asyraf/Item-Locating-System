import { createSlice } from '@reduxjs/toolkit';
import { loadingState, loadedState } from '../states/loadState';
import { errorState, noErrorState } from '../states/errorState';

import {
  receivedSubcategoriesState,
  receivedCategoriesState,
} from '../states/categoryState';
import { getSubcategories, getCategories } from '../thunks/categoryThunk';

export const initialState = {
  isLoading: true,
  categories: [],
  subcategories: [],
  message: [],
  errors: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
    clearError: noErrorState,
  },
  extraReducers: {
    [getSubcategories.fulfilled]: receivedSubcategoriesState,
    [getSubcategories.pending]: loadingState,
    [getSubcategories.rejected]: errorState,
    [getCategories.fulfilled]: receivedCategoriesState,
    [getCategories.pending]: loadingState,
    [getCategories.rejected]: errorState,
  },
});

export const { processingRequest, processed } = categorySlice.actions;

export const selectIsLoading = (state) => state.category.isLoading;
export const selectCategory = (state) => state.category.categories;
export const selectSubcategory = (state) => state.category.subcategories;

export default categorySlice.reducer;
