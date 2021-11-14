export const newNotiState = (state, { payload }) => ({
  ...state,
  message: payload.message,
  severity: payload.severity,
  backgroundColor: payload.backgroundColor,
  color: payload.color,
});

export const noNotiState = (state) => ({
  ...state,
  message: '',
  severity: '',
  backgroundColor: '',
  color: '',
});
