import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import itemReducer from './features/itemSlice';
import productReducer from './features/productSlice';
import mapBoxReducer from './features/mapBoxSlice';
import storeReducer from './features/storeSlice';
import notificationReducer from './features/notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    product: productReducer,
    mapbox: mapBoxReducer,
    store: storeReducer,
    notification: notificationReducer,
  },
  devTools: true,
});

export default store;
