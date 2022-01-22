const setUserState = (state, { payload }) => ({
  ...state,
  user: payload.user,
  status: payload.status,
  message: payload.message,
});

export default setUserState;
