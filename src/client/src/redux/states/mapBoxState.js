const receivedPayloadState = (state, { payload }) => ({
  ...state,
  payload: payload.data,
  status: null,
  message: [],
});

export default receivedPayloadState;
