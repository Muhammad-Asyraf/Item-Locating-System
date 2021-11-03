import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import itemReducer from './features/itemSlice';
import productReducer from './features/productSlice';
import mapBoxReducer from './features/mapBoxSlice';
import storeReducer from './features/storeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    item: itemReducer,
    product: productReducer,
    mapbox: mapBoxReducer,
    store: storeReducer,
  },
  devTools: true,
});

export default store;
