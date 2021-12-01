export const receivedItemState = (state, { payload }) => ({
  ...state,
  items: payload.items,
  message: payload.message,
  status: payload.status,
});

export const receivedSingleItemState = (state, { payload }) => ({
  ...state,
  item: payload.item,
  message: payload.message,
  status: payload.status,
});

export const updatedItemState = (state, { payload }) => ({
  ...state,
  items: payload.items,
});
