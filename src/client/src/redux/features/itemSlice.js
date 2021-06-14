import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState, noErrorState } from '../states/errorState';
import { receivedItemState } from '../states/itemState';

import {
  getItems,
  addItem,
  deleteItem,
  deleteMultipleItems,
  updateItem,
} from '../thunks/itemThunk';

const initialState = {
  isLoading: true,
  items: [],
  status: null,
  message: [],
  errors: [],
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
    clearError: noErrorState,
  },
  extraReducers: {
    [getItems.fulfilled]: receivedItemState,
    [getItems.pending]: loadingState,
    [getItems.rejected]: errorState,
    [addItem.pending]: loadingState,
    [addItem.rejected]: errorState,
    [deleteItem.rejected]: errorState,
    [deleteMultipleItems.rejected]: errorState,
    [updateItem.pending]: loadingState,
    [updateItem.rejected]: errorState,
  },
});

export const { processingRequest, processed, clearError } = itemSlice.actions;

export const selectItems = (state) => state.item.items;
export const selectIsLoading = (state) => state.item.isLoading;

export default itemSlice.reducer;
