import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState, noErrorState } from '../states/errorState';
import {
  receivedItemState,
  receivedSingleItemState,
  updatedItemState,
} from '../states/itemState';

import {
  getSingleItem,
  getItems,
  addItem,
  deleteItem,
  deleteMultipleItems,
  updateItem,
} from '../thunks/itemThunk';

const initialState = {
  isLoading: true,
  items: [],
  item: {},
  status: null,
  message: null,
  errors: null,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
    clearError: noErrorState,
    quickUpdateItems: updatedItemState,
  },
  extraReducers: {
    [getSingleItem.fulfilled]: receivedSingleItemState,
    [getSingleItem.pending]: loadingState,
    [getSingleItem.rejected]: errorState,
    [getItems.fulfilled]: receivedItemState,
    [getItems.pending]: loadingState,
    [getItems.rejected]: errorState,
    [addItem.pending]: loadingState,
    [addItem.rejected]: errorState,
    [deleteItem.rejected]: errorState,
    [deleteMultipleItems.rejected]: errorState,
    [updateItem.pending]: loadingState,
    [updateItem.rejected]: errorState,
    // [updateItem.fulfilled]: updatedItemState,
  },
});

export const { processingRequest, processed, clearError, quickUpdateItems } =
  itemSlice.actions;

export const selectItems = (state) => state.item.items;
export const selectSingleItem = (state) => state.item.item;
export const selectIsLoading = (state) => state.item.isLoading;
export const selectItemError = (state) => state.item.errors;
export const selectItemMsg = (state) => state.item.message;

export default itemSlice.reducer;
