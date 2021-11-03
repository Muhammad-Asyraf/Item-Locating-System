const setStoreState = (state, { payload }) => ({
  ...state,
  storeData: payload.data,
  status: 'Success',
  message: ['Store data has been set'],
});

export default setStoreState;
