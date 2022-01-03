import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    uuid: '',
    token: 'test',
    default_cart_uuid: '',
    cart_uuid: '',
    position: [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUuid: (state, action) => {
      state.uuid = action.payload;
    },
    setDefaultCart: (state, action) => {
      state.default_cart_uuid = action.payload;
    },
    setCurrentCart: (state, action) => {
      state.cart_uuid = action.payload;
    },
    removeUser: (state) => {
      state.token = '';
      state.uuid = '';
      state.default_cart_uuid = '';
      state.cart_uuid = '';
    },
    updatePosition: (state, action) => {
      state.position = action.payload;
    },
  },
});
export const {
  setToken,
  setUuid,
  setDefaultCart,
  setCurrentCart,
  removeUser,
  updatePosition,
} = userSlice.actions;

export default userSlice.reducer;
