import { createSlice } from '@reduxjs/toolkit';

import { loadingState, loadedState } from '../states/loadState';
import { errorState, noErrorState } from '../states/errorState';
import {
  receivedCampaignState,
  receivedSingleCampaignState,
  updatedCampaignState,
} from '../states/campaignState';

import {
  getSingleCampaign,
  getCampaigns,
  addCampaign,
  deleteCampaign,
  deleteMultipleCampaigns,
  updateCampaign,
} from '../thunks/campaignThunk';

const initialState = {
  isLoading: true,
  campaigns: [],
  campaign: {},
  status: null,
  message: null,
  errors: null,
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    processingRequest: loadingState,
    processed: loadedState,
    clearError: noErrorState,
    quickUpdateCampaigns: updatedCampaignState,
  },
  extraReducers: {
    [getSingleCampaign.fulfilled]: receivedSingleCampaignState,
    [getSingleCampaign.pending]: loadingState,
    [getSingleCampaign.rejected]: errorState,
    [getCampaigns.fulfilled]: receivedCampaignState,
    [getCampaigns.pending]: loadingState,
    [getCampaigns.rejected]: errorState,
    [addCampaign.pending]: loadingState,
    [addCampaign.rejected]: errorState,
    [deleteCampaign.rejected]: errorState,
    [deleteMultipleCampaigns.rejected]: errorState,
    [updateCampaign.pending]: loadingState,
    [updateCampaign.rejected]: errorState,
  },
});

export const { processingRequest, processed, clearError, quickUpdateCampaigns } =
  campaignSlice.actions;

export const selectCampaigns = (state) => state.campaign.campaigns;
export const selectSingleCampaign = (state) => state.campaign.campaign;
export const selectIsLoading = (state) => state.campaign.isLoading;
export const selectCampaignError = (state) => state.campaign.errors;
export const selectCampaignMsg = (state) => state.campaign.message;

export default campaignSlice.reducer;
