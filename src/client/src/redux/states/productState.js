export const receivedProductState = (state, { payload }) => ({
  ...state,
  products: payload.products,
  message: payload.message,
  status: payload.status,
});

export const receivedSingleProductState = (state, { payload }) => ({
  ...state,
  product: payload.product,
  message: payload.message,
  status: payload.status,
});

export const updatedProductState = (state, { payload }) => ({
  ...state,
  products: payload.products,
});

export const emptyProductState = (state) => ({
  ...state,
  products: [],
  message: '',
  status: null,
});
