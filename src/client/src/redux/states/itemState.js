export const receivedItemState = (state, { payload }) => ({
  ...state,
  items: payload.items,
  message: payload.message,
  status: payload.status,
});

export const noideaState = (state, { payload }) => ({
  ...state,
  items: payload.items,
  message: payload.message,
  status: payload.status,
});
