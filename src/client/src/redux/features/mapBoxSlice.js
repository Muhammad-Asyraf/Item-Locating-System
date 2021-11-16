import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
// import { errorState, noErrorState } from '../states/errorState';
import receivedPayloadState from '../states/mapBoxState';

import getLocation from '../thunks/mapBoxThunk';

const initialState = {
  isLoading: false,
  payload: {},
  status: null,
  message: [],
  errors: [],
};

const mapBoxSlice = createSlice({
  name: 'mapbox',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
    // clearError: noErrorState,
  },
  extraReducers: {
    [getLocation.fulfilled]: receivedPayloadState,
    [getLocation.pending]: loadingState,
    // [getLocation.rejected]: errorState,
  },
});

export const { processingRequest, processed, clearError } = mapBoxSlice.actions;

export const selectLocation = (state) => state.mapbox.payload;
export const selectIsLoading = (state) => state.mapbox.isLoading;

export default mapBoxSlice.reducer;
