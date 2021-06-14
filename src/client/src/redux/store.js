import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import itemReducer from './features/itemSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
  },
  devTools: true,
});

export default store;
