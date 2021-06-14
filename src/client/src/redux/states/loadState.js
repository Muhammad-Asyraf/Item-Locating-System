export const loadingState = (state) => ({
  ...state,
  status: 'pending',
  isLoading: true,
});

export const loadedState = (state) => ({
  ...state,
  isLoading: false,
});
