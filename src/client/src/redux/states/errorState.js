export const errorState = (state, action) => ({
  ...state,
  message: action.payload.message,
  errors: action.payload.error,
  status: action.payload.status,
});

export const noErrorState = (state) => ({
  ...state,
  message: {},
  errors: {},
  status: null,
});
