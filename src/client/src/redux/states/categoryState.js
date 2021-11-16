export const receivedSubcategoriesState = (state, { payload }) => ({
  ...state,
  subcategories: payload.subcategories,
  message: payload.message,
});

export const receivedCategoriesState = (state, { payload }) => ({
  ...state,
  categories: payload.categories,
  message: payload.message,
});
