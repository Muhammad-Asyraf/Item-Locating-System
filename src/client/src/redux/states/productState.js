export const receivedProductState = (state, { payload }) => ({
  ...state,
  products: payload.products,
  message: payload.message,
  status: payload.status,
});

export const emptyProductState = (state) => ({
  ...state,
  products: [],
  message: '',
  status: null,
});
