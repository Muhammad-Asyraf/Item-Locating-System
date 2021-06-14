import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import itemReducer from './features/itemSlice';
import productReducer from './features/productSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    product: productReducer,
  },
  devTools: true,
});

export default store;
