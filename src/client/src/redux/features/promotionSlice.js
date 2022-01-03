import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState, noErrorState } from '../states/errorState';
import {
  receivedPromotionState,
  receivedSinglePromotionState,
  updatedPromotionState,
} from '../states/promotionState';

import {
  getSinglePromo,
  getPromotions,
  addPromotion,
  deletePromotion,
  deleteMultiplePromotions,
  updatePromotion,
} from '../thunks/promotionThunk';

const initialState = {
  isLoading: true,
  promotions: [],
  promotion: {},
  status: null,
  message: null,
  errors: null,
};

const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
    clearError: noErrorState,
    quickUpdatePromotions: updatedPromotionState,
  },
  extraReducers: {
    [getSinglePromo.fulfilled]: receivedSinglePromotionState,
    [getSinglePromo.pending]: loadingState,
    [getSinglePromo.rejected]: errorState,
    [getPromotions.fulfilled]: receivedPromotionState,
    [getPromotions.pending]: loadingState,
    [getPromotions.rejected]: errorState,
    [addPromotion.pending]: loadingState,
    [addPromotion.rejected]: errorState,
    [deletePromotion.rejected]: errorState,
    [deleteMultiplePromotions.rejected]: errorState,
    [updatePromotion.pending]: loadingState,
    [updatePromotion.rejected]: errorState,
  },
});

export const { processingRequest, processed, clearError, quickUpdatePromotions } =
  promotionSlice.actions;

export const selectPromotions = (state) => state.promotion.promotions;
export const selectSinglePromotion = (state) => state.promotion.promotion;
export const selectIsLoading = (state) => state.promotion.isLoading;
export const selectPromotionError = (state) => state.promotion.errors;
export const selectPromotionMsg = (state) => state.promotion.message;

export default promotionSlice.reducer;
