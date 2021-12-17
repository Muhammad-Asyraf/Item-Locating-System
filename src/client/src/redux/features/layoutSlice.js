import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState } from '../states/errorState';
import { setLayoutLayers } from '../states/layoutState';

import { updateLayout, getLayout } from '../thunks/layoutThunk';

const initialState = {
  isLoading: false,
  layoutLayers: [],
  status: null,
  message: [],
  errors: [],
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
  },
  extraReducers: {
    [getLayout.pending]: loadingState,
    [getLayout.fulfilled]: setLayoutLayers,
    [updateLayout.pending]: loadingState,
    [updateLayout.rejected]: errorState,
  },
});

export const { processingRequest, processed } = layoutSlice.actions;

export const selectLayoutLayers = (state) => state.layout.layoutLayers;
export const selectIsLoading = (state) => state.layout.isLoading;

export default layoutSlice.reducer;
