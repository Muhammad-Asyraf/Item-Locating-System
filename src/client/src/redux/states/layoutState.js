export const setLayoutLayers = (state, { payload }) => ({
  ...state,
  layoutLayers: payload.layoutLayers,
  message: payload.message,
  status: payload.status,
});

export const updatedItemState = (state, { payload }) => ({
  ...state,
  items: payload.items,
});
