import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState } from '../states/errorState';
import {
  setLayout,
  setLayouts,
  updatedLayoutState,
  clearLayoutState,
} from '../states/layoutState';

import {
  getLayout,
  getLayouts,
  addLayout,
  deleteLayout,
  deleteMultipleLayouts,
  updateLayout,
  patchSingleLayout,
  patchMultipleLayouts,
} from '../thunks/layoutThunk';

const initialState = {
  isLoading: true,
  layouts: [],
  layout: null,
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
    quickUpdateLayouts: updatedLayoutState,
    clearLayout: clearLayoutState,
  },
  extraReducers: {
    [getLayout.fulfilled]: setLayout,
    [getLayout.pending]: loadingState,
    [getLayout.rejected]: errorState,
    [getLayouts.fulfilled]: setLayouts,
    [getLayouts.pending]: loadingState,
    [getLayouts.rejected]: errorState,
    [addLayout.pending]: loadingState,
    [addLayout.rejected]: errorState,
    [deleteLayout.rejected]: errorState,
    [deleteMultipleLayouts.rejected]: errorState,
    [patchSingleLayout.rejected]: errorState,
    [updateLayout.pending]: loadingState,
    [updateLayout.rejected]: errorState,
    [patchMultipleLayouts.pending]: loadingState,
    [patchMultipleLayouts.rejected]: errorState,
    [patchMultipleLayouts.fulfilled]: loadedState,
  },
});

export const { clearLayout, processingRequest, processed, quickUpdateLayouts } =
  layoutSlice.actions;

export const selectLayout = (state) => state.layout.layout;
export const selectLayouts = (state) => state.layout.layouts;
export const selectIsLoading = (state) => state.layout.isLoading;

export default layoutSlice.reducer;
