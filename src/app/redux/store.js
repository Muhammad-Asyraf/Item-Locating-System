import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import authReducer from './auth/authSlice';
import cartReducer from './cart/cartSlice';
import userReducer from './user/userSlice';
import loketlistReducer from './loketlist/loketlistSlice';

// Storage engine to persist states
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  loketlist: loketlistReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
