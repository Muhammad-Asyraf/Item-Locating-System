import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
// import { errorState, noErrorState } from '../states/errorState';
import setStoreState from '../states/storeState';

import setStore from '../thunks/storeThunk';

const initialState = {
  isLoading: true,
  storeData: {},
  status: null,
  message: [],
  errors: [],
};

const userSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
    // clearError: noErrorState,
  },
  extraReducers: {
    [setStore.fulfilled]: setStoreState,
    [setStore.pending]: loadingState,
    // [getLocation.rejected]: errorState,
  },
});

export const { processingRequest, processed, clearError } = storeSlice.actions;

export const selectStore = (state) => state.store.storeData;
export const selectIsLoading = (state) => state.store.isLoading;

export default storeSlice.reducer;
