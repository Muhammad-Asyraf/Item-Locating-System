import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import itemReducer from './features/itemSlice';
import productReducer from './features/productSlice';
import mapBoxReducer from './features/mapBoxSlice';
import storeReducer from './features/storeSlice';
import notificationReducer from './features/notificationSlice';
import categoryReducer from './features/categorySlice';
import layoutReducer from './features/layoutSlice';
import promotionReducer from './features/promotionSlice';
import campaignReducer from './features/campaignSlice';
import userReducer from './features/userSlice';

const combinedReducer = combineReducers({
  auth: authReducer,
  item: itemReducer,
  product: productReducer,
  mapbox: mapBoxReducer,
  store: storeReducer,
  notification: notificationReducer,
  category: categoryReducer,
  layout: layoutReducer,
  promotion: promotionReducer,
  campaign: campaignReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
