export const receivedPromotionState = (state, { payload }) => ({
  ...state,
  promotions: payload.promotions,
  message: payload.message,
  status: payload.status,
});

export const receivedSinglePromotionState = (state, { payload }) => ({
  ...state,
  promotion: payload.promotion,
  message: payload.message,
  status: payload.status,
});

export const updatedPromotionState = (state, { payload }) => ({
  ...state,
  promotions: payload.promotions,
});
