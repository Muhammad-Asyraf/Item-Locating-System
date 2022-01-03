export const receivedCampaignState = (state, { payload }) => ({
  ...state,
  campaigns: payload.campaigns,
  message: payload.message,
  status: payload.status,
});

export const receivedSingleCampaignState = (state, { payload }) => ({
  ...state,
  campaign: payload.campaign,
  message: payload.message,
  status: payload.status,
});

export const updatedCampaignState = (state, { payload }) => ({
  ...state,
  campaigns: payload.campaigns,
});
