export const activeUserState = (state, { payload }) => ({
  ...state,
  isAuthenticated: true,
  user: payload.user,
  message: payload.message,
  status: payload.status,
});

export const noUserState = (state) => ({
  ...state,
  isAuthenticated: null,
  isLoading: true,
  user: null,
  authHeader: {},
});

export const loginSuccessState = (state) => ({
  ...state,
  message: [],
  status: null,
});

export const withHeaderState = (state, { payload }) => ({
  ...state,
  authHeader: payload.payloadHeader,
  message: payload.message,
  status: payload.status,
});
