export const setLayouts = (state, { payload }) => ({
  ...state,
  layouts: payload.layouts,
  message: payload.message,
  status: payload.status,
});

export const setLayout = (state, { payload }) => ({
  ...state,
  layout: payload.layout,
  message: payload.message,
  status: payload.status,
});

export const updatedLayoutState = (state, { payload }) => ({
  ...state,
  layouts: payload.layouts,
});

export const clearLayoutState = (state) => ({
  ...state,
  layout: null,
});
