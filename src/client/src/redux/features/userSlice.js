import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState } from '../states/errorState';
import setUserState from '../states/userState';

import { updateUser, getUser } from '../thunks/userThunk';

const initialState = {
  isLoading: true,
  user: {},
  status: null,
  message: [],
  errors: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
  },
  extraReducers: {
    [getUser.fulfilled]: setUserState,
    [getUser.pending]: loadingState,
    [getUser.rejected]: errorState,
    [updateUser.pending]: loadingState,
    [updateUser.rejected]: errorState,
  },
});

export const { processingRequest, processed, clearError } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.user.isLoading;

export default userSlice.reducer;
